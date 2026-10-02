import GameTimer from "./GameTimer.js";
import SudokuGame from "./SudokuGame.js";
import SudokuUI from "./SudokuUI.js";
import GameStorage from "./GameStorage.js";

const gameTimer = new GameTimer();
const sudokuGame = new SudokuGame();
const sudokuUI = new SudokuUI();
const gameStorage = new GameStorage();
const pauseIcon = document.getElementById("pauseIcon");
const homeIcon = document.getElementById("homeIcon");
const resetBtn = document.getElementById("resetBtn");
const timerIcon = document.querySelector("#timerIcon");
const levelIcon = document.querySelector("#levelIcon");
const savedTheme = localStorage.getItem("theme");
const difLbl = document.getElementById("difficultyLabel");
const savedDifficulty = localStorage.getItem("difficulty");
const timerText = document.getElementById("timerLabel");
const pausePanel = document.getElementById("pausePanel");
const gridOverlay = document.getElementById("gridOverlay");
const resumeButton = document.getElementById("resumeBtn");
const pauseOverlay = document.getElementById("pauseOverlay");
const numberBtn = document.querySelectorAll(".numberBtn");
const pauseTimer = document.getElementById("pauseTimer");
const pauseDif = document.getElementById("pauseDifficulty");
const sudokuBoard = document.getElementById("sudokuBoard");
const lives = document.querySelectorAll(".heart");
const themeIcon = document.getElementById("themeIcon");
const undoBtn = document.getElementById("undoBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const homeBtn = document.getElementById("homeBtn");
const savedTimer = localStorage.getItem("timer");

difLbl.textContent = savedDifficulty;

let isDark;
let isPaused = false;

if (savedTimer) {
    let parts = savedTimer.split(":");
    let hours = parseInt(parts[0]);
    let minutes = parseInt(parts[1]);
    let remainingSeconds = parseInt(parts[2]);
    gameTimer.seconds = hours * 3600 + minutes * 60 + remainingSeconds;
    timerText.textContent = savedTimer;
}
else {
    timerText.textContent = "00:00:00";
}

gameTimer.start();
setInterval(function () {
    if (!isPaused) {
        let seconds = gameTimer.getSeconds();
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let remainingSeconds = seconds % 60;

        timerText.textContent = hours.toString().padStart(2, "0") + ":" +
            minutes.toString().padStart(2, "0") + ":" +
            remainingSeconds.toString().padStart(2, "0");
        localStorage.setItem("timer", timerText.textContent);
    }
}, 1000);

function saveGame() {
    gameStorage.saveGame(sudokuGame, timerText);
}

function restoreGame() {
    const savedBoard = gameStorage.getGameBoard();
    const savedHearts = gameStorage.getHearts();
    const savedMoves = gameStorage.getMoveHistory();
    const savedFreq = gameStorage.getFreq();

    if (!savedBoard) {
        return;
    }
    sudokuGame.board = JSON.parse(savedBoard);
    console.log("SAVED BOARD FOUND:", savedBoard);
    if (savedHearts !== null) {
        sudokuGame.hearts = Number(savedHearts);
    }
    if (savedMoves) {
        sudokuGame.moveHistory = JSON.parse(savedMoves);
    }

    if (savedFreq) {
        sudokuGame.freq = JSON.parse(savedFreq);
    }

    const cells = document.querySelectorAll(".sudokuCell");
    sudokuGame.freq = {};
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const index = row * 9 + col;
            const value = sudokuGame.board[row][col];
            cells[index].textContent = value === 0 ? "" : value;
            if (value !== 0) {
                sudokuGame.freq[value] = (sudokuGame.freq[value] || 0) + 1;
            }
        }
    }

    for (let i = 0; i < lives.length; i++) {
        if (i < sudokuGame.hearts) {
            lives[i].style.visibility = "visible";
        }

        else lives[i].style.visibility = "hidden";
    }

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {

            const index = row * 9 + col;
            const value = sudokuGame.board[row][col];

            cells[index].classList.remove("wrong");

            if (
                value !== 0 &&
                value !== sudokuGame.solutionBoard[row][col] &&
                Number(sudokuGame.puzzle[index]) === 0
            ) {
                cells[index].classList.add("wrong");
            }
        }
    }

    numberBtn.forEach(function (button) {
        const number = Number(button.textContent);
        if ((sudokuGame.freq[number] || 0) >= 9) {
            button.disabled = true;
        }
        else button.disabled = false;
    });
    console.log("BOARD RESTORED:", sudokuGame.board);
}

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    themeIcon.src = "sun.png";
    homeIcon.src = "whiteHome.png";
    timerIcon.src = "whiteTimer.png";
    levelIcon.src = "whiteLevel.png";
    pauseIcon.src = "whitePause.png";
}

