// Import JSConfetti library
const jsConfetti = new JSConfetti()

// -------- SELECT ELEMENTS --------
const wrapper = document.querySelector(".wrapper")
const pinBoxes = document.querySelectorAll(".pin-box")
const buttons = document.querySelectorAll(".heart-pad button")
const noBtn = document.querySelector(".btn-no")
const hintButton = document.querySelector(".hint")
const hintText = document.querySelector(".hint-text")
const lockIcon = document.querySelector(".lock")
const lockOpenIcon = document.querySelector(".lockOpen")
window.addEventListener("scroll", () => {
  const value = window.scrollY
  stars?.style.setProperty("left", value * 0.25 + "px")
  moon?.style.setProperty("top", value * 1.05 + "px")
  mountain?.style.setProperty("top", value * 0.5 + "px")
  text?.style.setProperty("marginRight", value * 4 + "px")
  text?.style.setProperty("marginTop", value * 1.5 + "px")
})
// -------- VARIABLES --------
let pin = []
let hintStage = 0
const correctCode = "7465"

function createSparkle(x, y) {
  const sparkle = document.createElement("div")
  sparkle.innerHTML = "✨"
  sparkle.style.position = "fixed"
  sparkle.style.left = x + "px"
  sparkle.style.top = y + "px"
  sparkle.style.fontSize = "1.5rem"
  sparkle.style.pointerEvents = "none"
  sparkle.style.zIndex = "1000"
  sparkle.style.animation = "sparkleFloat 1s ease-out forwards"

  document.body.appendChild(sparkle)

  setTimeout(() => {
    sparkle.remove()
  }, 1000)
}

const style = document.createElement("style")
style.textContent = `
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-50px) scale(0.5);
        }
    }
`
document.head.appendChild(style)

// -------- "NO" BUTTON MOVEMENT --------
if (noBtn) {
  noBtn.addEventListener("mouseover", () => {
    const wrapperRect = wrapper.getBoundingClientRect()
    const noBtnRect = noBtn.getBoundingClientRect()

    const maxX = wrapperRect.width - noBtnRect.width
    const maxY = wrapperRect.height - noBtnRect.height

    const randomX = Math.floor(Math.random() * maxX)
    const randomY = Math.floor(Math.random() * maxY)

    noBtn.style.position = "absolute"
    noBtn.style.left = randomX + "px"
    noBtn.style.top = randomY + "px"
  })
}

// -------- ENHANCED HINT SYSTEM --------
if (hintButton && hintText) {
  hintButton.addEventListener("click", () => {
    if (hintStage === 0) {
      hintText.textContent = "Spell my nickname in ASCII"
      hintText.classList.add("show")
      hintButton.textContent = "Another hint? 💭"
      hintStage = 1
    } else if (hintStage === 1) {
      hintText.textContent = "Two letters in ALL CAPS "
      hintButton.style.display = "none"
    }
  })
}

// -------- ENHANCED PIN VALIDATION --------
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    createSparkle(x, y)

    if (pin.length < 4) {
      pin.push(btn.dataset.num)
      const pinBox = pinBoxes[pin.length - 1]
      pinBox.textContent = btn.dataset.num

      pinBox.style.transform = "scale(1.2)"
      setTimeout(() => {
        pinBox.style.transform = "scale(1)"
      }, 200)
    }

    if (pin.length === 4) {
      if (pin.join("") === correctCode) {
        lockIcon.style.display = "none"
        lockOpenIcon.style.display = "block"
        hintText.textContent = "💖 Correct code! 💖"
        hintText.style.color = "green"
        hintText.style.display = "block"
        hintText.classList.add("show")

        jsConfetti.addConfetti({
          confettiColors: ["#c084fc", "#f0abfc", "#ec4899", "#a855f7", "#fbbf24", "#f472b6", "#d946ef", "#e879f9"],
          confettiRadius: 6,
          confettiNumber: 150,
        })

        setTimeout(() => {
          window.location.href = "project/omePage.html"
        }, 2500)
      } else {
        hintText.textContent = "Incorrect code, try again!"
        hintText.style.color = "red"
        hintText.classList.add("show")

        wrapper.classList.add("shake")
        setTimeout(() => {
          wrapper.classList.remove("shake")
        }, 600)

        setTimeout(() => {
          pin = []
          pinBoxes.forEach((box) => {
            box.textContent = ""
            box.style.transform = "scale(0.8)"
            setTimeout(() => {
              box.style.transform = "scale(1)"
            }, 100)
          })
          hintText.textContent = ""
          hintText.classList.remove("show")
        }, 1500)
      }
    }
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const floatingHearts = document.querySelectorAll(".floating-heart")
  floatingHearts.forEach((heart, index) => {
    heart.style.animationDelay = `${index * 0.5}s`
  })
})
