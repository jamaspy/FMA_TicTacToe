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

const resetBoard = () => {
    for (let i = 1; i <= 9; i++){
        board[i] = ' ';
    }
    return board;
}

// Input Validation
// Has to be an integer
// 0 is integer but the board starts at 1 
const isInt = ( value ) =>  {
    if (isNaN( value )) {
        return false;
    }
    let num = Number( value );
    return ( num || 0 ) === num;
}

// Valid input is integer 1-9, placed in an empty sqaure on the board
const validateMove = ( square ) => {
    if (isInt( square ) && board[square] === ' ' && (square >= 1 && square <= 9)) {
        console.log("\nNice Move!");
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

const playTurn = ( player ) => {
    console.log(chalk.green(`${player}'s Turn To Play`));
    prompt.start();
    prompt.get(['square'], (error, result) => {

        if (validateMove( result.square )) {
            placeSymbol( result.square, player );
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