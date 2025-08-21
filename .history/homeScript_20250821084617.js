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
  if (front) front.style.top = "0px"
  if (text) {
    text.style.marginRight = value * 4 + "px"
    text.style.marginTop = value * 1.5 + "px"
  }
})

// -------- ENHANCED STAR GENERATION --------
const starContainer = document.querySelector("#stars")

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

    this.setVolume(this.volume)
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play().catch((e) => {
        console.log("[v0] Audio play failed:", e)
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

      if (this.lyricsInterval) {
        clearInterval(this.lyricsInterval)
        this.lyricsInterval = null
      }
    }
  }

  updateLyrics() {
    const currentTime = this.audio.currentTime
    let activeIndex = -1

    for (let i = 0; i < this.lyricLines.length; i++) {
      const lineTime = Number.parseFloat(this.lyricLines[i].dataset.time)
      if (currentTime >= lineTime) {
        activeIndex = i
      } else {
        break
      }
    }

    if (activeIndex !== this.currentLyricIndex) {
      this.currentLyricIndex = activeIndex
      this.highlightLyric(activeIndex)
    }
  }

  startLyricsSimulation() {
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

    const percentage = this.volume * 100
    this.volumeSlider.style.background = `linear-gradient(to right, #ec4899 0%, #ec4899 ${percentage}%, #d1d5db ${percentage}%, #d1d5db 100%)`

    const brightness = 0.8 + this.volume * 0.4
    this.record.style.filter = `brightness(${brightness})`
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new VinylPlayer()
})

function animateAirplane() {
  const airplane = document.getElementById("airplane")
  const path = document.querySelector(".connection-path")

  if (!airplane || !path) return

  const pathLength = path.getTotalLength()
  let progress = 0
  const duration = 10000 // 10 seconds for complete journey

  function animate() {
    progress += 16 / duration
    if (progress > 1) progress = 0

    const point = path.getPointAtLength(progress * pathLength)
    const nextPoint = path.getPointAtLength((progress + 0.01) * pathLength)

    const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI

    airplane.setAttribute("transform", `translate(${point.x}, ${point.y}) rotate(${angle})`)

    requestAnimationFrame(animate)
  }

  animate()
}

function createFloatingHeart() {
  const heartsContainer = document.getElementById("floating-hearts")
  if (!heartsContainer) return

  const heart = document.createElement("div")
  heart.className = "heart"
  heart.innerHTML = ["💖", "💕", "💗", "💝", "💘", "🌸", "✨"][Math.floor(Math.random() * 7)]
  heart.style.left = Math.random() * 100 + "%"
  heart.style.animationDuration = Math.random() * 4 + 6 + "s"
  heart.style.animationDelay = Math.random() * 2 + "s"

  heartsContainer.appendChild(heart)

  setTimeout(() => {
    heart.remove()
  }, 10000)
}

let messageIndex = 0
// function changeMessage() {
//   const messageElement = document.getElementById("love-message")
//   if (messageElement) {
//     messageElement.textContent = messages[messageIndex]
//     messageIndex = (messageIndex + 1) % messages.length
//   }
}

document.addEventListener("click", (e) => {
  for (let i = 0; i < 8; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "sparkle"
    sparkle.style.position = "fixed"
    sparkle.style.left = e.clientX + Math.random() * 30 - 15 + "px"
    sparkle.style.top = e.clientY + Math.random() * 30 - 15 + "px"
    sparkle.style.animationDelay = Math.random() * 0.5 + "s"
    sparkle.style.zIndex = "9999"
    document.body.appendChild(sparkle)

    setTimeout(() => sparkle.remove(), 2000)
  }
})

// Initialize animations
animateAirplane()
setInterval(createFloatingHeart, 1200)
setInterval(changeMessage, 8000)

// Add initial hearts
for (let i = 0; i < 5; i++) {
  setTimeout(createFloatingHeart, i * 400)
}

const player = document.getElementById("player-game")
const maze = document.getElementById("maze")
const loveLetter = document.getElementById("loveLetter")
const overlay = document.getElementById("overlay")

