// -------- PARALLAX --------
let moon = document.getElementById('moon');
let mountain = document.getElementById('mountain');
let text = document.getElementById('text');
let front = document.getElementById('.front');
let stars = document.getElementById('stars');

window.addEventListener('scroll', () => {
let value = window.scrollY;
  s/* The commented code block is part of a parallax effect implementation in JavaScript. */
  tars.style.left = value * 0.25 + 'px';
  moon.style.top = value * 1.05 + 'px';
  mountain.style.top = value * 0.5 + 'px';
  front.style.top = value * 0 + 'px';
  text.style.marginRight = value * 4 + 'px';

})