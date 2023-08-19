'use strict';

const showScore = document.querySelector('.score');
const guess = document.querySelector('.guess');
const showNumber = document.querySelector('.number');
let highScore = 0;
let score = 20;
let secretNumber = Math.trunc(Math.random() * 20) + 1;

// message

function showMessage(message) {
  return (document.querySelector('.message').textContent = message);
}

// check number
document.querySelector('.check').addEventListener('click', function () {
  const input = Number(guess.value);
  if (!input) {
    showMessage('⛔ No number!');
  }
  if (input === secretNumber) {
    document.querySelector('body').style.backgroundColor = 'green';
    showMessage('🎉 Correct number!');
    showNumber.style.width = '30rem';
    showNumber.textContent = secretNumber;
    if (score > highScore) {
      document.querySelector('.highscore').textContent = score;
    }
  }
  if (input !== secretNumber) {
    input > secretNumber ? showMessage('Too high!') : showMessage('Too low!');
    score--;
    showScore.textContent = score;
  }
});

// play again
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';
  showNumber.style.width = '15rem';
  showNumber.textContent = '?';
  showMessage('Start guessing...');
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  showScore.textContent = score;
  guess.value = '';
});
