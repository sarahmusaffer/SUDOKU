class SudokuGame {
    constructor() {
        this.gameOver = false;
        this.gameWon = false;
        this.hearts = 3;
        this.puzzle = null;
        this.solution = null;
        this.board = [];
        this.solutionBoard = [];
        this.moveHistory = [];
        this.selectedNumber = null;
        this.freq = {};
    }

    loadPuzzle(puzzle, solution) {
        const cells = document.querySelectorAll(".sudokuCell");
        this.freq = {};
        this.board = [];
        this.solutionBoard = [];
        for (let row = 0; row < 9; row++) {
            this.board[row] = [];
            this.solutionBoard[row] = [];
            for (let col = 0; col < 9; col++) {
                const index = row * 9 + col;
                this.board[row][col] = Number(puzzle[index]);
                this.solutionBoard[row][col] = Number(solution[index]);
            }
        }

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const index = row * 9 + col;
                const value = this.board[row][col];
                cells[index].disabled = false;
                cells[index].textContent = "";

                if (value != 0) {
                    this.freq[value] = (this.freq[value] || 0) + 1;
                    cells[index].disabled = true;
                    cells[index].textContent = value;
                }
            }
        }
    }
    
    checkWin() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.board[row][col] !== this.solutionBoard[row][col]) {
                    return;
                }
            }

        }
        return true;
    }
}
export default SudokuGame;
