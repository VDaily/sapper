import { createTable } from "./table/table.js";
interface Board {
  arrayBoard: object[];
}
interface Point {
  coordinates: [number, number];
  isMine: boolean;
}
class Board {
  constructor(public width: number, public height: number) {
    this.arrayBoard = this.createBoardArray(width, height);
  }
  createBoardArray(x: number, y: number) {
    let board = [];
    for (let i = 0; i < y; i++) {
      let arr = [];
      for (let j = 0; j < x; j++) {
        let point: Point = {
          coordinates: [i, j],
          isMine: false,
        };
        arr.push(point);
      }
      board.push(arr);
    }
    return board;
  }
}
let width = 9;
let height = 9;
// let board = new Board(width, height);

export { createTable, Board };
