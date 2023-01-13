// identifying selectores
const player1 = document.querySelector(".Player-1");
const player2 = document.querySelector(".Player-2");
const totalScore1 = document.querySelector("#score_1");
const totalScore2 = document.querySelector("#score_2");
const current1 = document.querySelector("#current-1");
const current2 = document.querySelector("#current-2");
const dice = document.querySelector(".dice");
const player_1_rolled_1 = document.querySelector(".player-1-rolled-1");
const player_2_rolled_1 = document.querySelector(".player-2-rolled-1");
const rollBtn = document.querySelector(".btn-roll-dice");
const newGameBtn = document.querySelector(".btn-new-game");
const holdBtn = document.querySelector(".btn-hold");
const goal_limit = document.getElementById("goal_limit");

// stat with adding 0 as string to total score
totalScore1.textContent = 0;
totalScore2.textContent = 0;
// let's the dice hidden before the game start
dice.classList.add("Hidden");
player_1_rolled_1.classList.add("Hidden");
player_2_rolled_1.classList.add("Hidden");
// this will change when the game start
let currentScore = 0;
const TotalScores = [0, 0];
let ActivePlayer = 1;
let playing = true;
// starting the functions
// toggle function to hide and show message
function roll_1_Message(playerNum) {
  if (playerNum === 1) {
    player_1_rolled_1.classList.toggle("Hidden");
  } else if (playerNum === 2) {
    player_2_rolled_1.classList.toggle("Hidden");
  }
}
// switching roles between players
const SwitchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current-${ActivePlayer}`).textContent = currentScore;
  ActivePlayer = ActivePlayer == 1 ? 2 : 1;
  player1.classList.toggle(`active-1`);
  player2.classList.toggle(`active-2`);
};

// add event when clicking on the roll btn
rollBtn.onclick = () => {
  goal_limit.classList.add("Hidden");
  // if the message was shown after a role.
  if (!player_1_rolled_1.classList.contains("Hidden")) {
    player_1_rolled_1.classList.toggle("Hidden");
  } else if (!player_2_rolled_1.classList.contains("Hidden")) {
    player_2_rolled_1.classList.toggle("Hidden");
  }
  //roll dice
  if (playing) {
    dice.classList.remove("Hidden");
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    console.log(diceNumber);
    dice.src = `images/Dice-${diceNumber}.png`;
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current-${ActivePlayer}`).textContent =
        currentScore;
    } else {
      roll_1_Message(ActivePlayer);
      SwitchPlayer();
    }
  }
};

let Active = 0;
let goal = 30; //this is the goal if the player get it then he/she win.
window.onkeyup = keyup;
function keyup(e) {
  //setting input text for every key press so i can get the value of the input to set the goal test
  if (e.target.value == null) {
    //do nothing
  } else {
    goal = e.target.value;
  }
  console.log(goal);
}

holdBtn.onclick = () => {
  if (playing) {
    TotalScores[ActivePlayer - 1] += currentScore;
    document.getElementById(`score_${ActivePlayer}`).textContent =
      TotalScores[ActivePlayer - 1];
    if (TotalScores[ActivePlayer - 1] >= goal) {
      playing = false;
      dice.classList.add("Hidden");
      document.getElementById(`score_${ActivePlayer}`).textContent = "Win!";
      SwitchPlayer();
      document.getElementById(`score_${ActivePlayer}`).textContent = "Lost!";
      Active = ActivePlayer == 2 ? 1 : 2;
      document
        .querySelector(`.Player-${Active}`)
        .classList.add(`active-${Active}`);
    } else {
      SwitchPlayer();
    }
  }
};
newGameBtn.onclick = () => {
  playing = true;
  // document.querySelector(`Player-${ActivePlayer}`).classList.remove()
  ActivePlayer = 1;
  player1.classList.add("active-1");
  player2.classList.remove("active-2");
  TotalScores[0] = 0;
  TotalScores[1] = 0;
  document.getElementById("score_1").textContent = 0;
  document.getElementById("score_2").textContent = 0;
  goal_limit.classList.remove("Hidden");
};
