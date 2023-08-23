'use strict';

// variables
// will keep declare
let level, number, done;
let p1array, p2array;
const message = document.querySelector('.message');
const p1Bull = document.querySelector('.bull--0');
const p1Cow = document.querySelector('.cow--0');
const p2Bull = document.querySelector('.bull--1');
const p2Cow = document.querySelector('.cow--1');
const p1guess = document.querySelector('#guess--0');
const p2guess = document.querySelector('#guess--1');
const displayLevel = document.querySelector('.level');
const displayFeedback = document.querySelector('#feedback');

// one time so will remove later
const reset = document.querySelector('.btn--new');

// initilization
function init() {
  done = false;
  p1array = [0, 0]; // 0 -player1
  p2array = [0, 0];
  level = 4;
  number = generate(level);
  // display level
  displayLevel.textContent = 'easy';
  // hide feedback
  displayFeedback.classList.add('hidden');
  // reset bull and cow and guess
  message.textContent = 'Start guessing...';
  p1Bull.textContent =
    p1Cow.textContent =
    p2Bull.textContent =
    p2Cow.textContent =
      0;
  p1guess.value = p2guess.value = '';
}

// generate number base on level
function generate(level) {
  number = [];
  for (let i = 0; i < level; i++) {
    number.push(Math.round(Math.random() * 9));
  }
  console.log(number);
  return number;
}

init();

// change game level
document.querySelector('.btn--level').addEventListener('click', function () {
  if (level === 4) {
    level = 7;
    generate(level);
    displayLevel.textContent = 'hard';
  } else {
    init();
    displayLevel.textContent = 'easy';
  }
});

// new game
document.querySelector('.btn--new').addEventListener('click', init);

// instruction
// open
document.querySelector('.btn--ins').addEventListener('click', function () {
  document.querySelector('.modal').classList.remove('hidden');
  document.querySelector('.blur').classList.remove('hidden');
});

// close
document.querySelector('.close-modal').addEventListener('click', hideModal);
document.querySelector('.blur').addEventListener('click', hideModal);

function hideModal() {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.blur').classList.add('hidden');
}

// validate input

function validator() {
  if (p1guess.value.length > level || p2guess.value.length > level) {
    message.textContent = '⛔ Overlength';
  } else {
    message.textContent = 'Start guessing...';
  }
}

// check
document.querySelector('.btn--check').addEventListener('click', function () {
  if (!done) {
    const p1 = Array.from(p1guess.value.toString()).map(Number);
    const p2 = Array.from(p2guess.value.toString()).map(Number);
    try {
      p1array = compare(p1, 1);
      p2array = compare(p2, 2);
    } catch (error) {
      console.log(error);
    } finally {
      displayFeedback.classList.remove('hidden');
      p1Bull.textContent = p1array[0];
      p1Cow.textContent = p1array[1];
      p2Bull.textContent = p2array[0];
      p2Cow.textContent = p2array[1];
      p1guess.value = p2guess.value = '';
    }
  }
});

// compare
function compare(arrayName, pos) {
  let arrayTemp = [0, 0];
  for (let i = 0; i < arrayName.length; i++) {
    if (number.indexOf(arrayName[i], i) === i) {
      arrayTemp[0] += 1; // pos 0 stand for bull
      if (arrayTemp[0] === level) {
        // bull = level = win
        done = true;
        message.textContent = `Player ${pos} won!`;
      }
    } else if (
      number.indexOf(arrayName[i], i) !== i &&
      number.indexOf(arrayName[i]) !== -1
    ) {
      arrayTemp[1] += 1; // pos 1 stand for cow
    }
  }
  return arrayTemp;
}
