import { UniqueCells } from "../cells/cells.js";

function placeMines(board: any) {
  let indexes = generationIndexes(board.width, board.height);
  let minesAroundcell = new UniqueCells();
  let countMines = new UniqueCells();
  let mines = [];
  console.log(board);
  indexes.forEach((index: any) => {
    let cellWithMine = board.arrayBoard[index[0]][index[1]];
    cellWithMine.isMine = true;
    mines.push(cellWithMine);
    minesAroundcell.aroundCells(cellWithMine, board);
  });
  for (let cell of minesAroundcell.setCells.values()) {
    let count = 0;
    if (cell.isMine === true) continue;
    if (Object.hasOwnProperty(cell.countMines)) continue;
    countMines.aroundCells(cell, board);
    for (let currentCell of countMines.setCells.values()) {
      if (currentCell.isMine === true) {
        count++;
      }
    }
    cell.countMines = count;
    countMines.setCells.clear();
    count = 0;
  }

  minesAroundcell.setCells.clear();

  return mines;
}
function isFreely(
  indexes: number[],
  randomNumberX: number,
  randomNumberY: number
): boolean {
  indexes.forEach((elem: any) => {
    if (elem[0] === randomNumberX && elem[1] === randomNumberY) return false;
  });
  return true;
}

function generationIndexes(width: number, height: number) {
  let numberOfCell = width * height;
  let numberOfMines = 10;
  // let numberOfMines = Math.ceil((numberOfCell / 100) * 15);

  let randomNumberX: number, randomNumberY: number;
  let indexes: any = [];
  let maxX = width,
    maxY = height,
    min = 0;

  while (indexes.length < numberOfMines) {
    randomNumberX = Math.floor(Math.random() * (maxX - min)) + min;

    randomNumberY = Math.floor(Math.random() * (maxY - min)) + min;
    if (isFreely(indexes, randomNumberX, randomNumberY)) {
      indexes.push([randomNumberX, randomNumberY]);
    }
  }

  return indexes;
}

export { placeMines };
