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

const shootingStarsContainer = document.getElementById('shooting-stars');

function createShootingStar() {
  const star = document.createElement('div');
  star.classList.add('shooting-star');

  // random start position (top area of screen)
  star.style.top = Math.random() * 40 + '%'; // upper 40% of screen
  star.style.left = Math.random() * 100 + '%';

  // random delay for natural feel
  star.style.animationDuration = (Math.random() * 2 + 2) + 's';

  shootingStarsContainer.appendChild(star);

  // remove after animation ends
  setTimeout(() => {
    star.remove();
  }, 3000);
}

// launch shooting stars every few seconds
setInterval(createShootingStar, 4000);

