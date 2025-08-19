// -------- SELECT ELEMENTS --------
const wrapper = document.querySelector(".wrapper");
const pinBoxes = document.querySelectorAll('.pin-box');
const buttons = document.querySelectorAll('.heart-pad button');
const noBtn = document.querySelector('.btn-no');
const hintButton = document.querySelector('.hint');
const hintText = document.querySelector('.hint-text');
const lockIcon = document.querySelector('.lock');
const lockOpenIcon = document.querySelector('.lockOpen');

import JSConfetti from 'js-confetti'
const jsConfetti = new JSConfetti()

jsConfetti.addConfetti()

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
const pinButtons = document.querySelector('.heart-pad button');
const pinBoxesVal = document.querySelectorAll('.pin-box');
const hintTextVal = document.querySelector('.hint-text');

let enteredCode = "";
const correctCode = "7465";
let hintClicked = false;

// Handle heart button clicks
let pin = [];
let hintStage = 0;

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (pin.length < 4) {
            pin.push(btn.dataset.num);
            pinBoxes[pin.length - 1].textContent = btn.dataset.num;
        }

        // If 4 digits entered, check
        if (pin.length === 4) {
            if (pin.join("") === correctCode) {
              lockIcon.style.display = "none";
              lockOpenIcon.style.display = "block";
                hintText.textContent = "Correct code! You can proceed.";
                hintText.style.color = "green";
                hintText.style.display = "block"; // show hint text
                // window.location.href = "next-card.html"; // redirect
            } else {
                hintText.textContent = "Incorrect code, try again!";
                hintText.style.color = "red";

                // Reset after short delay
                setTimeout(() => {
                    pin = [];
                    pinBoxes.forEach(box => box.textContent = "");
                    hintText.textContent = "";
                }, 1500);
            }
        }
    });
});
