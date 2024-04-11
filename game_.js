const main = {
   CHOICES : ['rock', 'paper', 'scissors'],
   ROUND : 5,
   DIFFICULTY:1,//1 -> easy | 2 -> harder
   STATE:{
      PLAY: "Start now",
      WIN:"You win :)",
      GAME_OVER: "You Lost :("
   },
   PC_STORIES:["Are you lucky today?", "Is this the way you play", "C'mon you can better","You loose even playing alone :D"],
   score : 0,
   pc_score : 0,
   playerSelection: "",
   computerSelection: "",
   set setState(state) {
      this.state = state;
   },
   get final_score_user() {//getter
      return this.score;
   },
   get final_score_computer() {//getter
      return this.pc_score;
   },
   computerPlay() {
      const randomIndex = Math.floor(Math.random() * this.CHOICES.length);
      return this.CHOICES[randomIndex];
   },
   validateInput() {
      let input = prompt("Rock, Paper, or Scissors?");
      
      // Validate user input
      while (input !== null && !this.CHOICES.includes(input.toLowerCase())) {
         input = prompt("Please choose a valid option: Rock, Paper, or Scissors");
      }

      // Handle cancel or unexpected input
      if (input === null) {
         throw new Error("Game cancelled by user.");
      }

      return input.toLowerCase();
   },
   playerRound(playerSelection, computerSelection) {
      // Compare player and computer selections to determine the winner
      if (playerSelection === computerSelection) {
         console.log("It's a tie!");
      } else if (
         (playerSelection === 'rock' && computerSelection === 'scissors') ||
         (playerSelection === 'paper' && computerSelection === 'rock') ||
         (playerSelection === 'scissors' && computerSelection === 'paper')
      ) {
         console.log(this.STATE.WIN);
         this.score++;
      } else {
         this.pc_score++;
         console.log(this.STATE.GAME_OVER);
      }

      console.log('Computer Selection:', computerSelection); 
      console.log('Player Selection:', playerSelection); 
      console.log(`Your SCORE: ${this.score} -vs-  PC_SCORE: ${this.pc_score}`);
   },
   game() {
      alert("Welcome to Rock, Paper, Scissors! Are you ready to play?");

      try {
         // Play five rounds of the game
         for (let i = 0; i < this.ROUND; i++) {
            //validate input
            this.playerSelection = this.validateInput();
            const computerSelection = this.computerPlay();

            this.playerRound(this.playerSelection, computerSelection);
         }

         // Display final score
         console.log("Your final score:", this.score);
         console.log("Computer's final score:", this.pc_score);
         
         // Ask if user wants to play again
         const playAgain = confirm(`Your final score: ${this.score} vs Computer's final score: ${this.pc_score},
          Do you want to try again? `);
         if (playAgain) {
            // Reset scores and start a new game
            this.score = 0;
            this.pc_score = 0;
            this.game();
         }
      } catch (error) {
         console.log(error.message);
      }
   }
};

// Start the game
main.game();
