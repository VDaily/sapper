function endGame(currentCell, mines, isWon) {
    removeClassesFromTagBoard(isWon);
    if (!isWon === true)
        fail(currentCell, mines);
}
function addImgIntoCellsWithMines(mine, currentCell) {
    console.log(mine);
    if (mine !== currentCell) {
        mine.td.classList.add("board__cell_mine");
        return;
    }
    currentCell.td.classList.add("board__cell_mine-click");
}
function fail(currentCell, mines) {
    mines.forEach((mine) => {
        addImgIntoCellsWithMines(mine, currentCell);
        mine.td.classList.add("board__cell_opened");
    });
}
function removeClassesFromTagBoard(isWon) {
    let isBoard = document.querySelector(".board");
    console.dir(isBoard);
    if (!isBoard)
        return;
    let board = isBoard;
    console.log(board);
    removeClassStartGame(board);
    if (isWon === true) {
        won(board);
    }
}
function removeClassStartGame(board) {
    board.classList.remove("board_startGame");
}
function won(board) {
    board.classList.add("board_won");
}
export { endGame };
