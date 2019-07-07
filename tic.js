const prompt = require( 'prompt' );
const chalk = require( 'chalk' );


let board = {};

const resetBoard = () => {
    for (let i = 1; i <= 9; i++){
        board[i] = ' ';
    };
};

resetBoard();

const winningCombinations = [
    // Horizontal
    [1, 2, 3], 
    [4, 5, 6], 
    [7, 8, 9],
    // Vertical 
    [1, 4, 7],
    [2, 5, 8], 
    [3, 6, 9],
    // Diagonal 
    [1, 5, 9], 
    [3, 5, 7]
];

const placeSymbol = ( square, symbol )=> {
    board[square] = symbol;
}

const printBoard = () => {
    console.log(`
       ${board[1]} | ${board[2]} | ${board[3]}
       ---------
       ${board[4]} | ${board[5]} | ${board[6]}
       ---------
       ${board[7]} | ${board[8]} | ${board[9]}
    `)
}

// Input Validation
// Input is integer 1-9 && that the board value is an empty string
const validateMove = square  => 
    board[square] === ' ' && /[1-9]/.test(square); 

// Check to see if last move matched 3 integers in a winningCombination array
const checkWin = ( player ) => {
    for (let i = 0; i < winningCombinations.length; i++) {
        let symbolCount = 0;
        for (let j = 0; j < winningCombinations[i].length; j++) {
            if ( board[winningCombinations[i][j]] === player ) {
                symbolCount++;
            }
            if ( symbolCount === 3 )  {
                return true;
            }
        }
    }
    return false;
}

// Iterate over the board object to check for empty string values ("Empty Squares")
// If there are empty sqaures it can not be a draw
const checkDrawn = () => {
    const values = Object.values(board);
    for (let i = 0; i < values.length; i++){
        if (values[i] === " "){
            return false;
        }
    }
    return true;
}

// Clears the board object, prints the empty board, starts game play with Player X
// Or returns to quit program
const playAgain = () => {
    console.log("Would you like to play again? Enter Y or N")
    prompt.start();
    prompt.get(['playAgain'], (error, result) => {
        if (result.playAgain.toUpperCase() === 'Y'){
            resetBoard();
            console.log(chalk.green.bold(`\nExcellent, lets play again`))
            printBoard();
            playTurn( 'X' )
        }
        if(result.playAgain.toUpperCase() === 'N'){
            console.log(chalk.yellow.bold(`\nGoodbye Humans\n`))
            return
        }
    });
}
// Main game play function that uses the individual checking functions. 
// If neither a win or draw are found, the function loops switching between players each time
const playTurn = ( player ) => {
    console.log(chalk.green(`${player}'s Turn To Play`));
    prompt.start();
    prompt.get(['square'], (error, result) => {

        if (validateMove( result.square )) {
            placeSymbol( result.square, player );
            console.log("\nNice Move!");
            printBoard();
            
            if (checkWin( player )) {
                console.log(chalk.black.bgYellow.bold(`**  ${player} Is The Winner!!  **\n`));
                playAgain();
                return;
            }

            if(checkDrawn()){
                console.log(chalk.black.bgRed.bold(`**  Thats a Draw! Great Game!  **\n`));
                playAgain();
                return;
            }

            if ( player === 'X' ) {
                playTurn( 'O' );
            } else {
                playTurn( 'X' );
            }
        } else {
            console.log(chalk.red.bold(`OOPS! Invalid Input, please enter a number 1-9 for an empty square on the board\n`));
            playTurn( player );
        }
    });
}

//Start Game
console.log(chalk.blue.bold(`\nWelcome To Future Makes Academy TicTacToe!`)) 
console.log(chalk.blue(`\nBelow Is A Diagram Of Your Board \nEnter A Number 1-9 To Place Your Symbols In The Corresponding Square.\nThe Aim Is To Get 3 In A Row - Vertically, Horizontally OR Diagonally \n\nX Always To Play First...`))

console.log(`
    1 | 2 | 3
    ---------
    4 | 5 | 6
    ---------
    7 | 8 | 9
    `);

playTurn( 'X' );