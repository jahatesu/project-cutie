document.addEventListener("DOMContentLoaded", () => {
  // Page load animation
  const loadingOverlay = document.getElementById("loading-overlay")
  const fadeInElements = document.querySelectorAll(".fade-in")

  // Hide loading overlay after a short delay
  setTimeout(() => {
    loadingOverlay.classList.add("fade-out")

    // Show content with staggered animation
    setTimeout(() => {
      fadeInElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("visible")
        }, index * 200)
      })
    }, 500)
  }, 1000)

  // -------- PARALLAX --------
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
    if (front) front.style.top = value * 0 + "px"
    if (text) {
      text.style.marginRight = value * 4 + "px"
      text.style.marginTop = value * 1.5 + "px"
    }
  })

  function generateStars() {
    const starContainer = document.querySelector(".stars")
    if (!starContainer) return

    const starCount = 250
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("span")

      // Random position
      star.style.top = Math.random() * 100 + "%"
      star.style.left = Math.random() * 100 + "%"

      // Random size
      const size = Math.random() * 3 + 2
      star.style.width = size + "px"
      star.style.height = size + "px"

      // Random brightness
      const brightness = Math.random() * 0.5 + 0.5
      star.style.backgroundColor = `rgba(255, 255, 255, ${brightness})`

      // Add twinkle animation
      star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`
      star.style.animationDelay = (Math.random() * 6).toFixed(2) + "s"

      fragment.appendChild(star)
    }

    starContainer.appendChild(fragment)
  }

  // Initialize stars
  generateStars()

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe elements that should animate on scroll
  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el)
  })
})
