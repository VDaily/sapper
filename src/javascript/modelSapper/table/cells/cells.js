import { model } from "../../model.js";
class Cells {
    setCells;
    aroundCells(cell, board) {
        let aroundCellsArray = [];
        let y = cell.coordinates[0];
        let x = cell.coordinates[1];
        let leftTop, middleTop, rightTop, leftMiddle, middleMiddle, rightMiddle, leftBottom, middleBottom, rightBottom;
        let width = model.levels[model.currentIndex].sizes.width;
        let height = model.levels[model.currentIndex].sizes.width;
        if (y > 0) {
            if (x > 0) {
                leftTop = board[y - 1][x - 1];
            }
            middleTop = board[y - 1][x];
            if (x < width - 1) {
                rightTop = board[y - 1][x + 1];
            }
        }
        leftMiddle = board[y][x - 1];
        middleMiddle = board[y][x];
        rightMiddle = board[y][x + 1];
        /**
         * Смотрим, чтобы y + 1 не был больше размера поля
         */
        if (y < height - 1) {
            if (x > 0) {
                leftBottom = board[y + 1][x - 1];
            }
            middleBottom = board[y + 1][x];
            if (x < width - 1) {
                rightBottom = board[y + 1][x + 1];
            }
        }
        aroundCellsArray.push(leftTop, middleTop, rightTop, leftMiddle, middleMiddle, rightMiddle, leftBottom, middleBottom, rightBottom);
        return aroundCellsArray;
    }
}
class UniqueCells extends Cells {
    setCells = new Set();
    aroundCells(cell, board) {
        let aroundCellsArray = super.aroundCells(cell, board);
        let count = 0;
        aroundCellsArray.forEach((elem) => {
            if (elem) {
                if (elem.isMine === true) {
                    count++;
                }
                this.setCells.add(elem);
            }
        });
    }
}
export { UniqueCells };
