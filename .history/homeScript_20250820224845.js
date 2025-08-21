// -------- PARALLAX EFFECTS --------
const moon = document.getElementById("moon")
const mountain = document.getElementById("mountain")
const text = document.getElementById("text")
const front = document.getElementById("front")
const stars = document.getElementById("stars")

window.addEventListener("scroll", () => {
  const value = window.scrollY

  if (stars) stars.style.left = value * 0.25 + "px"
  if (moon) moon.style.top = value * 1.05 + "px"
  if (mountain) mountain.style.top = value * 0.5 + "px"
  if (front) front.style.top = "0px" // unnecessary calc
  if (text) {
    text.style.marginRight = value * 4 + "px"
    text.style.marginTop = value * 1.5 + "px"
  }
})

// -------- ENHANCED STAR GENERATION --------
const starContainer = document.querySelector("#stars") // FIXED

if (starContainer) {
  const starCount = 300

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("span")

    star.style.top = Math.random() * 100 + "%"
    star.style.left = Math.random() * 100 + "%"

    const size = Math.random() * 4 + 1
    star.style.width = size + "px"
    star.style.height = size + "px"

    const brightness = Math.random() * 0.6 + 0.4
    star.style.backgroundColor = `rgba(255, 255, 255, ${brightness})`

    const duration = Math.random() * 4 + 2
    const delay = Math.random() * 8

    star.style.animation = `twinkle ${duration}s infinite ease-in-out`
    star.style.animationDelay = delay + "s"

    starContainer.appendChild(star)
  }
}

// -------- SHOOTING STARS --------
function createShootingStar() {
  const shootingStar = document.createElement("div")
  shootingStar.className = "shooting-star"

  shootingStar.style.top = Math.random() * 50 + "%"
  shootingStar.style.left = "-10px"

  document.body.appendChild(shootingStar)

  setTimeout(() => {
    if (shootingStar.parentNode) {
      shootingStar.parentNode.removeChild(shootingStar)
    }
  }, 3000)
}

setInterval(createShootingStar, 8000)

class VinylPlayer {
  constructor() {
    this.isPlaying = false
    this.volume = 0.7
    this.currentLyricIndex = -1

    this.record = document.getElementById("record")
    this.toneArm = document.getElementById("toneArm")
    this.playBtn = document.getElementById("playBtn")
    this.volumeSlider = document.getElementById("volumeSlider")
    this.statusLight = document.getElementById("statusLight")
    this.audio = document.getElementById("audioPlayer")
    this.lyricsDisplay = document.getElementById("lyricsDisplay")
    this.lyricLines = document.querySelectorAll(".lyric-line")

    this.init()
  }

