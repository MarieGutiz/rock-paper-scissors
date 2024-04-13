const main = {
   CHOICES : ['rock', 'paper', 'scissors'],
   ROUND : 5,
   DIFFICULTY: 1, // 1 -> easy | 2 -> harder
   STATE:{
      TIE: "It's a tie",
      WIN:"You win :)",
      LOST: "You Lost :(",
      COURSE:"Porca Miseria"
   },
   PC_STORIES:["Good job!","Are you lucky today?", "C'mon you can better!", "Is this the way you play?","You loose even playing alone :D", "I can't hold myself"],
   score : 0,
   pc_score : 0,
   index:1,
   playerSelection: "",
   computerSelection: "",
   message:"",
   set setState(state) {
      this.state = state;
   },
   get final_score_user() {//getter del
      return this.score;
   },
   get final_score_computer() {//getter
      return this.pc_score;
   },
   randomness(min, max){
      if (min >= max) {
          throw new Error("Minimum value must be less than maximum value.");
      }
  
      const range = max - min + 1;
      let randomValue;
      
      do {
          const randomBytes = new Uint32Array(1);
          window.crypto.getRandomValues(randomBytes);
          randomValue = randomBytes[0] / (0xffffffff + 1);
      } while (randomValue >= 1); // Ensure randomValue is strictly less than 1
      
      return min + Math.floor(randomValue * range);
  },
  computerPlay() {
      // If difficulty is set to harder
      if (this.DIFFICULTY === 2) {
          // Set conditional probabilities based on the player's previous moves
          // Set weights
          const conditionalProbabilities = {
              rock: { rock: 0.2, paper: 0.4, scissors: 0.4 },
              paper: { rock: 0.4, paper: 0.2, scissors: 0.4 },
              scissors: { rock: 0.4, paper: 0.4, scissors: 0.2 }
          };
  
          // Get the conditional probabilities for the current player's move
          const conditionalProbs = conditionalProbabilities[this.playerSelection.toLowerCase()];
  
          // Use the conditional probabilities to determine the computer's move
          const random = this.randomness(0, 1);
          let cumulativeProbability = 0;
          for (const choice of this.CHOICES) {
              cumulativeProbability += conditionalProbs[choice];
              if (random < cumulativeProbability) {
                  return choice;
              }
          }
  
          // If for some reason a choice couldn't be determined, return a random choice
          return this.CHOICES[this.randomness(0, this.CHOICES.length - 1)];
      }
  
      // If difficulty is set to easy or the conditional probabilities don't work out (e.g., all moves were ties)
      // Fall back to a random move
      return this.CHOICES[this.randomness(0, this.CHOICES.length - 1)];
  },  
   validateInput() {
      let input = prompt("Rock, Paper, or Scissors?");
      
      // Validate user input
      while (input !== null && !this.CHOICES.includes(input.toLowerCase()) && input !== undefined) {
         input = prompt("Please choose a valid option: Rock, Paper, or Scissors");
      }

      // Handle cancel or unexpected input
      if (input === null) {
         alert("Game cancel by user");//work
         throw new Error("Game cancelled by user.");
      }

      return input.toLowerCase();
   },
   setDifficultness(){
      // Validate difficultness
      let difficulty = prompt("Enter the difficulty level: 1 for easy, 2 for harder");
      if (difficulty === '1' || difficulty === '2') {
         this.DIFFICULTY = parseInt(difficulty);
      } else {
         alert("Invalid difficulty level. Defaulting to easy.");
         this.setDifficultness();
      }
   },
   playerRound(playerSelection, computerSelection) {
      // Compare player and computer selections to determine the winner
      if (playerSelection === computerSelection) {
         this.message = this.STATE.TIE;
         console.log(this.STATE.TIE);
      } else if (
         (playerSelection === 'rock' && computerSelection === 'scissors') ||
         (playerSelection === 'paper' && computerSelection === 'rock') ||
         (playerSelection === 'scissors' && computerSelection === 'paper')
      ) {
         this.message = this.STATE.WIN;
         console.log(this.STATE.WIN);
         this.score++;
      } else {
         this.message = this.STATE.LOST;
         console.log(this.STATE.LOST);
         this.pc_score++;
         
      }

      console.log('Computer Selection:', computerSelection); 
      console.log('Player Selection:', playerSelection); 
      this.displayScore();
     
   },
   displayScore(){
      // Get the index for the current score from PC_STORIES
      const storyIndex = Math.min(this.pc_score, this.PC_STORIES.length - 1);
      
      const story = this.PC_STORIES[storyIndex];
      let msg = "";

    if (this.index === 5) {
        if (this.pc_score > this.score) {
            msg = "Computer Won";
        } else if (this.pc_score < this.score) {
            msg = `You WON ${this.STATE.COURSE}`;
        } else {
            msg = "It's a Tie!";
        }
    } else {
        msg = `${story}
        ${this.message}`;
    }
      
      alert(`
      ROUND: ${this.index}
      Computer Selection: ${this.computerSelection} -vs- Player Selection: ${this.playerSelection}
      Your SCORE: ${this.score} -vs-  PC_SCORE: ${this.pc_score}
      ${msg}
      `);
   },
   game() {
      alert("Welcome to Rock, Paper, Scissors! Are you ready to play?");
      
      // Ask for difficulty level
      this.setDifficultness();

      try {
         // Play five rounds of the game
         for (let i = 0; i < this.ROUND; i++) {
            //validate input
            this.playerSelection = this.validateInput();
            this.computerSelection = this.computerPlay();

             // Loop until computerSelection is not undefined
             while (this.computerSelection === undefined) {
               this.computerSelection = this.computerPlay();
           }

            this.playerRound(this.playerSelection, this.computerSelection);
            this.index++;
         }

         // Display final score
         console.log("Your final score:", this.score);
         console.log("Computer's final score:", this.pc_score);
     
         
         // Ask if user wants to play again?
         const playAgain = confirm(`Your final score: ${this.score} vs Computer's final score: ${this.pc_score},
              do you want to try again? `);
         if (playAgain) {
            // Reset scores and start a new game
            this.score = 0;
            this.pc_score = 0;
            this.index = 1;
            this.message = "";
            this.game();
         }
      } catch (error) {
         console.log(error.message);
      }
   }
};

// Start the game
main.game();
