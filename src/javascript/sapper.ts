import { createTable, Board } from "../javascript/board/board.js";
import { placeMines, addColorClassForCell } from "../javascript/mines/mines.js";
import { setInMenuCountFlags, Timer } from "./board/menu/menu.js";
import { UniqueCells } from "../javascript/cells/cells.js";
import { endGame } from "../javascript/endGame/endGame.js";
import { Flags } from "../javascript/flags/flags.js";
import { settings } from "./settings/settings.js";

interface Sapper {
  board: Board;
  allCellsArray: object[];
  mines: any;
  table: HTMLElement;
  uniqueCells: UniqueCells;
  isStartGame: boolean;
  flags: Flags;
  timer: Timer;
  rightClickisOff: boolean;
  numberOfOpenCell: number;
}

class Sapper {
  constructor() {
    let width = settings.levels[settings.currentIndex].sizes.width;
    let height = settings.levels[settings.currentIndex].sizes.height;
    this.board = this.createBoard(width, height);
    this.allCellsArray = this.createArrayAllCells(this.board);
    this.mines = placeMines(this.board);

    let board: HTMLElement | null = document.querySelector(".board");
    if (!board) throw new Error("Не найден элемент с классом .board");
    this.table = board;

    this.uniqueCells = new UniqueCells();
    this.isStartGame = false;
    this.flags = new Flags(this.mines.length);
    this.timer = new Timer();
    this.rightClickisOff = false;
    this.numberOfOpenCell = 0;

    setInMenuCountFlags(this.mines.length);
    this.startGame();
  }

  startGame() {
    this.click = this.click.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.table?.addEventListener("mousedown", this.mouseDown);
    this.table?.addEventListener("mouseup", this.mouseUp);
    this.table?.addEventListener("click", this.click);
    this.table.addEventListener("contextmenu", this.rightClick);
  }
  finishGame() {
    this.table?.removeEventListener("mousedown", this.mouseDown);
    this.table?.removeEventListener("mouseup", this.mouseUp);
    this.table?.removeEventListener("click", this.click);
    this.timer.finishTimer();
    this.rightClickisOff = true;
  }
  restart() {
    this.table.remove();
    sapper = new Sapper();
    this.finishGame();
    this.startGame();
  }
  walkTheAroundCells(board: any) {
    let cell: any,
      uniqueCellsValues = this.uniqueCells.setCells.values();

    for (cell of uniqueCellsValues) {
      if (cell.isMine !== false) continue;
      if (cell.isFlag) continue;
      if (cell.isOpen) continue;
      if (cell.countMines > 0) {
        addColorClassForCell(cell.td, cell.countMines);
        this.markCell(cell, cell.countMines);
      } else {
        this.uniqueCells.aroundCells(cell, board);
      }

      this.openCell(cell);
      this.numberOfOpenCell++;
    }
  }
  click(event: Event) {
    let cell = this.getACell(event.target);
    if (!cell) return;

    if (cell.isOpen) return;
    if (cell.isFlag) return;
    if (!this.isStartGame) {
      this.isStartGame = true;
      this.timer.startTimer();
    }
    if (this.isHit(cell)) {
      endGame(cell, this.mines, false);
      this.finishGame();
      this.isStartGame = false;
      return;
    } else {
      if (cell.countMines > 0) {
        addColorClassForCell(cell.td, cell.countMines);
        this.numberOfOpenCell++;
        this.openCell(cell);
        this.markCell(cell, cell.countMines);
        this.isFinishGame(cell, this.mines);
        return;
      }
      this.uniqueCells.aroundCells(cell, this.board);

      this.walkTheAroundCells(this.board);
    }
    this.isFinishGame(cell, this.mines);
    this.uniqueCells.setCells.clear();
  }
  rightClick(event: Event) {
    if (!event.target) return;

    let cell = this.getACell(event.target);
    if (!cell) return;

    event.preventDefault();
    if (this.rightClickisOff) return;

    if (cell.isFlag === true) {
      if (this.flags.countFlags >= this.mines.length) return;
      this.flags.deleteAFlag(cell);
      cell.isFlag = false;
      return;
    }
    if (this.flags.countFlags <= 0) return;
    if (cell.isOpen) return;
    this.flags.putAFlag(cell);
    cell.isFlag = true;
  }
  isHit(cell: any) {
    if (cell.isMine) return true;
    return false;
  }

  openCell(cell: any) {
    cell.td.classList.add("board__cell_opened");
    cell.isOpen = true;
  }
  markCell(cell: any, count: any) {
    cell.td.innerHTML = count;
  }

  createArrayAllCells(board: any) {
    let allCellsArray: object[] = [];
    board.arrayBoard.forEach((row: []) => {
      row.forEach((cell) => {
        allCellsArray.push(cell);
      });
    });
    return allCellsArray;
  }
  createBoard(width: number, height: number) {
    let board = new Board(width, height);
    createTable(board);
    return board;
  }
  mouseUp(event: MouseEvent) {
    let cell = this.getACell(event.target);
    if (!cell) return;
    if (cell.isOpen) return;
    if (event.button === 0) {
      let menuReload = document.querySelector(".menu__reload");
      if (!menuReload) throw new Error("Не найден класс menu__reload");
      menuReload.classList.remove("menu__reload_scary");
    }
  }
  mouseDown(event: MouseEvent) {
    let cell = this.getACell(event.target);
    if (!cell) return;
    if (cell.isOpen) return;
    if (event.button === 0) {
      let menuReload = document.querySelector(".menu__reload");
      if (!menuReload) throw new Error("Не найден класс menu__reload");
      menuReload.classList.add("menu__reload_scary");
    }
  }

  getACell(element: any) {
    if (!element.matches(".board__cell")) return false;
    let elementTd = element,
      tr: HTMLTableRowElement | null = elementTd.closest(".board__row");
    if (!tr) return false;
    let cell = this.board.arrayBoard[tr.rowIndex][elementTd.cellIndex];

    return cell;
  }
  isFinishGame(cell: Element, mines: []) {
    if (
      this.numberOfOpenCell + this.mines.length >=
      this.allCellsArray.length
    ) {
      let isWon = true;
      endGame(cell, mines, isWon);
      this.finishGame();
      return;
    }
  }
}

let sapper = new Sapper();

export { sapper };
