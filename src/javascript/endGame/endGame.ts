function endGame(currentCell: any, mines: [], isWon: boolean): void {
  removeClassesFromTagBoard(isWon);
  if (!isWon === true) fail(currentCell, mines);
}
interface Mine {
  coordinate: [number, number];
  isMine: boolean;
  td: Element;
}
function addImgIntoCellsWithMines(mine: Mine, currentCell: Mine): void {
  console.log(mine);
  if (mine !== currentCell) {
    mine.td.classList.add("board__cell_mine");
    return;
  }
  currentCell.td.classList.add("board__cell_mine-click");
}

function fail(currentCell: Mine, mines: []): void {
  mines.forEach((mine: Mine) => {
    addImgIntoCellsWithMines(mine, currentCell);
    mine.td.classList.add("board__cell_opened");
  });
}
function removeClassesFromTagBoard(isWon: boolean): void {
  let isBoard = document.querySelector(".board");
  console.dir(isBoard);
  if (!isBoard) return;
  let board: Element = isBoard;
  console.log(board);
  removeClassStartGame(board);
  if (isWon === true) {
    won(board);
  }
}
function removeClassStartGame(board: Element): void {
  board.classList.remove("board_startGame");
}

function won(board: Element): void {
  board.classList.add("board_won");
}
export { endGame };
