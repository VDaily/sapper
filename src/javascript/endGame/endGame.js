import { sapper } from "../sapper.js";
function endGame(currentCell, mines, isWon) {
    removeClassesFromTagBoard(isWon);
    if (!isWon === true) {
        fail(currentCell, mines);
        return;
    }
    winningTheGame(mines);
}
function addImgIntoCellsWithMines(mine, currentCell) {
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
    if (!isBoard)
        return;
    let board = isBoard;
    removeClassStartGame(board);
    if (isWon === true) {
        addClassBoard_Won(board);
    }
}
function removeClassStartGame(board) {
    board.classList.remove("board_startGame");
}
function addClassBoard_Won(board) {
    board.classList.add("board_won");
}
function winningTheGame(mines) {
    for (let i = 0; i < mines.length; i++) {
        let mine = mines[i];
        if (mine.isFlag)
            continue;
        sapper.flags.putAFlag(mine);
    }
}
export { endGame };
