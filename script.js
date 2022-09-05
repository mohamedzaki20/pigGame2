"use strict";
// catch elements
// generate a random number for dice rolls
// if diceRoll === 1 then: switch player, the current score = 0 if the player did not hold it before rolling 1
// else: add the diceRoll th the currentScore to current player display the current score

// BUTTONS

const newGame = document.querySelector(".btn--new");
const roll = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");

// PLAYERS SECTION TO CHANGE BACKROUND ACCORDING TO ACTIVE PLAYER
const sectionPlayer_1 = document.querySelector(".player--0");
const sectionPlayer_2 = document.querySelector(".player--1");

// DICE IMAGE
const dice = document.querySelector(".dice");

// PLAYERS DATA {scores}
const currentScore_1 = document.querySelector("#current--0");
const currentScore_2 = document.querySelector("#current--1");
const score_1 = document.querySelector("#score--0");
const score_2 = document.querySelector("#score--1");

// VARS
let currentScoreSum_1 = 0;
let scoreSum_1 = 0;
let currentScoreSum_2 = 0;
let scoreSum_2 = 0;
let activePlayer = true;
let diceNumber = Math.trunc(Math.random() * 6 + 1);
// FUNCTION

// Swapping active class function

const classSwapper = function () {
  if (activePlayer) {
    sectionPlayer_1.classList.remove("player--active");
    sectionPlayer_2.classList.add("player--active");
  } else {
    sectionPlayer_1.classList.add("player--active");
    sectionPlayer_2.classList.remove("player--active");
  }
};

// Reset function
const reset = function () {
  currentScoreSum_1 = 0;
  scoreSum_1 = 0;
  currentScoreSum_2 = 0;
  scoreSum_2 = 0;
  activePlayer = true;
  currentScore_1.textContent = 0;
  currentScore_2.textContent = 0;
  score_1.textContent = 0;
  score_2.textContent = 0;
  sectionPlayer_1.classList.add("player--active");
  sectionPlayer_2.classList.remove("player--active");
};

// Hold score function
const holdScore = function () {
  if (activePlayer) {
    scoreSum_1 += currentScoreSum_1;
    score_1.textContent = scoreSum_1;
    currentScoreSum_1 = 0;
    classSwapper();
    activePlayer = false;
  } else {
    scoreSum_2 += currentScoreSum_2;
    score_2.textContent = scoreSum_2;
    currentScoreSum_2 = 0;
    classSwapper();
    activePlayer = true;
  }
};

// rollDice function (random number up tp 6)
const rollDice = function () {
  // CHECKING THE WINNER PLAYER
  if (scoreSum_1 >= 100) {
    alert(`Player 1 is the winner`);
    reset();
  } else if (scoreSum_2 >= 100) {
    alert(`Player 2 is the winner`);
    reset();
  }

  if (activePlayer) {
    dice.setAttribute("src", `dice-${diceNumber}.png`);
    if (diceNumber > 1) {
      currentScoreSum_1 += diceNumber;
      currentScore_1.textContent = currentScoreSum_1;
      hold.addEventListener("click", holdScore);
    } else {
      classSwapper();
      currentScoreSum_1 = 0;
      currentScore_1.textContent = currentScoreSum_1;
      activePlayer = false;
    }
  } else {
    dice.setAttribute("src", `dice-${diceNumber}.png`);
    if (diceNumber > 1) {
      currentScoreSum_2 += diceNumber;
      currentScore_2.textContent = currentScoreSum_2;
      hold.addEventListener("click", holdScore);
    } else {
      classSwapper();
      currentScoreSum_2 = 0;
      currentScore_2.textContent = currentScoreSum_2;
      activePlayer = true;
    }
  }
  diceNumber = Math.trunc(Math.random() * 6 + 1);
};

roll.addEventListener("click", rollDice);
newGame.addEventListener("click", reset);
