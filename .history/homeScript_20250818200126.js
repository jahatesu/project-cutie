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

const COUNT = 160; // increase for denser stars (e.g., 220+)
    const MIN_SIZE = 0.8; // px
    const MAX_SIZE = 2.6; // px
    const MIN_DUR = 2.2; // seconds (faster twinkle)
    const MAX_DUR = 5.0; // seconds (slower twinkle)

    const sky = document.querySelector('.stars');

