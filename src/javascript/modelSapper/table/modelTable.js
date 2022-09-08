import { viewTable } from "../../viewSapper/table/viewTable.js";
import { timer } from "../menu/timer/timer.js";
import { model, Model } from "../model.js";
import { UniqueCells } from "./cells/cells.js";
import { Flags } from "./flags/flags.js";
import { mines } from "./mines/mines.js";
class ModelTable extends Model {
    constructor() {
        super();
        localStorage.clear();
        if (localStorage.length > 0) {
            console.log("Делаем это");
            this.loadGame();
            console.log(this.tableArray);
            return;
        }
        this.start();
    }
    start() {
        this.numberOfOpenCell = 0;
        this.countOfCells = 0;
        this.tableArray = this.createTableArray();
        this.countMines = model.levels[model.currentIndex].countMines;
        this.isEndGame = false;
        this.mines = mines.placeMines(this.tableArray, this.countMines);
        this.flags = new Flags(model.levels[model.currentIndex].countMines);
        this.uniqueCells = new UniqueCells();
        let boardElement = document.querySelector(".board");
        if (!boardElement)
            return;
        this.boardElement = boardElement;
    }
    getBoard() {
        return this.tableArray;
    }
    saveGame() {
        let boardString = JSON.stringify(this.tableArray);
        console.log("saveGame", boardString);
        let currentIndex = model.currentIndex + "";
        let isStartGame = model.isStartGame + "";
        localStorage.setItem("boardString", boardString);
        localStorage.setItem("currentIndex", currentIndex);
        localStorage.setItem("isStartGame", isStartGame);
    }
    loadGame() {
        let boardString = localStorage.getItem("boardString");
        let currentIndexString = localStorage.getItem("currentIndex");
        let isStartGameString = localStorage.getItem("isStartGame");
        if (!boardString)
            return;
        if (!currentIndexString)
            return;
        if (!isStartGameString)
            return;
        this.tableArray = JSON.parse(boardString);
        let currentIndex = JSON.parse(currentIndexString);
        let isStartGame = JSON.parse(isStartGameString);
        console.log("Загрузка", this.tableArray, currentIndex, isStartGame);
    }
    deleteGame() {
        localStorage.clear();
    }
    createTableArray() {
        let board = [];
        let countOfCells = 0;
        let width = model.levels[model.currentIndex].sizes.width;
        let height = model.levels[model.currentIndex].sizes.height;
        for (let i = 0; i < height; i++) {
            let arr = [];
            for (let j = 0; j < width; j++) {
                let tdElement = document.createElement("td");
                let point = {
                    coordinates: [i, j],
                    isMine: false,
                    td: tdElement,
                };
                arr.push(point);
                countOfCells++;
            }
            board.push(arr);
        }
        this.countOfCells = countOfCells;
        return board;
    }
    changeEventViewTable(boardObj) {
        viewTable.changeEvent();
    }
    changeSettingsTable() {
        this.start();
        this.#addClassStartGame(this.boardElement);
        this.changeEventViewTable(this.tableArray);
    }
    reload() {
        let table = document.querySelector(".board__table");
        if (!table)
            throw new Error("Элемент с классом .board__table не обнаружен в контроллере controllerMenu");
        this.removeDataOfTable(table);
        this.changeSettingsTable();
    }
    removeDataOfTable(table) {
        table.innerHTML = "";
    }
    #openCell(cell) {
        cell.td.classList.add("board__cell_opened");
        cell.isOpen = true;
    }
    #markCell(cell, count) {
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
    #isHit(cell) {
        if (cell.isMine)
            return true;
        return false;
    }
    clickOnCell(event) {
        let cellObj = this.#getACell(event.target);
        if (!cellObj)
            return;
        if (cellObj.isOpen)
            return;
        if (cellObj.isFlag)
            return;
        if (this.#isHit(cellObj)) {
            this.removeClassesFromTagBoard(false);
            this.fail(cellObj, this.mines);
            timer.finishTimer();
        }
        else {
            if (cellObj.countMines > 0) {
                this.#addColorClassForCell(cellObj.td, cellObj.countMines);
                this.numberOfOpenCell++;
                this.#openCell(cellObj);
                this.#markCell(cellObj, cellObj.countMines);
                this.#isFinishGame();
                this.saveGame();
                return;
            }
            this.uniqueCells.aroundCells(cellObj, this.tableArray);
            this.#walkTheAroundCells(this.tableArray);
            this.#openCell(cellObj);
        }
        this.#isFinishGame();
        this.uniqueCells.setCells.clear();
        this.saveGame();
    }
    rightClickOnCell(event) {
        let cellObj = this.#getACell(event.target);
        if (!cellObj)
            return;
        if (cellObj.isFlag === true) {
            if (this.flags.countFlags >= this.countMines)
                return;
            this.flags.deleteAFlag(cellObj);
            cellObj.isFlag = false;
            return;
        }
        if (this.flags.countFlags <= 0)
            return;
        if (cellObj.isOpen)
            return;
        this.flags.putAFlag(cellObj);
        cellObj.isFlag = true;
    }
    removeClassReloadScary(event) {
        let cellObj = this.#getACell(event.target);
        if (!cellObj)
            return;
        if (cellObj.isOpen)
            return;
        if (event.button === 0) {
            let menuReload = document.querySelector(".menu__reload");
            if (!menuReload)
                throw new Error("Не найден класс menu__reload");
            menuReload.classList.remove("menu__reload_scary");
        }
    }
    addClassReloadScary(event) {
        let cell = this.#getACell(event.target);
        if (!cell)
            return;
        if (cell.isOpen)
            return;
        if (event.button === 0) {
            let menuReload = document.querySelector(".menu__reload");
            if (!menuReload)
                throw new Error("Не найден класс menu__reload");
            menuReload.classList.add("menu__reload_scary");
        }
    }
    #getACell(element) {
        if (!element.matches(".board__cell"))
            return false;
        let elementTd = element, tr = elementTd.closest(".board__row");
        if (!tr)
            return false;
        let cell = this.tableArray[tr.rowIndex][elementTd.cellIndex];
        return cell;
    }
    isActiveOrFlag(element) {
        let cell = this.#getACell(element);
        if (cell.isFlag || cell.isOpen)
            return true;
        return false;
    }
    #walkTheAroundCells(board) {
        let cell, uniqueCellsValues = this.uniqueCells.setCells.values();
        console.log(uniqueCellsValues);
        for (cell of uniqueCellsValues) {
            if (cell.isMine !== false)
                continue;
            if (cell.isFlag)
                continue;
            if (cell.isOpen)
                continue;
            if (cell.countMines > 0) {
                this.#addColorClassForCell(cell.td, cell.countMines);
                this.#markCell(cell, cell.countMines);
            }
            else {
                this.uniqueCells.aroundCells(cell, board);
            }
            this.#openCell(cell);
            this.numberOfOpenCell++;
        }
    }
    #addColorClassForCell(cell, count) {
        switch (count) {
            case 1:
                cell.classList.add("board__cell_one-mine");
                break;
            case 2:
                cell.classList.add("board__cell_two-mines");
                break;
            case 3:
                cell.classList.add("board__cell_three-mines");
                break;
            case 4:
                cell.classList.add("board__cell_four-mines");
                break;
            case 5:
                cell.classList.add("board__cell_five-mines");
                break;
            case 6:
                cell.classList.add("board__cell_six-mines");
                break;
            case 7:
                cell.classList.add("board__cell_seven-mines");
                break;
            case 8:
                cell.classList.add("board__cell_eight-mines");
                break;
        }
    }
    #isFinishGame() {
        if (this.numberOfOpenCell + this.countMines >= this.countOfCells) {
            this.removeClassesFromTagBoard(true);
            this.winningTheGame(this.mines);
            this.isEndGame = true;
            return;
        }
    }
    fail(currentCell, mines) {
        mines.forEach((mine) => {
            this.#addImgIntoCellsWithMines(mine, currentCell);
            mine.td.className += " board__cell_opened ";
        });
        this.isEndGame = true;
    }
    winningTheGame(mines) {
        let countMines = this.countMines;
        for (let i = 0; i < countMines; i++) {
            let mine = mines[i];
            if (mine.isFlag)
                continue;
            this.flags.putAFlag(mine);
        }
    }
    #addImgIntoCellsWithMines(mine, currentCell) {
        if (mine !== currentCell) {
            mine.td.className += " board__cell_mine ";
            return;
        }
        currentCell.td.className += " board__cell_mine-click ";
    }
    removeClassesFromTagBoard(isWon) {
        let isBoard = document.querySelector(".board");
        if (!isBoard)
            return;
        let board = isBoard;
        this.#removeClassStartGame(board);
        if (isWon === true) {
            this.#addClassBoard_Won(board);
        }
    }
    #addClassStartGame(board) {
        board.classList.add("board_startGame");
    }
    #removeClassStartGame(board) {
        board.classList.remove("board_startGame");
    }
    #addClassBoard_Won(board) {
        board.classList.add("board_won");
    }
}
let modelTable = new ModelTable();
export { modelTable };
