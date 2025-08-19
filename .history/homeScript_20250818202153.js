// -------- PARALLAX --------
let moon = document.getElementById('moon');
let mountain = document.getElementById('mountain');
let text = document.getElementById('text');
let front = document.getElementById('front');
let stars = document.getElementById('stars');

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  stars.style.left = value * 0.25 + 'px';
  moon.style.top = value * 1.05 + 'px';
  mountain.style.top = value * 0.5 + 'px';
  front.style.top = value * 0 + 'px';
  text.style.marginRight = value * 4 + 'px';
  text.style.marginTop = value * 1.5 + 'px';
});

const starContainer = document.querySelector('.stars');
const starCount = 250; // adjust how many stars you want

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('span');

 // random position
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';

  // random size
  const size = Math.random() * 3 + 2; // 2px–5px
  star.style.width = size + 'px';
  star.style.height = size + 'px';


  // random animation delay for natural twinkle
  star.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';

  starContainer.appendChild(star);
}
