// -------- PARALLAX EFFECTS --------
const moon = document.getElementById("moon");
const mountain = document.getElementById("mountain");
const text = document.getElementById("text");
const front = document.getElementById("front");
const stars = document.getElementById("stars");

window.addEventListener("scroll", () => {
  const value = window.scrollY;

  if (stars) stars.style.left = value * 0.25 + "px";
  if (moon) moon.style.top = value * 1.05 + "px";
  if (mountain) mountain.style.top = value * 0.5 + "px";
  if (front) front.style.top = "0px"; // unnecessary calc
  if (text) {
    text.style.marginRight = value * 4 + "px";
    text.style.marginTop = value * 1.5 + "px";
  }
});

// -------- ENHANCED STAR GENERATION --------
const starContainer = document.querySelector("#stars"); // FIXED

if (starContainer) {
  const starCount = 300;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span");

    star.style.top = Math.random() * 100 + "%";
    star.style.left = Math.random() * 100 + "%";

    const size = Math.random() * 4 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";

    const brightness = Math.random() * 0.6 + 0.4;
    star.style.backgroundColor = `rgba(255, 255, 255, ${brightness})`;

    const duration = Math.random() * 4 + 2;
    const delay = Math.random() * 8;

    star.style.animation = `twinkle ${duration}s infinite ease-in-out`;
    star.style.animationDelay = delay + "s";

    starContainer.appendChild(star);
  }
}

// -------- SHOOTING STARS --------
function createShootingStar() {
  const shootingStar = document.createElement("div");
  shootingStar.className = "shooting-star";

  shootingStar.style.top = Math.random() * 50 + "%";
  shootingStar.style.left = "-10px";

  document.body.appendChild(shootingStar);

  setTimeout(() => {
    if (shootingStar.parentNode) {
      shootingStar.parentNode.removeChild(shootingStar);
    }
  }, 3000);
}

setInterval(createShootingStar, 8000);

class VinylPlayer {
    constructor() {
        this.isPlaying = false;
        this.volume = 0.7;
        this.currentLyricIndex = -1;

        this.record = document.getElementById('record');
        this.toneArm = document.getElementById('toneArm');
        this.playBtn = document.getElementById('playBtn');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.statusLight = document.getElementById('statusLight');
        this.audio = document.getElementById('audioPlayer');
        this.lyricsDisplay = document.getElementById('lyricsDisplay');
        this.lyricLines = document.querySelectorAll('.lyric-line');

        this.init();
    }

    init() {
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));

        this.audio.addEventListener('ended', () => this.stop());
        this.audio.addEventListener('pause', () => this.updateVisualState(false));
        this.audio.addEventListener('play', () => this.updateVisualState(true));
        this.audio.addEventListener('timeupdate', () => this.updateLyrics());

        // Set initial volume
        this.setVolume(this.volume);
    }

    togglePlay() {
        if (this.audio.paused) {
            this.audio.play().catch(e => {
                console.log("[v0] Audio play failed:", e);
                // Fallback to visual-only mode if audio fails
                this.updateVisualState(true);
                this.startLyricsSimulation();
            });
        } else {
            this.audio.pause();
        }
    }

    updateVisualState(playing) {
        this.isPlaying = playing;

        if (playing) {
            this.record.classList.add('spinning');
            this.toneArm.classList.add('play');
            this.playBtn.classList.add('playing');
            this.statusLight.classList.add('active');
            this.record.style.transform = 'scale(1.02)';
        } else {
            this.record.classList.remove('spinning');
            this.toneArm.classList.remove('play');
            this.playBtn.classList.remove('playing');
            this.statusLight.classList.remove('active');
            this.record.style.transform = 'scale(1)';

            // Stop lyrics simulation if running
            if (this.lyricsInterval) {
                clearInterval(this.lyricsInterval);
                this.lyricsInterval = null;
            }
        }
    }

    updateLyrics() {
        const currentTime = this.audio.currentTime;
        let activeIndex = -1;

        // Find the current lyric line based on time
        for (let i = 0; i < this.lyricLines.length; i++) {
            const lineTime = parseFloat(this.lyricLines[i].dataset.time);
            if (currentTime >= lineTime) {
                activeIndex = i;
            } else {
                break;
            }
        }

        // Update lyric display if changed
        if (activeIndex !== this.currentLyricIndex) {
            this.currentLyricIndex = activeIndex;
            this.highlightLyric(activeIndex);
        }
    }

    startLyricsSimulation() {
        // Fallback lyrics simulation when audio fails
        let simulatedTime = 0;
        this.lyricsInterval = setInterval(() => {
            if (!this.isPlaying) return;

            simulatedTime += 0.1;
            let activeIndex = -1;

            for (let i = 0; i < this.lyricLines.length; i++) {
                const lineTime = parseFloat(this.lyricLines[i].dataset.time);
                if (simulatedTime >= lineTime) {
                    activeIndex = i;
                } else {
                    break;
                }
            }

            if (activeIndex !== this.currentLyricIndex) {
                this.currentLyricIndex = activeIndex;
                this.highlightLyric(activeIndex);
            }
        }, 100);
    }

    highlightLyric(activeIndex) {
        this.lyricLines.forEach((line, index) => {
            line.classList.remove('active', 'passed');

            if (index === activeIndex) {
                line.classList.add('active');
                // Scroll to active lyric
                line.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            } else if (index < activeIndex) {
                line.classList.add('passed');
            }
        });
    }

    play() {
        this.updateVisualState(true);
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.updateVisualState(false);
        this.currentLyricIndex = -1;
        this.lyricLines.forEach(line => {
            line.classList.remove('active', 'passed');
        });
    }

    setVolume(value) {
        this.volume = parseFloat(value);
        this.audio.volume = this.volume;

        // Visual feedback for volume
        const percentage = this.volume * 100;
        this.volumeSlider.style.background = `linear-gradient(to right, #a855f7 0%, #a855f7 ${percentage}%, #4c1d95 ${percentage}%, #4c1d95 100%)`;

        // Simulate volume effect on record brightness
        const brightness = 0.8 + (this.volume * 0.4);
        this.record.style.filter = `brightness(${brightness})`;
    }
}

