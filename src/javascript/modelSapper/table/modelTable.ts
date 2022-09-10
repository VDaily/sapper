import { viewTable } from "../../viewSapper/table/viewTable.js";
import { modelMenu } from "../menu/modelMenu.js";
import { timer } from "../menu/timer/timer.js";
import { model, Model } from "../model.js";
import { UniqueCells } from "./cells/cells.js";
import { flags } from "./flags/flags.js";
import { mines } from "./mines/mines.js";

interface ModelTable {
  numberOfOpenCell: number;
  countOfCells: number;
  countMines: number;
  isEndGame: boolean;
  tableArray: any;
  uniqueCells: any;
  mines: any;
  flags: any;
  boardElement: Element;
}

class ModelTable extends Model {
  constructor() {
    super();
    // localStorage.clear();
    if (localStorage.length > 0) {
      this.loadGame();
      this.countMines = model.levels[model.currentIndex].countMines;
      this.uniqueCells = new UniqueCells();
      this.flags = flags;
      let countFlags = this.getItem("countFlags");
      this.isEndGame = false;
      this.flags.setCountFlags(countFlags);
      let boardElement = document.querySelector(".board");
      if (!boardElement) return;
      this.boardElement = boardElement;
      setTimeout(() => {
        this.tableArray.forEach((trArray: any) => {
          trArray.forEach((cellObj: any) => {
            viewTable.info(cellObj);
          });
        });
      });
      let numberOfSeconds = this.getItem("timer");
      if (numberOfSeconds) {
        timer.setCount(numberOfSeconds);
      }

      modelMenu.changeMenu();
    } else {
      this.start();
    }
  }
  start() {
    this.numberOfOpenCell = 0;
    this.countOfCells =
      model.levels[model.currentIndex].sizes.width *
      model.levels[model.currentIndex].sizes.width;
    this.tableArray = this.createTableArray();
    this.countMines = model.levels[model.currentIndex].countMines;
    this.isEndGame = false;
    this.mines = mines.placeMines(this.tableArray, this.countMines);
    this.flags = flags;
    this.uniqueCells = new UniqueCells();
    let boardElement = document.querySelector(".board");
    if (!boardElement) return;
    this.boardElement = boardElement;
  }
  getBoard() {
    return this.tableArray;
  }

  saveGame() {
    let numberOfOpenCellString = this.numberOfOpenCell + "";
    let countOfCellsString = this.countOfCells + "";
    let boardString = JSON.stringify(this.tableArray);
    let currentIndex = model.currentIndex + "";
    let flagsString = this.flags.countFlags;
    localStorage.setItem("numberOfOpenCell", numberOfOpenCellString);
    localStorage.setItem("countOfCells", countOfCellsString);
    localStorage.setItem("board", boardString);
    localStorage.setItem("currentIndex", currentIndex);
    localStorage.setItem("countFlags", flagsString);
  }
  getItem(name: string) {
    let item = localStorage.getItem(name);
    if (!item) return;
    return JSON.parse(item);
  }
  loadGame() {
    this.numberOfOpenCell = this.getItem("numberOfOpenCell");
    this.countOfCells = this.getItem("countOfCells");
    this.tableArray = this.getItem("board");

    let currentIndex = this.getItem("currentIndex");

    this.mines = mines.getArrayMines(this.tableArray);

    model.setSettings(currentIndex);
  }
  deleteGame() {
    localStorage.clear();
  }

  createTableArray() {
    let board = [];
    let width = model.levels[model.currentIndex].sizes.width;
    let height = model.levels[model.currentIndex].sizes.height;
    for (let i = 0; i < height; i++) {
      let arr = [];
      for (let j = 0; j < width; j++) {
        let point = {
          coordinates: [i, j],
          isMine: false,
        };
        arr.push(point);
      }
      board.push(arr);
    }
    return board;
  }
  changeEventViewTable(boardObj: any) {
    viewTable.changeEvent();
  }
  changeSettingsTable() {
    this.start();
    this.addClassStartGame(this.boardElement);

    this.changeEventViewTable(this.tableArray);
  }
  reload() {
    let table = document.querySelector(".board__table");
    if (!table)
      throw new Error(
        "Элемент с классом .board__table не обнаружен в контроллере controllerMenu"
      );

    this.removeDataOfTable(table);
    this.changeSettingsTable();
  }

  removeDataOfTable(table: Element) {
    table.innerHTML = "";
  }