  init() {
    this.playBtn.addEventListener("click", () => this.togglePlay())
    this.volumeSlider.addEventListener("input", (e) => this.setVolume(e.target.value))

    this.audio.addEventListener("ended", () => this.stop())
    this.audio.addEventListener("pause", () => this.updateVisualState(false))
    this.audio.addEventListener("play", () => this.updateVisualState(true))
    this.audio.addEventListener("timeupdate", () => this.updateLyrics())

    // Set initial volume
    this.setVolume(this.volume)
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play().catch((e) => {
        console.log("[v0] Audio play failed:", e)
        // Fallback to visual-only mode if audio fails
        this.updateVisualState(true)
        this.startLyricsSimulation()
      })
    } else {
      this.audio.pause()
    }
  }

  updateVisualState(playing) {
    this.isPlaying = playing

    if (playing) {
      this.record.classList.add("spinning")
      this.toneArm.classList.add("play")
      this.playBtn.classList.add("playing")
      this.statusLight.classList.add("active")
      this.record.style.transform = "scale(1.02)"
    } else {
      this.record.classList.remove("spinning")
      this.toneArm.classList.remove("play")
      this.playBtn.classList.remove("playing")
      this.statusLight.classList.remove("active")
      this.record.style.transform = "scale(1)"

      // Stop lyrics simulation if running
      if (this.lyricsInterval) {
        clearInterval(this.lyricsInterval)
        this.lyricsInterval = null
      }
    }
  }

  updateLyrics() {
    const currentTime = this.audio.currentTime
    let activeIndex = -1

    // Find the current lyric line based on time
    for (let i = 0; i < this.lyricLines.length; i++) {
      const lineTime = Number.parseFloat(this.lyricLines[i].dataset.time)
      if (currentTime >= lineTime) {
        activeIndex = i
      } else {
        break
      }
    }

    // Update lyric display if changed
    if (activeIndex !== this.currentLyricIndex) {
      this.currentLyricIndex = activeIndex
      this.highlightLyric(activeIndex)
    }
  }

  startLyricsSimulation() {
    // Fallback lyrics simulation when audio fails
    let simulatedTime = 0
    this.lyricsInterval = setInterval(() => {
      if (!this.isPlaying) return

      simulatedTime += 0.1
      let activeIndex = -1

      for (let i = 0; i < this.lyricLines.length; i++) {
        const lineTime = Number.parseFloat(this.lyricLines[i].dataset.time)
        if (simulatedTime >= lineTime) {
          activeIndex = i
        } else {
          break
        }
      }

      if (activeIndex !== this.currentLyricIndex) {
        this.currentLyricIndex = activeIndex
        this.highlightLyric(activeIndex)
      }
    }, 100)
  }

  highlightLyric(activeIndex) {
    this.lyricLines.forEach((line, index) => {
      line.classList.remove("active", "passed")

      if (index === activeIndex) {
        line.classList.add("active")
        // Scroll to active lyric
        line.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      } else if (index < activeIndex) {
        line.classList.add("passed")
      }
    })
  }

  play() {
    this.updateVisualState(true)
  }

  stop() {
    this.audio.pause()
    this.audio.currentTime = 0
    this.updateVisualState(false)
    this.currentLyricIndex = -1
    this.lyricLines.forEach((line) => {
      line.classList.remove("active", "passed")
    })
  }

  setVolume(value) {
    this.volume = Number.parseFloat(value)
    this.audio.volume = this.volume

    // Visual feedback for volume
    const percentage = this.volume * 100
    this.volumeSlider.style.background = `linear-gradient(to right, #a855f7 0%, #a855f7 ${percentage}%, #4c1d95 ${percentage}%, #4c1d95 100%)`

    // Simulate volume effect on record brightness
    const brightness = 0.8 + this.volume * 0.4
    this.record.style.filter = `brightness(${brightness})`
  }
}

// Initialize the vinyl player when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Initialize page loading
  setTimeout(() => {
    document.querySelector(".page-container").classList.add("loaded")
  }, 1000)

  // Initialize vinyl player
  new VinylPlayer()

  // Initialize other animations
  animateAirplane()

  // Create floating hearts periodically
  setInterval(createFloatingHeart, 1500)

  // Change messages every 6 seconds
  setInterval(changeMessage, 6000)

  // Add some initial hearts
  for (let i = 0; i < 3; i++) {
    setTimeout(createFloatingHeart, i * 500)
  }

  // Initialize maze game
  if (!window.mazeInitialized) {
    initMazeGame()
    window.mazeInitialized = true
  }
})

// Airplane animation along the curved path
function animateAirplane() {
  const airplane = document.getElementById("airplane")
  const path = document.querySelector(".connection-path")
  const pathLength = path.getTotalLength()

  let progress = 0
  const duration = 8000 // 8 seconds for complete journey

  function animate() {
    progress += 16 / duration // 60fps
    if (progress > 1) progress = 0

    const point = path.getPointAtLength(progress * pathLength)
    const nextPoint = path.getPointAtLength((progress + 0.01) * pathLength)

    // Calculate rotation angle
    const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI

    airplane.setAttribute("transform", `translate(${point.x}, ${point.y}) rotate(${angle})`)

    requestAnimationFrame(animate)
  }

  animate()
}

// Create floating hearts
function createFloatingHeart() {
  const heartsContainer = document.getElementById("floating-hearts")
  const heart = document.createElement("div")
  heart.className = "heart"
  heart.innerHTML = ["💖", "💕", "💗", "💝", "💘"][Math.floor(Math.random() * 5)]
  heart.style.left = Math.random() * 100 + "%"
  heart.style.animationDuration = Math.random() * 3 + 5 + "s"
  heart.style.animationDelay = Math.random() * 2 + "s"

  heartsContainer.appendChild(heart)

  setTimeout(() => {
    heart.remove()
  }, 8000)
}

