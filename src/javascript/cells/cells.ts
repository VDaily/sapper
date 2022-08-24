class Cells {
  aroundCells(cell: any, board: any): void {
    let aroundCells = [];
    let count = 0;

    let y = cell.coordinates[0];
    let x = cell.coordinates[1];
    let leftTop,
      middleTop,
      rightTop,
      leftMiddle,
      middleMiddle,
      rightMiddle,
      leftBottom,
      middleBottom,
      rightBottom;
    if (y > 0) {
      if (x > 0) {
        leftTop = board.arrayBoard[y - 1][x - 1];
      }

      middleTop = board.arrayBoard[y - 1][x];

      if (x < board.width - 1) {
        rightTop = board.arrayBoard[y - 1][x + 1];
      }
    }
    leftMiddle = board.arrayBoard[y][x - 1];
    middleMiddle = board.arrayBoard[y][x];
    rightMiddle = board.arrayBoard[y][x + 1];

    if (y < board.height - 1) {
      if (x > 0) {
        leftBottom = board.arrayBoard[y + 1][x - 1];
      }

      middleBottom = board.arrayBoard[y + 1][x];

      if (x < board.width - 1) {
        rightBottom = board.arrayBoard[y + 1][x + 1];
      }
    }

    aroundCells.push(
      leftTop,
      middleTop,
      rightTop,
      leftMiddle,
      middleMiddle,
      rightMiddle,
      leftBottom,
      middleBottom,
      rightBottom
    );
    aroundCells.forEach((elem) => {
      if (elem) {
        if (elem.isMine === true) {
          count++;
        }

        this.setCells.add(elem);
      }
    });
  }
}
class UniqueCells extends Cells {
  setCells = new Set();
  constructor() {
    super();
  }
}
export { UniqueCells };
