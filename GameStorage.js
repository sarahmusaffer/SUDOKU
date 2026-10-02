class GameStorage {
     saveGame(sudokuGame, timerText) {
    localStorage.setItem("gameBoard", JSON.stringify(sudokuGame.board));
    localStorage.setItem("hearts", sudokuGame.hearts);
    localStorage.setItem("moveHistory", JSON.stringify(sudokuGame.moveHistory));
    localStorage.setItem("freq",JSON.stringify(sudokuGame.freq));
    localStorage.setItem("timer", timerText.textContent);
}

getGameBoard(){
    return localStorage.getItem("gameBoard");
}

getHearts(){
    return localStorage.getItem("hearts");
}

getMoveHistory(){
    return localStorage.getItem("moveHistory");
}

getFreq(){
    return localStorage.getItem("freq");
}

getSavedPuzzle(){
    return localStorage.getItem("puzzle");
}

getSavedSolution(){
    return localStorage.getItem("solution");
}
}
export default GameStorage;