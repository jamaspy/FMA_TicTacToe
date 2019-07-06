
const prompt = require( 'prompt' );
const chalk = require( 'chalk' );

let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

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

//Move Validation
//Input has to be an integer
// 0 is integer but the board starts at 1 
const isInt = ( value ) =>  {
    if (isNaN( value )) {
        return false;
    }
    let num = Number( value );
    return ( num || 0 ) === num;
}

//Valid input is number 1-9, placed in an empty sqaure on the board
const validateMove = ( square ) => {
    if (isInt( square ) && board[square] === ' ' && (square >= 1 && square <= 9)) {
        console.log("\nNice Move!")
        return true;
    }
    return false;
}

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
    const values = Object.values(board)
    for (let i = 0; i < values.length; i++){
        if (values[i] === " "){
            return false
        }
    }
    return true
}

const playTurn = ( player ) => {
    console.log(chalk.green(`${player}'s Turn To Play`));
    prompt.start();
    prompt.get(['square'], (error, result) => {

        if (validateMove( result.square )) {
            placeSymbol( result.square, player );
            printBoard();
            
            if (checkWin( player )) {
                console.log(chalk.black.bgYellow.bold(`**  ${player} Is The Winner!!  **`));
                console.log(chalk.black.bgYellow.bold(`**  node tic.js to play again  **`));
                return;
            }

            if(checkDrawn()){
                console.log(chalk.black.bgRed.bold(`**  Thats a Draw! Great Game!  **`));
                console.log(chalk.black.bgRed.bold(`**  node tic.js to play again  **`));
                return;
            }

            if ( player === 'X' ) {
                playTurn( 'O' );
            } else {
                playTurn( 'X' );
            }
        } else {
            console.log(chalk.red.bold(`OOPS! Invalid Input, please enter a number 1-9 for an empty square on the board`));
            playTurn( player );
        }
    });
}

//Start Game
console.log(chalk.blue.bold(`\nWelcome To Future Makes Academy TicTacToe!`)) 
console.log(chalk.blue(`\nBelow Is A Diagram Of Your Board \nEnter A Number 1-9 To Place Your Symbols In The Corresponding Square...\nThe Aim Is To Get 3 In A Row - Vertically, Horizontally OR Diagonally \n\nX Always To Play First...`))

console.log(`
    1 | 2 | 3
    ---------
    4 | 5 | 6
    ---------
    7 | 8 | 9
    `);

playTurn('X');