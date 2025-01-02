// 1. Deposit user funds
// 2. Determine number of lines user itends to bet on
// 3. Collect bet amount
// 5. Check if user won
// 6. Distribute winnings
// 7. Play again

const prompt = require("prompt-sync")(); // Import prompt-sync

const ROWS = 3; // Number of rows in slot machine
const COLS = 3; // Number of columns in slot machine
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

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

const spin = () => {
    const symbols = [];
    
    
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) { 
        for (let i = 0; i < count; i++) { // Loop through the count of each symbol
            symbols.push(symbol); // Add symbol to symbols array
        }
    }

    /*
    [A,B,C]
    0, 1, 2 (index)

    want to randomly select a symbol from the index remove it from existing array and insert it into the reels array

    the final result will show something like this: 
    [ [ 'C', 'D', 'C' ], [ 'C', 'C', 'B' ], [ 'D', 'B', 'B' ] ]
      which then visually looks like this: (done in transpose function)
        C C D
        D C B
        C B B
    */

    const reels = [[], [], []]; // Each nested array represents a column in the slot machine (a reel)
    for (let i = 0; i <COLS; i++) {
        const reelSymbols = [...symbols]; // Copy symbols array
        for (let j = 0; j<ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); // Generate random index. Using math.floor to round down to nearest whole number. Can't round up because the index would be out of bounds
            const selectedSymbol = reelSymbols[randomIndex]; // Select symbol at random index
            reels[i].push(selectedSymbol); // Add selected symbol to reels array
            reelSymbols.splice(randomIndex, 1); // Remove selected symbol from reelSymbols array
        }
    }
    return reels;
}


/*
The transpose function will take the reels array and transpose it so that the rows become columns and the columns become rows.
here is an example:
[ [ 'C', 'D', 'C' ], [ 'C', 'C', 'B' ], [ 'D', 'B', 'B' ] ]
  which then visually looks like this:
    C C D
    D C B
    C B B
*/
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j=0;j<COLS;j++) {
            rows[i].push(reels[j][i]); // Transpose the reels array
        }
    }    
    return rows;
};

// Function to print rows
const printRows = (rows) => {
    for (const row of rows) {
        let rowString = ""; // Initialize rowString
        for (const [i, symbol] of row.entries()) { // Loop through each symbol in row
            rowString += symbol; // Add symbol to rowString
            if (i != row.length - 1) { // Check if symbol is not the last symbol in row
                rowString += " | "; // Add separator
            }
        }
    console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0; // Initialize winnings
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row]; // Get symbols in row
        let allSame = true;
        for (const symbol of symbols) {
            if (symbol != symbols[0]) { // Check if symbol is not equal to first symbol in row
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += SYMBOL_VALUES[symbols[0]] * bet; // Add winnings to total winnings
        }
    }

    return winnings;
}

const game = () => { // Main game function
    let balance = deposit(); 

    while (true) {

        console.log("Your balance is $", balance); // Display balance
        const numberOfLines = getNumberofLines(); 
        const bet = getBet(balance, numberOfLines); // Get bet amount
        balance -= bet * numberOfLines; // Deduct bet amount from balance
        const reels = spin(); // Spin the slot machine
        const rows = transpose(reels); // Transpose the reels
        printRows(rows) 
        const winnings = getWinnings(rows, bet, numberOfLines); // Get winnings
        balance += winnings; // Add winnings to balance
        console.log("You have won $", winnings); // Display winnings

        if (balance == 0) {
            console.log("You have no more funds to play with."); // Display message
            break;
        } 

        const playAgain = prompt("Would you like to play again? (yes/no): "); // Prompt user to play again
        if (playAgain.toLowerCase() != "yes") { // Check if user does not want to play again
            break;
        } 

    }
}

game(); // Start game