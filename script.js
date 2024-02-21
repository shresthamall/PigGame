'use strict';

// HTML classes to be modified for the game
const player = document.querySelectorAll('.player');
// player classes
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
// players
const players = [player0, player1];
// buttons relevant for gameplay
const btnNew = document.querySelector('.btn--new');
const bntRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
// dice image class
const dice = document.querySelector('.dice');
// score elements
const score0Elm = document.getElementById('score--0');
const score1Elm = document.getElementById('score--1');
const currScore0Elm = document.getElementById('current--0');
const currScore1Elm = document.getElementById('current--1');
// score variables
const score = [0, 0];
let currScore = 0;
let currScore1 = 0;

// active player
let activePlayer = 0;

// starting conditions
resetScores();
dice.classList.add('hidden');

// function declarations

document.getElementById('name--0').textContent = prompt('Player 1 name:');
document.getElementById('name--1').textContent = prompt('Player 2 name:');

// generate random dice roll and call displayDiceRoll() to change dice img in-game
const rollDice = function () {
  let roll = Math.trunc(Math.random() * 6) + 1;
  displayDiceRoll(roll);
  return roll;
};
console.log(rollDice());

// reset scores
function resetScores() {
  score0Elm.textContent = 0;
  score1Elm.textContent = 0;
}

// switch players and reset current scores (variable and in-game)
function switchPlayer() {
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  if (activePlayer === 0) {
    activePlayer = 1;
    currScore0Elm.textContent = 0;
  } else {
    activePlayer = 0;
    currScore1Elm.textContent = 0;
  }
  currScore = 0;
}

// display dice roll
function displayDiceRoll(roll) {
  if (dice.classList.contains('hidden')) {
    dice.classList.remove('hidden');
  }
  dice.src = `dice-${roll}.png`;
}

// display current score for active player
function displayCurrScore() {
  activePlayer > 0
    ? (currScore1Elm.textContent = currScore)
    : (currScore0Elm.textContent = currScore);
}

// display score for active player
function displayScore() {
  document.getElementById(`score--${activePlayer}`).textContent =
    Number(document.getElementById(`score--${activePlayer}`).textContent) +
    currScore;
}

function activateButtons() {
  btnHold.disabled = false;
  bntRoll.disabled = false;
}

function deactivateButtons() {
  btnHold.disabled = true;
  bntRoll.disabled = true;
}

// eventListeners for the buttons

// new game - reset to initial game conditions
btnNew.addEventListener('click', function () {
  activateButtons();
  score[0] = 0;
  score[1] = 0;
  currScore = 0;
  displayCurrScore();
  resetScores();
  players[activePlayer].classList.remove('player--winner');
  if (!player0.classList.contains('player--active')) {
    player0.classList.add('player--active');
  }
  if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
  }
});

// roll dice for current player -- switch players if the roll is equal to 1
bntRoll.addEventListener('click', function () {
  let roll = rollDice();
  // rolls that increment current score
  if (roll !== 1) {
    currScore += roll;
    displayCurrScore();
  } else {
    switchPlayer();
  }
});

// hold game - add current score to score (variable and in-game) and switch between active players
btnHold.addEventListener('click', function () {
  score[activePlayer] += currScore;
  displayScore();
  if (score[activePlayer] > 100) {
    players[activePlayer].classList.add('player--winner');
    player[activePlayer].classList.remove('active--player');
    deactivateButtons();
  } else {
    switchPlayer();
  }
});
