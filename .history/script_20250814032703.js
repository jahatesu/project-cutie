const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const yesBtn = document.querySelector(".btn-yes");
const noBtn = document.querySelector(".btn-no");

const wrapperRect = wrapper.getBoundingClientRect();
yesBtn.addEventListener('click', () => {
    question.innerHTML = 'I knew it! Love you too <3 ';
})
