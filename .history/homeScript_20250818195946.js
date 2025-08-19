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

    // Create stars
    for (let i = 0; i < COUNT; i++) {
      const star = document.createElement('span');

      // Random position across the viewport
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      // Randomize size, duration, and delay
      const size = (Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE).toFixed(2);
      const dur = (Math.random() * (MAX_DUR - MIN_DUR) + MIN_DUR).toFixed(2) + 's';
      const delay = (Math.random() * MAX_DUR).toFixed(2) + 's';

      star.style.top = top + '%';
      star.style.left = left + '%';
      star.style.setProperty('--size', size + 'px');
      star.style.setProperty('--dur', dur);
      star.style.animationDelay = delay;

      sky.appendChild(star);