for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
        const sudokuCell = document.createElement("button");
        sudokuCell.classList.add("sudokuCell");
        sudokuCell.dataset.row = row;
        sudokuCell.dataset.col = col;
        sudokuCell.addEventListener("click", function () {
            if (sudokuGame.gameOver || sudokuGame.gameWon) {
                return;
            }
            const cellRow = Number(sudokuCell.dataset.row);
            const cellCol = Number(sudokuCell.dataset.col);
            if (sudokuGame.board[cellRow][cellCol] !== 0) {
                return;
            }
            if (sudokuGame.selectedNumber === null) {
                sudokuUI.showMessage("Select a number first");
            }
            else if (sudokuGame.selectedNumber === sudokuGame.solutionBoard[cellRow][cellCol]) {
                if ((sudokuGame.freq[sudokuGame.selectedNumber] || 0) < 9) {
                    sudokuGame.moveHistory.push({
                        row: cellRow, col: cellCol,
                        oldValue: sudokuGame.board[cellRow][cellCol], newValue: sudokuGame.selectedNumber, isWrong: false
                    });
                    sudokuGame.freq[sudokuGame.selectedNumber] = (sudokuGame.freq[sudokuGame.selectedNumber] || 0) + 1;
                    sudokuCell.classList.remove("wrong");
                    sudokuCell.textContent = sudokuGame.selectedNumber;
                    sudokuGame.board[cellRow][cellCol] = sudokuGame.selectedNumber;
                    if (sudokuGame.freq[sudokuGame.selectedNumber] === 9) {
                        sudokuUI.showMessage("This number is completed!");
                        numberBtn.forEach(function (button) {
                            if (Number(button.textContent) === sudokuGame.selectedNumber) {
                                button.disabled = true;
                                button.classList.remove("selected");
                                button.classList.remove("hover");
                            }
                        })
                    }

                    saveGame();
                    if (sudokuGame.checkWin()) {
                        sudokuGame.gameWon = true;
                        gameTimer.stop();
                        localStorage.removeItem("gameBoard");
                        localStorage.removeItem("hearts");
                        localStorage.removeItem("moveHistory");
                        sudokuUI.messageBox.style.display = "none";
                        sudokuUI.showEndPanel("Congratulations!", "You solved the game");
                    }

                }
            }
            else {
                if (sudokuGame.hearts > 0) {
                    sudokuGame.moveHistory.push({
                        row: cellRow, col: cellCol,
                        oldValue: sudokuGame.board[cellRow][cellCol], newValue: sudokuGame.selectedNumber, isWrong: true
                    });
                    sudokuGame.hearts--;
                    /*lives.forEach (function(heart,index){
                        if (index === hearts)
                        heart.style.visibility ="hidden";*/
                    lives[sudokuGame.hearts].style.visibility = "hidden";
                    sudokuCell.classList.add("wrong");
                    sudokuCell.textContent = sudokuGame.selectedNumber;
                    sudokuGame.board[cellRow][cellCol] = 0;
                    saveGame();
                    if (sudokuGame.hearts === 0) {
                        sudokuGame.gameOver = true;
                        gameTimer.stop();
                        localStorage.removeItem("gameBoard");
                        localStorage.removeItem("hearts");
                        localStorage.removeItem("moveHistory");
                        sudokuUI.showEndPanel("Game Over!", "You have lost all of your lives")
                    }
                }
            }
        })
        sudokuBoard.appendChild(sudokuCell);
    }
}

pauseIcon.addEventListener("click", function () {
    isPaused = true;
    sudokuBoard.style.display = "none";
    pauseOverlay.style.display = "block";
    gridOverlay.style.display = "block";
    pauseTimer.textContent = timerText.textContent;
    pauseDif.textContent = savedDifficulty;
    pausePanel.style.display = "flex";

    if (document.body.classList.contains("dark-mode")) {
        pausePanel.style.backgroundColor = "#1c1e3a";
        pausePanel.style.color = "#ffffff";
        if (isPaused) {
            pauseIcon.src = "whitePlay.png";
        }
        else {
            pauseIcon.src = "whitePause.png";
        }
    }
    else {
        pausePanel.style.backgroundColor = "#ffffff";
        pausePanel.style.color = "#1c1e3a";
        if (isPaused) {
            pauseIcon.src = "navyPlay.png";
        }
        else {
            pauseIcon.src = "navyPause.png";
        }
    }
    gameTimer.stop();
})

