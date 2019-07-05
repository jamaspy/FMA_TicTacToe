
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

const placeSymbol=( position, symbol )=> {
    board[position] = symbol.toUpperCase();
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


//Check input for no letters & empty sqaures 
const isInt=( value ) =>  {
    let x;
    if (isNaN( value )) {
        return false;
    }
    x = parseFloat( value );
    return ( x | 0 ) === x;
}

const validateMove = ( position ) => {
    if (isInt( position ) === true && board[position] === ' ') {
        return true;
    }
    return false;
}


// Check to see if last move made 3 in a row
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

const playTurn = ( player ) => {

    console.log(chalk.green(`${player}'s Turn To Play`));
    prompt.start();
    prompt.get(['position'], (error, result) => {

        if (validateMove( result.position) === true ) {
            placeSymbol( result.position, player );
            printBoard();
            if (checkWin( player ) === true) {
                console.log(chalk.black.bgYellow.bold(`**  ${player} Is The Winner!!  **`));
                console.log(chalk.black.bgYellow.bold(`**  node tic.js to play again  **`));
                return;
            }
            if (player === 'X') {
                playTurn( 'O' );
            } else {
                playTurn( 'X' );
            }
        } else {
            console.log(chalk.red('Oh No!That square is taken, please pick another one...'));
            playTurn( player );
        }
    });
}


//Start Game
console.log(chalk.blue(`\nLet's Play! Enter A Number 1-9 To Place Your Symbols...\nGet 3 In A Row - X To Play First...`))

console.log(`
    1 | 2 | 3
    ---------
    4 | 5 | 6
    ---------
    7 | 8 | 9
    `);

playTurn('X');