  #openCell(cell: any) {
    cell.isOpen = true;
  }
  #isHit(cell: any) {
    if (cell.isMine) return true;
    return false;
  }
  clickOnCell(event: Event) {
    let cellObj = this.#getACell(event.target);
    if (!cellObj) return;
    if (cellObj.isOpen) return;
    if (cellObj.isFlag) return;
    if (this.#isHit(cellObj)) {
      this.removeClassesFromTagBoard(false);
      this.fail(cellObj, this.mines);
      timer.finishTimer();
      this.deleteGame();

      return;
    } else {
      if (cellObj.countMines > 0) {
        this.numberOfOpenCell++;
        this.#openCell(cellObj);
        this.#isFinishGame();
        viewTable.info(cellObj);
        this.saveGame();
        return;
      }
      this.uniqueCells.aroundCells(cellObj, this.tableArray);
      this.#walkTheAroundCells(this.tableArray);

      this.#openCell(cellObj);
    }
    viewTable.info(cellObj);

    this.uniqueCells.setCells.clear();
    this.saveGame();
    this.#isFinishGame();
  }
  rightClickOnCell(event: Event) {
    let cellObj = this.#getACell(event.target);
    if (!cellObj) return;
    if (cellObj.isFlag === true) {
      if (this.flags.countFlags >= this.countMines) return;
      this.flags.deleteAFlag(cellObj);
      cellObj.isFlag = false;
      viewTable.info(cellObj, "deleteAFlag");
      modelMenu.changeMenu("flags");
      this.saveGame();
      return;
    }
    if (this.flags.countFlags <= 0) return;
    if (cellObj.isOpen) return;
    this.flags.putAFlag(cellObj);
    cellObj.isFlag = true;
    viewTable.info(cellObj);
    modelMenu.changeMenu("flags");
    this.saveGame();
  }
  removeClassReloadScary(event: any) {
    let cellObj = this.#getACell(event.target);
    if (!cellObj) return;
    if (cellObj.isOpen) return;
    if (event.button === 0) {
      let menuReload = document.querySelector(".menu__reload");
      if (!menuReload) throw new Error("Не найден класс menu__reload");
      menuReload.classList.remove("menu__reload_scary");
    }
  }
  addClassReloadScary(event: any) {
    let cell = this.#getACell(event.target);
    if (!cell) return;
    if (cell.isOpen) return;
    if (event.button === 0) {
      let menuReload = document.querySelector(".menu__reload");
      if (!menuReload) throw new Error("Не найден класс menu__reload");
      menuReload.classList.add("menu__reload_scary");
    }
  }
  #getACell(element: any) {
    if (!element.matches(".board__cell")) return false;
    let elementTd = element,
      tr: HTMLTableRowElement | null = elementTd.closest(".board__row");
    if (!tr) return false;
    let cell = this.tableArray[tr.rowIndex][elementTd.cellIndex];

    return cell;
  }
  isActiveOrFlag(element: any) {
    let cell = this.#getACell(element);
    if (cell.isFlag || cell.isOpen) return true;
    return false;
  }
  #walkTheAroundCells(board: any) {
    let cell: any,
      uniqueCellsValues = this.uniqueCells.setCells.values();

    for (cell of uniqueCellsValues) {
      if (cell.isMine !== false) continue;
      if (cell.isFlag) continue;
      if (cell.isOpen) continue;
      if (!cell.countMines) {
        this.uniqueCells.aroundCells(cell, board);
      }

      this.#openCell(cell);
      viewTable.info(cell);
      this.numberOfOpenCell++;
    }
  }

  #isFinishGame() {
    this.numberOfOpenCell + this.countMines >= this.countOfCells;
    if (this.numberOfOpenCell + this.countMines >= this.countOfCells) {
      this.removeClassesFromTagBoard(true);
      this.winningTheGame(this.mines);
      timer.finishTimer();
      model.isStartGame = false;
      this.isEndGame = true;
      this.deleteGame();
      return;
    }
  }
  fail(currentCell: any, mines: any) {
    mines.forEach((mine: any) => {
      this.#openCell(mine);
      mine.isOpen = true;
      if (mine.isFlag) mine.isDeactivated = true;

      if (currentCell === mine) {
        mine.clickMine = true;
      }
      viewTable.info(mine);
      this.isEndGame = true;
    });
  }
  winningTheGame(mines: any) {
    let countMines = this.countMines;
    for (let i = 0; i < countMines; i++) {
      let mine: any = mines[i];
      if (mine.isFlag) {
        continue;
      }
      this.flags.putAFlag(mine);
    }
  }
  removeClassesFromTagBoard(isWon: boolean): void {
    let isBoard = document.querySelector(".board");
    if (!isBoard) return;
    let board: Element = isBoard;
    this.#removeClassStartGame(board);
    if (isWon === true) {
      this.#addClassBoard_Won(board);
    }
  }
  resetClassesForBoard(board: Element) {
    board.className = "board board_startGame";
  }
  addClassStartGame(board: Element): void {
    board.classList.add("board_startGame");
  }
  #removeClassStartGame(board: Element): void {
    board.classList.remove("board_startGame");
  }

  #addClassBoard_Won(board: Element): void {
    board.classList.add("board_won");
  }
}

let modelTable = new ModelTable();
export { modelTable };
