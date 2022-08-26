function endGame(currentCell: any, mines: []) {
  removeClassFromTagBoard();
  fail(currentCell, mines);
}

function addImgIntoCellsWithMines(mine, currentCell) {
  if (mine !== currentCell) {
    mine.td.classList.add("board__cell_mine");
    return;
  }
  currentCell.td.classList.add("board__cell_mine-click");
}

function fail(currentCell: any, mines: []) {
  mines.forEach((mine) => {
    addImgIntoCellsWithMines(mine, currentCell);
    mine.td.classList.add("board__cell_opened");
  });
}
function removeClassFromTagBoard() {
  let board = document.querySelector(".board");
  board?.classList.remove("board_startGame");
}
export { endGame };
