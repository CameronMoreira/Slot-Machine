// 1. Deposit user funds
// 2. Determine number of lines user itends to bet on
// 3. Collect bet amount
// 5. Check if user won
// 6. Distribute winnings
// 7. Play again

const prompt = require("prompt-sync")(); // Import prompt-sync

// Function to deposit funds
const deposit = () => {
    while (true) {
        const depositAmount = prompt("Please enter the amount you would like to deposit: "); // Prompt user to enter deposit amount
        console.log(`You have deposited $${depositAmount}.`); // Display deposit amount
        const numberDepositAmount = parseFloat(depositAmount); // Convert deposit amount to number

        // Check if deposit amount is not a number or less than 0
        if (isNaN(numberDepositAmount) || numberDepositAmount < 0) { 
        console.log("Invalid deposit amount. Please enter a valid amount."); // Display error message
        } else {
            return numberDepositAmount;
        }

    };
};

// Function to determine number of lines user intends to bet on
const getNumberofLines = () => {
    while (true) {
        const lines = prompt("Enter number of lines to bet on (1-3): "); // Prompt user to enter number of lines to bet on
        console.log(`You have chosen to bet on ${lines} lines.`); // Display number of lines chosen
        const numberOfLines = parseFloat(lines); // Convert number of lines to number

        // Check if number of lines ia valid number (1-3)
        if (isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3) { 
        console.log("Invalid number of lines, try again"); // Display error message
        } else {
            return numberOfLines;
        }

    };
}

// Function to collect bet amount
const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the total bet per line: "); // Prompt user to enter bet amount
        
        const numberBet = parseFloat(bet); // Convert bet amount to number

        // Check if bet amount is not a number or less than 0
        if (isNaN(numberBet) || numberBet <=0 || numberBet > balance / lines) { 
        console.log("Invalid bet, try again"); // Display error message
        } else {
            return numberBet;
        }

    };
}

let balance = deposit();
const numberOfLines = getNumberofLines(); 
const bet = getBet(balance, numberOfLines);