resumeButton.addEventListener("click", function () {
    pauseOverlay.style.display = "none";
    sudokuBoard.style.display = "grid";
    pausePanel.style.display = "none";
    gridOverlay.style.display = "none";
    if (document.body.classList.contains("dark-mode")) {
        pauseIcon.src = "whitePause.png";
    }
    else {
        pauseIcon.src = "navyPause.png";
    }
    isPaused = false;
    gameTimer.start();
})

themeIcon.addEventListener("click", function () {
    isDark = !isDark;
    const body = document.body;
    const moon = "moon.png";
    const sun = "sun.png";
    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        themeIcon.src = sun;
        homeIcon.src = "whiteHome.png";
        timerIcon.src = "whiteTimer.png";
        levelIcon.src = "whiteLevel.png";
        if (isPaused) {
            pauseIcon.src = "whitePlay.png";
        }
        else {
            pauseIcon.src = "whitePause.png";
        }
        localStorage.setItem("theme", "dark");
    }
    else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        themeIcon.src = moon;
        homeIcon.src = "navyHome.png";
        timerIcon.src = "navyTimer.png";
        levelIcon.src = "navyLevel.png";
        if (isPaused) {
            pauseIcon.src = "navyPlay.png";
        }
        else {
            pauseIcon.src = "navyPause.png";
        }
        localStorage.setItem("theme", "light");
    }
})

homeIcon.addEventListener("click", function () {
    window.location.href = "index.html";
})

resetBtn.addEventListener("click", function () {
    localStorage.removeItem("timer");
    localStorage.removeItem("gameBoard");
    localStorage.removeItem("hearts");
    localStorage.removeItem("moveHistory");
    gameTimer.seconds = 0;
    timerText.textContent = "00:00:00";
    window.location.reload();

})

undoBtn.addEventListener("click", function () {
    if (sudokuGame.moveHistory.length === 0) {
        sudokuUI.showMessage("No moves to be undone");
    }
    else {
        const lastMove = sudokuGame.moveHistory.pop();
        const cells = document.querySelectorAll(".sudokuCell");
        const index = lastMove.row * 9 + lastMove.col;
        const cell = cells[index];
        if (!lastMove.isWrong) {
            sudokuGame.freq[lastMove.newValue]--;
            sudokuGame.board[lastMove.row][lastMove.col] = lastMove.oldValue;
            cell.textContent = "";
            numberBtn.forEach(function (button) {
                const number = Number(button.textContent);
                if (number === lastMove.newValue) {
                    if (sudokuGame.freq[number] >= 9) {
                        button.disabled = true;
                    }
                    else {
                        button.disabled = false;
                    }
                }
            });
        }
        //wrong moves
        else {
            sudokuGame.board[lastMove.row][lastMove.col] = 0;
            cell.textContent = "";
            cell.classList.remove("wrong");
        }
        saveGame();
    }
});

numberBtn.forEach(function (button) {

    button.addEventListener("click", function (event) {
        numberBtn.forEach(function (btn) {
            btn.classList.remove("selected");
        });
        button.classList.add("selected");
        sudokuGame.selectedNumber = Number(button.textContent);
    });
})

playAgainBtn.addEventListener("click", function () {
    localStorage.removeItem("gameBoard");
    localStorage.removeItem("hearts");
    localStorage.removeItem("moveHistory");
    localStorage.removeItem("freq");
    localStorage.removeItem("timer");

    window.location.reload();
});

homeBtn.addEventListener("click", function () {
    window.location.href = "index.html";
})

const dif = savedDifficulty.toLowerCase();
const savedPuzzle = localStorage.getItem("puzzle");
const savedSolution = localStorage.getItem("solution");
const savedDif = localStorage.getItem("savedDif");

if (savedPuzzle && savedSolution && savedDif === dif) {
    sudokuGame.solution = savedSolution;
    sudokuGame.puzzle = savedPuzzle;
    console.log(sudokuGame.solution);
    console.log(sudokuGame.puzzle);
    sudokuGame.loadPuzzle(sudokuGame.puzzle, sudokuGame.solution);
    restoreGame();

} else {

    fetch(`https://api.mtsudoku.com/v1/generate?mode=classic&difficulty=${dif}`)
        .then(response => response.json()).then(data => {
            sudokuGame.puzzle = data.puzzle;
            sudokuGame.solution = data.solution;
            localStorage.setItem("puzzle", sudokuGame.puzzle);
            localStorage.setItem("solution", sudokuGame.solution);
            localStorage.setItem("savedDif", dif);
            sudokuGame.loadPuzzle(sudokuGame.puzzle, sudokuGame.solution);
            saveGame();
        })
        .catch(error => { console.log("Error:" + error) });
}
