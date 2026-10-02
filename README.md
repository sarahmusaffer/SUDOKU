#  Sudoku Game

A web-based Sudoku game built using **HTML, CSS, and JavaScript**.

The project uses **Object-Oriented Programming (OOP)** to organize the game logic, timer system, user interface, and game storage.

##  Features

-  Sudoku puzzle generation using an API
-  Multiple difficulty levels (Easy, Medium, Hard, Expert, Master and Extreme)
-  Three lives/hearts
-  Game timer
-  Pause and resume
-  Undo moves
-  Dark and light mode
-  Save and restore game progress
-  Wrong move indication
-  Number completion tracking
-  Win and game-over screens
-  Play Again option
-  Home button

##  Technologies Used

- HTML5
- CSS3
- JavaScript
- JavaScript Classes (OOP)
- Local Storage
- MTSudoku API

##  Project Structure

```text
Sudoku/
│
├── index.html
├── game.html
│
├── css/
│   ├── style.css
│   └── game.css
│
├── js/
│   ├── script.js
│   ├── game.js
│   ├── SudokuGame.js
│   ├── GameTimer.js
│   ├── GameStorage.js
│   └── SudokuUI.js
│
└── images/
```

##  How to Play
- Choose a difficulty level.
- Select a number from the number buttons.
- Click on an empty Sudoku cell to place the selected number.
- An incorrect move removes one life.
- Use Undo to undo your previous move.
- Use Pause to pause the game.
- Complete the Sudoku puzzle to win.
  
##  Game Features
###  Timer

The game includes a timer that keeps track of the time.
The timer can be paused and resumed.

### Lives

The player starts with three lives.
Each incorrect move removes one life. When all three lives are lost, the game ends.

### Undo

The Undo button removes the most recent move and restores the previous state of the selected cell.

### Save Progress

The game uses localStorage to save the player's progress, including:

- Current board
- Remaining lives
- Move history
- Number frequencies
- Timer
- Selected difficulty

This allows the game to restore the player's progress after refreshing the page.

### Dark Mode

The player can switch between light mode and dark mode during the game.

### Object-Oriented Programming

The JavaScript code is organized into separate classes:

- SudokuGame — handles the Sudoku board, puzzle, solution, moves, lives, and game state.
- GameTimer — handles the game timer.
- GameStorage — handles saving and retrieving game data from localStorage.
- SudokuUI — handles messages and end-game panels.
- game.js — connects the classes together and handles the main game interactions.

### API

Sudoku puzzles are generated using the MTSudoku API that provides both the puzzle and its solution (no key required).

API endpoint:
https://api.mtsudoku.com/v1/generate

### How to Run
- Download or clone the repository.
- Open the project in a local server.
- Open index.html in your browser.
- Choose a difficulty level and start playing.
