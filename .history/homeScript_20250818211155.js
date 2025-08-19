// -------- PARALLAX --------
let moon = document.getElementById('moon');
let mountain = document.getElementById('mountain');
let text = document.getElementById('text');
let front = document.getElementById('front');
let stars = document.getElementById('stars');
let starSpans = document.querySelectorAll('#stars span');

window.addEventListener('scroll', () => {
  let value = window.scrollY;

  // 🌙 parallax elements
  moon.style.top = value * 1.05 + 'px';
  mountain.style.top = value * 0.5 + 'px';
  front.style.top = value * 0 + 'px';
  text.style.marginRight = value * 4 + 'px';
  text.style.marginTop = value * 1.5 + 'px';

  // ✨ parallax stars
  starSpans.forEach((star, i) => {
    let speed = 0.1 + (i % 5) * 0.05; // vary each star’s speed
    star.style.transform = `translateX(${value * -speed}px)`;
  });
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

  // random brightness
  const brightness = Math.random() * 0.5 + 0.5; // 0.5–1
  star.style.backgroundColor = `rgba(255, 255, 255, ${brightness})`;

  // add twinkle animation
  star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`;
  star.style.animationName = 'twinkle';
  star.style.animationTimingFunction = 'ease-in-out';
  star.style.animationIterationCount = 'infinite';
  star.style.animationDuration = (Math.random() * 3 + 2).toFixed(2) + 's';
  star.style.animationFillMode = 'both';
  star.style.animationPlayState = 'running';



  // random animation delay for natural twinkle
  star.style.animationDelay = (Math.random() * 6).toFixed(2) + 's';

  starContainer.appendChild(star);
}
