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

                this.record = document.getElementById('record');
                this.toneArm = document.getElementById('toneArm');
                this.playBtn = document.getElementById('playBtn');
                this.volumeSlider = document.getElementById('volumeSlider');
                this.statusLight = document.getElementById('statusLight');

                this.init();
            }

            init() {
                this.playBtn.addEventListener('click', () => this.togglePlay());
                this.volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));

                // Set initial volume
                this.setVolume(this.volume);
            }

            togglePlay() {
                this.isPlaying = !this.isPlaying;

                if (this.isPlaying) {
                    this.play();
                } else {
                    this.stop();
                }
            }

            play() {
                this.record.classList.add('spinning');
                this.toneArm.classList.add('play');
                this.playBtn.classList.add('playing');
                this.statusLight.classList.add('active');

                // Add subtle hover effect to record
                this.record.style.transform = 'scale(1.02)';
            }

            stop() {
                this.record.classList.remove('spinning');
                this.toneArm.classList.remove('play');
                this.playBtn.classList.remove('playing');
                this.statusLight.classList.remove('active');

                this.record.style.transform = 'scale(1)';
            }

            setVolume(value) {
                this.volume = parseFloat(value);

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