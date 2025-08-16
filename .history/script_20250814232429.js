const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const yesBtn = document.querySelector(".btn-yes");
const noBtn = document.querySelector(".btn-no");

  const pinBoxes = document.querySelectorAll('.pin-box');
  const buttons = document.querySelectorAll('.heart-pad button');
  let pin = [];

const wrapperRect = wrapper.getBoundingClientRect();
const noBtnRect = noBtn.getBoundingClientRect();


yesBtn.addEventListener('click', () => {
    question.innerHTML = 'I knew it! Love you too <3 ';
})

noBtn.addEventListener('mouseover', () => {
    const i = Math.floor(Math.random() * (wrapperRect.width - noBtnRect.width));
    const j = Math.floor(Math.random() * (wrapperRect.height - noBtnRect.height));
    noBtn.style.left = i + "px";
    noBtn.style.top = j + "px";
})
