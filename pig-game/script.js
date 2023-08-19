'use strict';
const p1 = document.querySelector('.player--0');
const p2 = document.querySelector('.player--1');
const p1Score = document.querySelector('#score--0');
const p2Score = document.querySelector('#score--1');
const p1Current = document.querySelector('#current--0');
const p2Current = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score, activePlayer, currentScore, done;

// initialization
function init() {
  score = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  done = false;
  p1Score.textContent = p2Score.textContent = 0;
  p1Current.textContent = p2Current.textContent = 0;
  // clear winner class
  p1.classList.remove('player--winner');
  p2.classList.remove('player--winner');
  // clear active and set player 1 to active
  p2.classList.remove('player--active');
  p1.classList.add('player--active');
  // clear name and scores
  document.querySelector(`#name--0`).textContent = 'PLAYER 1';
  document.querySelector('#name--1').textContent = 'PLAYER 2';
}

// start page
init();

// switch player
function switchPlayer() {
  if (p1.classList.contains('player--active') && activePlayer == 0) {
    activePlayer = 1;
    p1.classList.remove('player--active');
    p2.classList.add('player--active');
  } else {
    activePlayer = 0;
    p2.classList.remove('player--active');
    p1.classList.add('player--active');
  }
}

// roll dice
btnRoll.addEventListener('click', function () {
  if (!done) {
    let displayCurrentScore = document.getElementById(
      `current--${activePlayer}`
    );
    // roll the dice
    const number = Math.trunc(Math.random() * 6) + 1;
    dice.setAttribute('src', `dice-${number}.png`);
    // current score display
    if (number !== 1) {
      currentScore += number;
      displayCurrentScore.textContent = currentScore;
    } else {
      displayCurrentScore.textContent = currentScore = 0;
      switchPlayer();
    }
  }
});

// hold
btnHold.addEventListener('click', function () {
  if (!done) {
    score[activePlayer] += currentScore;
    let displayCurrentScore = document.getElementById(
      `current--${activePlayer}`
    );
    let displayScore = document.getElementById(`score--${activePlayer}`);

    // check winner
    if (score[activePlayer] >= 100) {
      // display score
      displayScore.textContent = score[activePlayer];
      // inform winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`#name--${activePlayer}`).textContent =
        '🎊 YOU WON!';
      // endgame
      done = true;
    } else {
      // save score
      displayScore.textContent = score[activePlayer];
      // then display and clear the current score
      displayCurrentScore.textContent = currentScore = 0;
      // plus switch player
      switchPlayer();
    }
  }
});

// reset
document.querySelector('.btn--new').addEventListener('click', init);
