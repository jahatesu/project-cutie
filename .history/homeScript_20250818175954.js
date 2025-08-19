// -------- PARALLAX --------
let moon = document.getElementById('moon');
let mountain = document.getElementById('mountain');
let text = document.getElementById('text');
let front = document.getElementById('front');
let stars = document.getElementById('stars');

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  stars.style.transform = `translateX(${value * 0.25}px)`;
  moon.style.transform = `translateY(${value * 1.05}px)`;
  mountain.style.transform = `translateY(${value * 0.5}px)`;
  front.style.transform = `translateY(${value * 0.3}px)`; 
  text.style.transform = `translate(${value * 4}px, ${value * 1.5}px)`;
});