// Initialize the vinyl player when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new VinylPlayer();
});

 // Create floating hearts background
        function createFloatingHearts() {
            const heartsContainer = document.getElementById('heartsBackground');
            const heartSymbols = ['💕', '💖', '💗', '💝', '💘'];

            for (let i = 0; i < 15; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.top = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 8 + 's';
                heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
                heartsContainer.appendChild(heart);
            }
        }

        // Add hover effects to countries
        function addCountryInteractions() {
            const countries = document.querySelectorAll('.country');
            countries.forEach(country => {
                country.addEventListener('mouseenter', function() {
                    this.style.filter = 'brightness(1.3) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))';
                });

                country.addEventListener('mouseleave', function() {
                    this.style.filter = 'brightness(1)';
                });
            });
        }

        // Add sparkle effect on click
        function addSparkleEffect() {
            const mapContainer = document.querySelector('.map-container');
            mapContainer.addEventListener('click', function(e) {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = e.offsetX + 'px';
                sparkle.style.top = e.offsetY + 'px';
                sparkle.style.fontSize = '24px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'sparkle 1s ease-out forwards';
                sparkle.style.zIndex = '10';

                // Add sparkle animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes sparkle {
                        0% { transform: scale(0) rotate(0deg); opacity: 1; }
                        50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
                        100% { transform: scale(0) rotate(360deg); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);

                this.appendChild(sparkle);

                setTimeout(() => {
                    sparkle.remove();
                }, 1000);
            });
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            createFloatingHearts();
            addCountryInteractions();
            addSparkleEffect();
        });

        // Add some romantic messages that appear randomly
        const romanticMessages = [
            "Love knows no distance 💕",
            "Two hearts, one love ❤️",
            "Miles apart, close at heart 💖",
            "Love travels at the speed of light ✨",
            "Distance is just a number 💘"
        ];

        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every 3 seconds
                const message = document.createElement('div');
                message.textContent = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
                message.style.position = 'fixed';
                message.style.left = Math.random() * 80 + 10 + '%';
                message.style.top = Math.random() * 80 + 10 + '%';
                message.style.color = '#fff';
                message.style.fontSize = '18px';
                message.style.fontWeight = 'bold';
                message.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
                message.style.pointerEvents = 'none';
                message.style.zIndex = '5';
                message.style.animation = 'fadeInOut 3s ease-in-out forwards';

                // Add fade animation
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes fadeInOut {
                        0% { opacity: 0; transform: translateY(20px); }
                        50% { opacity: 1; transform: translateY(0); }
                        100% { opacity: 0; transform: translateY(-20px); }
                    }
                `;
                document.head.appendChild(style);

                document.body.appendChild(message);

                setTimeout(() => {
                    message.remove();
                }, 3000);
            }
        }, 3000);