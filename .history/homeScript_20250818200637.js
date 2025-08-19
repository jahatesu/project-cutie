// -------- PARALLAX --------
let moon = document.getElementById('moon');
let mountain = document.getElementById('mountain');
let text = document.getElementById('text');
let front = document.getElementById('front');
let stars = document.getElementById('stars');

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  // stars.style.left = value * 0.25 + 'px';
  moon.style.top = value * 1.05 + 'px';
  mountain.style.top = value * 0.5 + 'px';
  front.style.top = value * 0 + 'px';
  text.style.marginRight = value * 4 + 'px';
  text.style.marginTop = value * 1.5 + 'px';
});

const starContainer = document.querySelector('.stars');
const starCount = 350; // adjust how many stars you want

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('span');

  // random position (closer to top-middle)
  star.style.top = Math.random() * 80 + '%';   // only up to 60% height
  star.style.left = Math.random() * 50 + '%'; // full width

  // random animation delay for natural twinkle
  star.style.animationDelay = (Math.random() * 3).toFixed(2) + 's';

  starContainer.appendChild(star);
}
