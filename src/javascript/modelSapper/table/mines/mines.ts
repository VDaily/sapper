import { model } from "../../model.js";
import { UniqueCells } from "../cells/cells.js";
class Mines {
  placeMines(board: any, numberOfMines: number) {
    let width = model.levels[model.currentIndex].sizes.width;
    let height = model.levels[model.currentIndex].sizes.height;
    let indexes = this.#generationIndexes(width, height, numberOfMines);
    let minesAroundcell = new UniqueCells();
    let countMines = new UniqueCells();
    let mines: Element[] = [];
    indexes.forEach((index: any) => {
      let cellWithMine = board[index[0]][index[1]];
      cellWithMine.isMine = true;
      mines.push(cellWithMine);
      minesAroundcell.aroundCells(cellWithMine, board);
    });
    let cell: any;
    let currentCell: any;
    for (cell of minesAroundcell.setCells.values()) {
      let count = 0;
      if (cell.isMine === true) continue;
      if (Object.hasOwnProperty(cell.countMines)) continue;
      countMines.aroundCells(cell, board);

      for (currentCell of countMines.setCells.values()) {
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
  getArrayMines(board: any) {
    let mines: any[] = [];
    board.forEach((tr: any) => {
      tr.forEach((cell: any) => {
        if (cell.isMine) {
          mines.push(cell);
        }
      });
    });
    return mines;
  }
  #isFreely(
    indexes: number[],
    randomNumberX: number,
    randomNumberY: number
  ): boolean {
    let lengthOfIndexes = indexes.length;
    for (let i = 0; i < lengthOfIndexes; i++) {
      let elem: any = indexes[i];
      if (elem[0] === randomNumberX && elem[1] === randomNumberY) return false;
    }
    return true;
  }
  #generationIndexes(width: number, height: number, countMines: number) {
    let numberOfMines = countMines;

    let randomNumberX: number, randomNumberY: number;
    let indexes: any = [];
    let maxX = width,
      maxY = height,
      min = 0;

    while (indexes.length < numberOfMines) {
      randomNumberX = Math.floor(Math.random() * (maxX - min)) + min;

      randomNumberY = Math.floor(Math.random() * (maxY - min)) + min;
      if (this.#isFreely(indexes, randomNumberX, randomNumberY)) {
        indexes.push([randomNumberX, randomNumberY]);
      }
    }

    return indexes;
  }
}

let mines = new Mines();
export { mines };
