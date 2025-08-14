const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const yesBtn = document.querySelector(".btn-yes");
const noBtn = document.querySelector(".no-btn");

yesBtn.addEventListener('click', () => {
    question.innerHTML = 'I knew it! Love you too <3 ';
})