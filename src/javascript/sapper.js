import { createTable, Board } from "../javascript/board/board.js";
import { placeMines } from "../javascript/mines/placeMines.js";
import { setInMenuCountMines, Timer } from "./board/menu/menu.js";
import { UniqueCells } from "../javascript/cells/cells.js";
import { endGame } from "../javascript/endGame/endGame.js";
import { Flags } from "../javascript/flags/flags.js";
window.addEventListener("click", function (event) {
    if (event.button === 2) {
        event.preventDefault();
    }
});
class Sapper {
    constructor() {
        this.board = this.createBoard(9, 9);
        this.allCellsArray = this.createArrayAllCells(this.board);
        this.mines = placeMines(this.board);
        setInMenuCountMines(this.mines.length);
        this.table = document.querySelector(".board");
        this.uniqueCells = new UniqueCells();
        this.isStartGame = false;
        this.flags = new Flags(this.mines.length);
        this.timer = new Timer();
        this.startGame();
        this.click = this.click.bind(this);
        this.table.addEventListener("contextmenu", this.click);
    }
    startGame() {
        this.click = this.click.bind(this);
        this.table?.addEventListener("click", this.click);
    }
    finishGame() {
        this.table?.removeEventListener("click", this.click);
        this.timer.finishTimer();
    }
    restart() {
        this.table.remove();
        sapper = new Sapper();
        this.finishGame();
        this.startGame();
    }
    walkTheAroundCells(board) {
        for (let cell of this.uniqueCells.setCells.values()) {
            if (cell.isMine === false) {
                if (cell.countMines > 0) {
                    this.markMines(cell, cell.countMines);
                }
                else {
                    this.uniqueCells.aroundCells(cell, board);
                }
                this.openCell(cell);
            }
        }
    }
    click(event) {
        if (!event.target?.matches(".board__cell"))
            return;
        let target = event.target;
        let tr = target.closest(".board__row");
        let cell = this.board.arrayBoard[tr.rowIndex][target.cellIndex];
        event.preventDefault();
        if (cell.isOpen)
            return;
        if (event.button === 0) {
            if (cell.isFlag)
                return;
            if (!this.isStartGame) {
                this.isStartGame = true;
                this.timer.startTimer();
            }
            if (this.isHit(cell)) {
                endGame(cell, this.mines);
                this.finishGame();
                return;
            }
            else {
                if (cell.countMines > 0) {
                    this.openCell(cell);
                    this.markMines(cell, cell.countMines);
                    return;
                }
                this.uniqueCells.aroundCells(cell, this.board);
                this.walkTheAroundCells(this.board);
            }
            this.uniqueCells.setCells.clear();
        }
        else if (event.button === 2) {
            if (cell.isFlag === true) {
                if (this.flags.countFlags >= this.mines.length)
                    return;
                this.flags.deleteAFlag(cell);
                cell.isFlag = false;
                return;
            }
            if (this.flags.countFlags <= 0)
                return;
            this.flags.putAFlag(cell);
            cell.isFlag = true;
        }
        console.log(event.button);
    }
    isHit(cell) {
        if (cell.isMine)
            return true;
        return false;
    }
    openCell(cell) {
        cell.td.classList.add("board__cell_opened");
        cell.isOpen = true;
    }
    markMines(cell, count) {
        cell.td.innerHTML = count;
    }
    createArrayAllCells(board) {
        let allCellsArray = [];
        board.arrayBoard.forEach((row) => {
            row.forEach((cell) => {
                allCellsArray.push(cell);
            });
        });
        return allCellsArray;
    }
    createBoard(width, height) {
        let board = new Board(width, height);
        createTable(board);
        return board;
    }
}
let sapper = new Sapper();
export { sapper };