// Romantic messages
const messages = [
  "Distance means nothing when someone means everything 💕",
  "Love knows no boundaries 🌍",
  "Two hearts, one love, endless miles 💖",
  "Connected by love across the ocean 🌊",
  "Every mile between us makes our love stronger 💪",
  "Love travels at the speed of light ✨",
]

let messageIndex = 0
function changeMessage() {
  const messageElement = document.getElementById("love-message")
  messageElement.textContent = messages[messageIndex]
  messageIndex = (messageIndex + 1) % messages.length
}

function initMazeGame() {
  const player = document.getElementById("player-game")
  const maze = document.getElementById("maze")
  const loveLetter = document.getElementById("loveLetter")
  const overlay = document.getElementById("overlay")

  const playerPos = { x: 30, y: 250 }
  const playerSize = 20
  const moveSpeed = 10

  // Heart-shaped maze walls (keeping existing wall configuration)
  const walls = [
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
  ]

  // Create wall elements
  walls.forEach((wall) => {
    const wallElement = document.createElement("div")
    wallElement.className = "wall"
    wallElement.style.left = wall.x + "px"
    wallElement.style.top = wall.y + "px"
    wallElement.style.width = wall.width + "px"
    wallElement.style.height = wall.height + "px"
    maze.appendChild(wallElement)
  })

  // Position player
  function updatePlayerPosition() {
    player.style.left = playerPos.x + "px"
    player.style.top = playerPos.y + "px"
  }

  // Check collision with walls
  function checkCollision(newX, newY) {
    const playerRect = {
      x: newX,
      y: newY,
      width: playerSize,
      height: playerSize,
    }

    return walls.some((wall) => {
      return (
        playerRect.x < wall.x + wall.width &&
        playerRect.x + playerRect.width > wall.x &&
        playerRect.y < wall.y + wall.height &&
        playerRect.y + playerRect.height > wall.y
      )
    })
  }

  // Check if player reached the finish
  function checkFinish() {
    return playerPos.x >= 540 && playerPos.y >= 220 && playerPos.y <= 280
  }

  // Show love letter
  function showLoveLetter() {
    overlay.classList.add("show")
    loveLetter.classList.add("show")

    // Add celebration hearts
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createCelebrationHeart()
      }, i * 100)
    }
  }

  // Create celebration hearts
  function createCelebrationHeart() {
    const heart = document.createElement("div")
    heart.innerHTML = "💖"
    heart.style.position = "fixed"
    heart.style.left = Math.random() * window.innerWidth + "px"
    heart.style.top = window.innerHeight + "px"
    heart.style.fontSize = "24px"
    heart.style.pointerEvents = "none"
    heart.style.zIndex = "1001"
    heart.style.transition = "all 3s ease-out"

    document.body.appendChild(heart)

    setTimeout(() => {
      heart.style.top = "-50px"
      heart.style.transform = "rotate(360deg)"
      heart.style.opacity = "0"
    }, 100)

    setTimeout(() => {
      if (heart.parentNode) {
        document.body.removeChild(heart)
      }
    }, 3100)
  }

  // Handle keyboard input
  document.addEventListener("keydown", (e) => {
    if (loveLetter.classList.contains("show")) return

    let newX = playerPos.x
    let newY = playerPos.y

    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        newY -= moveSpeed
        break
      case "ArrowDown":
      case "s":
      case "S":
        newY += moveSpeed
        break
      case "ArrowLeft":
      case "a":
      case "A":
        newX -= moveSpeed
        break
      case "ArrowRight":
      case "d":
      case "D":
        newX += moveSpeed
        break
      default:
        return
    }

    // Keep player within maze bounds
    newX = Math.max(0, Math.min(580 - playerSize, newX))
    newY = Math.max(0, Math.min(480 - playerSize, newY))

    // Check for wall collision
    if (!checkCollision(newX, newY)) {
      playerPos.x = newX
      playerPos.y = newY
      updatePlayerPosition()

      // Check if player reached finish
      if (checkFinish()) {
        setTimeout(showLoveLetter, 500)
      }
    }
  })

  // Initialize game
  updatePlayerPosition()
}

function closeLetter() {
  const overlay = document.getElementById("overlay")
  const loveLetter = document.getElementById("loveLetter")

  overlay.classList.remove("show")
  loveLetter.classList.remove("show")
}

// Make closeLetter function global
window.closeLetter = closeLetter
