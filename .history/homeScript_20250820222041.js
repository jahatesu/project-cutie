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

// Airplane animation along the curved path
        function animateAirplane() {
            const airplane = document.getElementById('airplane');
            const path = document.querySelector('.connection-path');
            const pathLength = path.getTotalLength();

            let progress = 0;
            const duration = 8000; // 8 seconds for complete journey

            function animate() {
                progress += 16 / duration; // 60fps
                if (progress > 1) progress = 0;

                const point = path.getPointAtLength(progress * pathLength);
                const nextPoint = path.getPointAtLength((progress + 0.01) * pathLength);

                // Calculate rotation angle
                const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180 / Math.PI;

                airplane.setAttribute('transform', `translate(${point.x}, ${point.y}) rotate(${angle})`);

                requestAnimationFrame(animate);
            }

            animate();
        }

        // Create floating hearts
        function createFloatingHeart() {
            const heartsContainer = document.getElementById('floating-hearts');
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = ['💖', '💕', '💗', '💝', '💘'][Math.floor(Math.random() * 5)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
            heart.style.animationDelay = Math.random() * 2 + 's';

            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 8000);
        }

        // Romantic messages
        const messages = [
            "Distance means nothing when someone means everything 💕",
            "Love knows no boundaries 🌍",
            "Two hearts, one love, endless miles 💖",
            "Connected by love across the ocean 🌊",
            "Every mile between us makes our love stronger 💪",
            "Love travels at the speed of light ✨"
        ];

        let messageIndex = 0;
        function changeMessage() {
            const messageElement = document.getElementById('love-message');
            messageElement.textContent = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;
        }

        // Click effects
        document.addEventListener('click', function(e) {
            // Create sparkle effect at click position
            for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.position = 'fixed';
                sparkle.style.left = (e.clientX + Math.random() * 20 - 10) + 'px';
                sparkle.style.top = (e.clientY + Math.random() * 20 - 10) + 'px';
                sparkle.style.animationDelay = Math.random() * 0.5 + 's';
                document.body.appendChild(sparkle);

                setTimeout(() => sparkle.remove(), 2000);
            }
        });

        // Initialize animations
        animateAirplane();

        // Create floating hearts periodically
        setInterval(createFloatingHeart, 1500);

        // Change messages every 6 seconds
        setInterval(changeMessage, 6000);

        // Add some initial hearts
        for (let i = 0; i < 3; i++) {
            setTimeout(createFloatingHeart, i * 500);
        }
        let currentView = 'map';

        function showMap() {
            document.getElementById('map-container').style.display = 'block';
            document.getElementById('game-container').style.display = 'none';
            currentView = 'map';
        }

        function showMaze() {
            document.getElementById('map-container').style.display = 'none';
            document.getElementById('game-container').style.display = 'block';
            currentView = 'maze';
            if (!window.mazeInitialized) {
                initMaze();
                window.mazeInitialized = true;
            }
        }

        function closeLetter() {
            document.getElementById('loveLetter').classList.remove('show');
        }

        // Maze game implementation
        function initMaze() {
            const canvas = document.getElementById('mazeCanvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            const cellSize = 20;
            const cols = Math.floor(canvas.width / cellSize);
            const rows = Math.floor(canvas.height / cellSize);

            // Create heart-shaped maze pattern
            const maze = createHeartMaze(cols, rows);

            // Player position
            let player = { x: 2, y: Math.floor(rows/2) };
            let finish = { x: cols - 3, y: Math.floor(rows/2) };

            function createHeartMaze(cols, rows) {
                const maze = Array(rows).fill().map(() => Array(cols).fill(1));

                // Create heart shape outline
                const centerX = cols / 2;
                const centerY = rows / 2;

                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {
                        const dx = (x - centerX) / (cols * 0.3);
                        const dy = (y - centerY) / (rows * 0.3);

                        // Heart equation: (x²+y²-1)³ - x²y³ ≤ 0
                        const heartEq = Math.pow(dx*dx + dy*dy - 1, 3) - dx*dx * Math.pow(dy, 3);

                        if (heartEq <= 0.1) {
                            maze[y][x] = 0; // Path
                        }
                    }
                }

                // Create internal maze paths
                for (let y = 2; y < rows - 2; y += 2) {
                    for (let x = 2; x < cols - 2; x += 2) {
                        if (maze[y][x] === 0) {
                            // Create random paths
                            if (Math.random() > 0.3) {
                                if (x + 1 < cols - 1) maze[y][x + 1] = 0;
                                if (y + 1 < rows - 1) maze[y + 1][x] = 0;
                            }
                        }
                    }
                }

                // Ensure start and finish are accessible
                maze[player.y][player.x] = 0;
                maze[finish.y][finish.x] = 0;

                // Create path to start and finish
                for (let x = 0; x <= player.x; x++) {
                    maze[player.y][x] = 0;
                }
                for (let x = finish.x; x < cols; x++) {
                    maze[finish.y][x] = 0;
                }

                return maze;
            }

            function drawMaze() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw maze walls with gradient
                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {
                        if (maze[y][x] === 1) {
                            const gradient = ctx.createLinearGradient(
                                x * cellSize, y * cellSize,
                                (x + 1) * cellSize, (y + 1) * cellSize
                            );
                            gradient.addColorStop(0, '#9370db');
                            gradient.addColorStop(1, '#663399');

                            ctx.fillStyle = gradient;
                            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);

                            // Add border
                            ctx.strokeStyle = '#ffffff';
                            ctx.lineWidth = 1;
                            ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
                        }
                    }
                }

                // Draw finish area with pulsing effect
                ctx.save();
                const time = Date.now() * 0.005;
                const pulse = Math.sin(time) * 0.2 + 0.8;
                ctx.globalAlpha = pulse;

                const finishGradient = ctx.createRadialGradient(
                    finish.x * cellSize + cellSize/2, finish.y * cellSize + cellSize/2, 0,
                    finish.x * cellSize + cellSize/2, finish.y * cellSize + cellSize/2, cellSize
                );
                finishGradient.addColorStop(0, '#ff69b4');
                finishGradient.addColorStop(1, '#ff1493');

                ctx.fillStyle = finishGradient;
                ctx.fillRect(finish.x * cellSize, finish.y * cellSize, cellSize, cellSize);
                ctx.restore();

                // Draw finish heart
                ctx.font = `${cellSize-4}px Arial`;
                ctx.textAlign = 'center';
                ctx.fillStyle = '#ffffff';
                ctx.fillText('💖', finish.x * cellSize + cellSize/2, finish.y * cellSize + cellSize-2);

                // Draw player
                ctx.font = `${cellSize-2}px Arial`;
                ctx.textAlign = 'center';
                ctx.fillText('💕', player.x * cellSize + cellSize/2, player.y * cellSize + cellSize-2);
            }

            function movePlayer(dx, dy) {
                const newX = player.x + dx;
                const newY = player.y + dy;

                if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && maze[newY][newX] === 0) {
                    player.x = newX;
                    player.y = newY;

                    // Check if reached finish
                    if (player.x === finish.x && player.y === finish.y) {
                        setTimeout(() => {
                            document.getElementById('loveLetter').classList.add('show');
                        }, 500);
                    }
                }
            }

            // Game loop
            function gameLoop() {
                drawMaze();
                requestAnimationFrame(gameLoop);
            }

            // Controls
            document.addEventListener('keydown', (e) => {
                if (currentView !== 'maze') return;

                switch(e.key) {
                    case 'ArrowUp':
                    case 'w':
                    case 'W':
                        movePlayer(0, -1);
                        break;
                    case 'ArrowDown':
                    case 's':
                    case 'S':
                        movePlayer(0, 1);
                        break;
                    case 'ArrowLeft':
                    case 'a':
                    case 'A':
                        movePlayer(-1, 0);
                        break;
                    case 'ArrowRight':
                    case 'd':
                    case 'D':
                        movePlayer(1, 0);
                        break;
                }
            });

            gameLoop();
        }

        // Initialize animations
        animateAirplane();

        setInterval(createFloatingHeart, 1000);

        setInterval(changeMessage, 8000);

        // Add some initial hearts
        for (let i = 0; i < 5; i++) {
            setTimeout(createFloatingHeart, i * 300);
        }

        const player = document.getElementById('player-game');
        const maze = document.getElementById('maze');
        const loveLetter = document.getElementById('loveLetter');
        const overlay = document.getElementById('overlay');

        let playerPos = { x: 30, y: 250 };
        const playerSize = 20;
        const moveSpeed = 10;

        // Heart-shaped maze walls
        const walls = [
            // Outer heart shape walls
            { x: 0, y: 0, width: 600, height: 20 }, // Top
            { x: 0, y: 480, width: 600, height: 20 }, // Bottom
            { x: 0, y: 0, width: 20, height: 500 }, // Left
            { x: 580, y: 0, width: 20, height: 500 }, // Right

            // Heart shape inner walls
            { x: 50, y: 50, width: 100, height: 20 },
            { x: 200, y: 50, width: 200, height: 20 },
            { x: 450, y: 50, width: 100, height: 20 },

            { x: 50, y: 100, width: 20, height: 80 },
            { x: 130, y: 100, width: 20, height: 50 },
            { x: 200, y: 100, width: 20, height: 100 },
            { x: 280, y: 100, width: 40, height: 20 },
            { x: 380, y: 100, width: 20, height: 100 },
            { x: 450, y: 100, width: 20, height: 50 },
            { x: 530, y: 100, width: 20, height: 80 },

            { x: 100, y: 180, width: 80, height: 20 },
            { x: 420, y: 180, width: 80, height: 20 },

            { x: 150, y: 220, width: 20, height: 60 },
            { x: 220, y: 220, width: 160, height: 20 },
            { x: 430, y: 220, width: 20, height: 60 },

            { x: 200, y: 300, width: 20, height: 80 },
            { x: 250, y: 300, width: 100, height: 20 },
            { x: 380, y: 300, width: 20, height: 80 },

            { x: 270, y: 350, width: 60, height: 20 },
            { x: 290, y: 400, width: 20, height: 50 },
        ];

        // Create wall elements
        walls.forEach(wall => {
            const wallElement = document.createElement('div');
            wallElement.className = 'wall';
            wallElement.style.left = wall.x + 'px';
            wallElement.style.top = wall.y + 'px';
            wallElement.style.width = wall.width + 'px';
            wallElement.style.height = wall.height + 'px';
            maze.appendChild(wallElement);
        });

        // Position player
        function updatePlayerPosition() {
            player.style.left = playerPos.x + 'px';
            player.style.top = playerPos.y + 'px';
        }

        // Check collision with walls
        function checkCollision(newX, newY) {
            const playerRect = {
                x: newX,
                y: newY,
                width: playerSize,
                height: playerSize
            };

            return walls.some(wall => {
                return playerRect.x < wall.x + wall.width &&
                       playerRect.x + playerRect.width > wall.x &&
                       playerRect.y < wall.y + wall.height &&
                       playerRect.y + playerRect.height > wall.y;
            });
        }

        // Check if player reached the finish
        function checkFinish() {
            return playerPos.x >= 540 && playerPos.y >= 220 && playerPos.y <= 280;
        }

        // Show love letter
        function showLoveLetter() {
            overlay.classList.add('show');
            loveLetter.classList.add('show');

            // Add celebration hearts
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createCelebrationHeart();
                }, i * 100);
            }
        }

        // Close love letter
        function closeLetter() {
            overlay.classList.remove('show');
            loveLetter.classList.remove('show');
        }

        // Create celebration hearts
        function createCelebrationHeart() {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = window.innerHeight + 'px';
            heart.style.fontSize = '24px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1001';
            heart.style.transition = 'all 3s ease-out';

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.top = '-50px';
                heart.style.transform = 'rotate(360deg)';
                heart.style.opacity = '0';
            }, 100);

            setTimeout(() => {
                document.body.removeChild(heart);
            }, 3100);
        }

        // Handle keyboard input
        document.addEventListener('keydown', (e) => {
            if (loveLetter.classList.contains('show')) return;

            let newX = playerPos.x;
            let newY = playerPos.y;

            switch(e.key) {
                case 'w':
                    newY -= moveSpeed;
                    break;
                case 's':
                    newY += moveSpeed;
                    break;
                case 'a':
                    newX -= moveSpeed;
                    break;
                case 'D':
                    newX += moveSpeed;
                    break;
                default:
                    return;
            }

            // Keep player within maze bounds
            newX = Math.max(0, Math.min(580 - playerSize, newX));
            newY = Math.max(0, Math.min(480 - playerSize, newY));

            // Check for wall collision
            if (!checkCollision(newX, newY)) {
                playerPos.x = newX;
                playerPos.y = newY;
                updatePlayerPosition();

                // Check if player reached finish
                if (checkFinish()) {
                    setTimeout(showLoveLetter, 500);
                }
            }
        });

        // Initialize game
        updatePlayerPosition();

        // Make closeLetter function global
        window.closeLetter = closeLetter;