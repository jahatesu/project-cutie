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

document.addEventListener("DOMContentLoaded", () => {
  fetch(".vinyl.svg")
  .then((response) => response.text())
  .then((svg) =>
    
})