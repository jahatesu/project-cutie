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

function toggleHint() {
  const hintText = document.querySelector('.hint-text');
  if (hintText.style.display === 'block') {
    hintText.style.display = 'none';
  } else {
    hintText.style.display = 'block';
  }
}
