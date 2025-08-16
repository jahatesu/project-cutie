const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const yesBtn = document.querySelector(".btn-yes");
const noBtn = document.querySelector(".btn-no");

const pinBoxes = document.querySelectorAll('.pin-box');
const buttons = document.querySelectorAll('.heart-pad button');
let pin = [];

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (pin.length < 4) {
      pin.push(btn.dataset.num);
      pinBoxes[pin.length - 1].textContent = btn.dataset.num; // show number
    }
  });
});

const wrapperRect = wrapper.getBoundingClientRect();
const noBtnRect = noBtn.getBoundingClientRect();

noBtn.addEventListener('mouseover', () => {
    const i = Math.floor(Math.random() * (wrapperRect.width - noBtnRect.width));
    const j = Math.floor(Math.random() * (wrapperRect.height - noBtnRect.height));
    noBtn.style.left = i + "px";
    noBtn.style.top = j + "px";
})

let hintStage = 0;

function showHint() {
  const hintText = document.querySelector('.hint-text');
  const hintButton = document.querySelector('.hint');

  if (hintStage === 0) {
    hintText.textContent = "It’s the ASCII code of my nickname 💖";
    hintButton.textContent = "Another hint?";
    hintStage = 1;
  } else if (hintStage === 1) {
    hintText.textContent = "Two letters in ALL CAPS 😉";
    hintButton.style.display = "none"; // hide after second hint (optional)
  }
}