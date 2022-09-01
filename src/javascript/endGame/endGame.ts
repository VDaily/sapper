import { sapper } from "../sapper.js";
function endGame(currentCell: any, mines: [], isWon: boolean): void {
  removeClassesFromTagBoard(isWon);
  if (!isWon === true) {
    fail(currentCell, mines);
    return;
  }
  winningTheGame(mines);
}
interface Mine {
  coordinate: [number, number];
  isMine: boolean;
  td: Element;
}
function addImgIntoCellsWithMines(mine: Mine, currentCell: Mine): void {
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
  if (!isBoard) return;
  let board: Element = isBoard;
  removeClassStartGame(board);
  if (isWon === true) {
    addClassBoard_Won(board);
  }
}
function removeClassStartGame(board: Element): void {
  board.classList.remove("board_startGame");
}

function addClassBoard_Won(board: Element): void {
  board.classList.add("board_won");
}

function winningTheGame(mines: []) {
  let lengthOfArrayMines = mines.length;
  for (let i = 0; i < lengthOfArrayMines; i++) {
    let mine: any = mines[i];
    if (mine.isFlag) continue;
    sapper.flags.putAFlag(mine);
  }
}
export { endGame };
