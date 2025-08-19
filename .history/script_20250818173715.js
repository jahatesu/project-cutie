const jsConfetti = new JSConfetti()
// -------- SELECT ELEMENTS --------
const wrapper = document.querySelector(".wrapper");
const pinBoxes = document.querySelectorAll('.pin-box');
const buttons = document.querySelectorAll('.heart-pad button');
const noBtn = document.querySelector('.btn-no');
const hintButton = document.querySelector('.hint');
const hintText = document.querySelector('.hint-text');
const lockIcon = document.querySelector('.lock');
const lockOpenIcon = document.querySelector('.lockOpen');

// -------- VARIABLES --------
let pin = [];
let hintStage = 0; // only declare ONCE
const correctCode = "7465";

// -------- "NO" BUTTON MOVEMENT --------
if (noBtn) {
  noBtn.addEventListener('mouseover', () => {
    const wrapperRect = wrapper.getBoundingClientRect();
    const noBtnRect = noBtn.getBoundingClientRect();

    const maxX = wrapperRect.width - noBtnRect.width;
    const maxY = wrapperRect.height - noBtnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
  });
}

// -------- HINT SYSTEM --------
if (hintButton && hintText) {
  hintButton.addEventListener('click', () => {
    if (hintStage === 0) {
      hintText.textContent = "Type the numbers that spell my nickname in ASCII";
      hintButton.textContent = "Another hint?";
      hintStage = 1;
    } else if (hintStage === 1) {
      hintText.textContent = "Two letters in ALL CAPS ";
      hintButton.style.display = "none"; // hide after second hint
    }
  });
}

// -------- PIN VALIDATION --------
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (pin.length < 4) {
      pin.push(btn.dataset.num);
      pinBoxes[pin.length - 1].textContent = btn.dataset.num;
    }

    if (pin.length === 4) {
      if (pin.join("") === correctCode) {
        lockIcon.style.display = "none";
        lockOpenIcon.style.display = "block";
        hintText.textContent = "Correct code! You can proceed.";
        hintText.style.color = "green";
        hintText.style.display = "block";
        jsConfetti.addConfetti()
        setTimeout(() => {
           window.location.href = "homePage.html";
      }, 2500);
      } else {
        hintText.textContent = "Incorrect code, try again!";
        hintText.style.color = "red";

        setTimeout(() => {
          pin = [];
          pinBoxes.forEach(box => box.textContent = "");
          hintText.textContent = "";
        }, 1500);
      }
    }
  });
});

// -------- PARALLAX --------
let moon = document.getElementById('.moon');
let mountain = document.getElementById('.mountain');
let text = document.getElementById('.text');
let front = document.getElementById('.front');
let stars = document.getElementById('stars');

window.addEventListener('scroll', () => {
  let value = window.scrollY;
  stars.style.left = value * 0.25 + 'px';
  moon.style.left = value * 0.05 + 'px';

})