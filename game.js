const choices = ['rock', 'paper', 'scissors'];
const WIN ="You Win :)";
const LOST ="You Lost :(";
const ROUND = 5;
let score = 0;
let pc_score = 0;

/*
//A confirm dialog saying is about to start the game, wishing for luck
//prompt from user a choices, parse the choice to lowercase
//validate if belongs to the 3 ones, give another input
//Run computer option
//compare rock < paper < scissors 
// rock > scissors
// Maybe grades of difficulty let's say easy and hard
//use conditional probability (i.e. given that..)
//Five rounds of the game
*/

function computerPlay(){
   const randomIndex = Math.floor(Math.random() * choices.length);
   return choices[randomIndex];
}

// Function to handle a single round of the game
function playerRound(playerSelection, computerSelection) {
   

   // Compare player and computer selections to determine the winner
   if (playerSelection.toLowerCase() === computerSelection.toLowerCase()) {
      console.log("It's a tie!");
   } else if (
      (playerSelection.toLowerCase() === 'rock' && computerSelection.toLowerCase() === 'scissors') ||
      (playerSelection.toLowerCase() === 'paper' && computerSelection.toLowerCase() === 'rock') ||
      (playerSelection.toLowerCase() === 'scissors' && computerSelection.toLowerCase() === 'paper')
   ) {
      console.log(WIN);
      score++;
   } else {
      pc_score++;
      console.log(LOST);
   }

   console.log('Computer Selection:', computerSelection); 
   console.log('Player Selection:', playerSelection); 
   alert(`You chose ${playerSelection} while computer chose ${computerSelection} \n 
   your SCORE ${score} -vs-  PC_SCORE ${pc_score}`);
}

function validateInput(){
   let playerSelection = window.prompt("Rock, Paper, or Scissors?");
      
   // Validate user input
   while (!choices.includes(playerSelection.toLowerCase())) {
      playerSelection = window.prompt("Please choose a valid option: Rock, Paper, or Scissors");
   }

   return playerSelection;
}

// Function to start the game
function game() {
   alert("Welcome to Rock, Paper, Scissors! Are you ready to play?");

   // Play five rounds of the game
   for (let i = 0; i < ROUND; i++) {
      //validate input
      let playerSelection = validateInput();
      const computerSelection = computerPlay();

      playerRound(playerSelection, computerSelection);
   }

   // Display final score
   console.log("Your final score:", score);
}

// Start the game
game();