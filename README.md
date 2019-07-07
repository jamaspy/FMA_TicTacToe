# Command Line Tic Tac Toe

## Assumptions
In order to play this game you will need:
* [Basic Git Knowledge](https://guides.github.com/activities/hello-world/)
* [Basic Command Line Knowledge](https://www.learnenough.com/command-line-tutorial/basics)
* [nodeJS installed](https://nodejs.org/en/download/)

If you do not feel comfortable with any of the above, click on the links to learn more about them.

## How To Play
Once you are up to speed with the assumptions
1) Open your preferred command line application 
    * For mac I recommend [iTerm](https://www.iterm2.com/downloads.html)
    * For Windows, click `Start` and type `cmd`. Open the `Command Prompt`
    
2) Navigate to the directory where you would like to clone the game too. E.g `cd username/cool_games`

3) Type `git clone https://github.com/jamaspy/FMA_TicTacToe` and hit `enter`

4) Navigate into the new directory by typing `cd FMA_TicTacToe` and hitting `enter`

5) Nearly there, now to set up the dependencies type `npm install` and hit `enter`

6) To play the game type `npm run game`, press `enter` and you are playing

7) Use the numbers keys `1-9` to place symbols on the corresponding square on the grid


## Rules Of The Game

* The game is played on a 3 x 3 grid

* Ideally you need two players, but you can totally play on your own!

* Players take it in turns, with Player 1 always being `X`

* Players place their symbols onto the grid using the numbers keys, aiming to make 3 in a row

* 3 in a row can be made vertically, horizontally or diagonally

* The game ends when one player gets 3 in a row OR all 9 squares are filled and a draw is called

### This is the grid (use the number keys to place the X's & O's)
```
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
```
### Vertical Win
```
X | O |  
---------
X | O |  
---------
X |   |  
```
### Horizontal Win
```
X |   |  
---------
O | O | O  
---------
X |   |  
```
### Diagonal Win
```
X |   |  
---------
O | X | O  
---------
  |   | X 
```

## How It Works

* The board is simulated by an object with numerical keys (1-9) and empty string values (empty squares). There are 8 possible 'winning combinations' in a 3 x 3 game of tic tac toe. The combinations are stored as arrays in an array.

* I have focused on my functions having single responsibilities and naming my variables as descriptively as possible to make the code as readable and maintainable as possible. When the game starts, the individual functions are called in the main `playTurn()`. 

* An a package called [`prompt`](https://www.npmjs.com/package/prompt) handles the user input in order to place the symbols on the grid. When a player enters a number, `checkWin()` iterates over the `board` object and `winningCombination` arrays incrementing the `symbolCount` when it finds a match. When the `symbolCount` hits 3, a winner is declared.

* A separate function, `checkDraw()`, iterates over the `board` object values to check for an empty string `" "`. If there are any empty string values it cannot be a draw.

* The colours in the console is handled by a package called [`chalk`](https://www.npmjs.com/package/chalk).

## Retro

If I were to add further functionality to the app, I would integrate a score counter. The counter would increment each time a X's or 0's won a game. This could be further built out by asking the user how many games they would like to play before `playTurn()`. By way of refactoring the code I would consider using a ForEach loop in my checking functions.