const playerPos = { x: 30, y: 250 }
const playerSize = 20
const moveSpeed = 10

const walls = [
  { x: 0, y: 0, width: 600, height: 20 },
  { x: 0, y: 480, width: 600, height: 20 },
  { x: 0, y: 0, width: 20, height: 500 },
  { x: 580, y: 0, width: 20, height: 500 },
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

function updatePlayerPosition() {
  if (player) {
    player.style.left = playerPos.x + "px"
    player.style.top = playerPos.y + "px"
  }
}

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

function checkFinish() {
  return playerPos.x >= 540 && playerPos.y >= 220 && playerPos.y <= 280
}

function showLoveLetter() {
  if (overlay && loveLetter) {
    overlay.classList.add("show")
    loveLetter.classList.add("show")

    // Add celebration hearts and sparkles
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        createCelebrationHeart()
        createCelebrationSparkle()
      }, i * 80)
    }
  }
}

function closeLetter() {
  if (overlay && loveLetter) {
    overlay.classList.remove("show")
    loveLetter.classList.remove("show")
  }
}

function createCelebrationHeart() {
  const heart = document.createElement("div")
  heart.innerHTML = ["💖", "💕", "💗", "💝", "💘"][Math.floor(Math.random() * 5)]
  heart.style.position = "fixed"
  heart.style.left = Math.random() * window.innerWidth + "px"
  heart.style.top = window.innerHeight + "px"
  heart.style.fontSize = Math.random() * 20 + 20 + "px"
  heart.style.pointerEvents = "none"
  heart.style.zIndex = "1001"
  heart.style.transition = "all 4s ease-out"

  document.body.appendChild(heart)

  setTimeout(() => {
    heart.style.top = "-100px"
    heart.style.transform = `rotate(${Math.random() * 720 - 360}deg) scale(0.5)`
    heart.style.opacity = "0"
  }, 100)

  setTimeout(() => {
    if (heart.parentNode) {
      document.body.removeChild(heart)
    }
  }, 4100)
}

function createCelebrationSparkle() {
  const sparkle = document.createElement("div")
  sparkle.style.position = "fixed"
  sparkle.style.left = Math.random() * window.innerWidth + "px"
  sparkle.style.top = Math.random() * window.innerHeight + "px"
  sparkle.style.width = "6px"
  sparkle.style.height = "6px"
  sparkle.style.background = "linear-gradient(45deg, #fbbf24, #f59e0b)"
  sparkle.style.borderRadius = "50%"
  sparkle.style.pointerEvents = "none"
  sparkle.style.zIndex = "1001"
  sparkle.style.boxShadow = "0 0 15px rgba(251, 191, 36, 0.8)"
  sparkle.style.animation = "sparkle 2s ease-in-out"

  document.body.appendChild(sparkle)

  setTimeout(() => {
    if (sparkle.parentNode) {
      document.body.removeChild(sparkle)
    }
  }, 2000)
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  if (loveLetter && loveLetter.classList.contains("show")) return

  let newX = playerPos.x
  let newY = playerPos.y

  switch (e.key.toLowerCase()) {
    case "arrowup":
    case "w":
      newY -= moveSpeed
      break
    case "arrowdown":
    case "s":
      newY += moveSpeed
      break
    case "arrowleft":
    case "a":
      newX -= moveSpeed
      break
    case "arrowright":
    case "d":
      newX += moveSpeed
      break
    default:
      return
  }

  newX = Math.max(0, Math.min(580 - playerSize, newX))
  newY = Math.max(0, Math.min(480 - playerSize, newY))

  if (!checkCollision(newX, newY)) {
    playerPos.x = newX
    playerPos.y = newY
    updatePlayerPosition()

    if (checkFinish()) {
      setTimeout(showLoveLetter, 500)
    }
  }
})

// Initialize game
updatePlayerPosition()

// Make closeLetter function global
window.closeLetter = closeLetter
