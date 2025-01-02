// 1. Deposit user funds
// 2. Determine number of lines user itends to bet on
// 3. Collect bet amount
// 5. Check if user won
// 6. Distribute winnings
// 7. Play again

const prompt = require("prompt-sync")(); // Import prompt-sync

const deposit = () => {
  const depositAmount = prompt("Please enter the amount you would like to deposit: "); // Prompt user to enter deposit amount
console.log(`You have deposited $${depositAmount}.`); // Display deposit amount
};

deposit(); 

