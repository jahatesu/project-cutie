// -------- SELECT ELEMENTS --------
const wrapper = document.querySelector(".wrapper");
const pinBoxes = document.querySelectorAll('.pin-box');
const buttons = document.querySelectorAll('.heart-pad button');
const noBtn = document.querySelector('.btn-no'); // make sure you have a "No" button in HTML
const hintButton = document.querySelector('.hint');
const hintText = document.querySelector('.hint-text');

let pin = [];
let hintStage = 0;

// -------- HEART BUTTON / PIN PAD --------
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (pin.length < 4) {
      pin.push(btn.dataset.num);
      pinBoxes[pin.length - 1].textContent = btn.dataset.num;
    }
  });
});

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
const correctPin = "7456"; //ASCII for JA
const resultText = document.querySelector(".result")
const card1 = document.querySelector(".card1"); // current card
const card2 = document.querySelector(".card2"); // next card

function checkPin() {
  
}
