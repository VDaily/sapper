import { modelTable } from "../../modelSapper/table/modelTable.js";
class ViewTable {
    constructor() {
        this.board = modelTable.getBoard();
        this.createElementTable();
        this.renderTable(this.board);
    }
    changeEvent() {
        this.board = modelTable.getBoard();
        this.renderTable(this.board);
    }
    info(cellObj, nameEvents = "default") {
        this.updateCell(cellObj, nameEvents);
    }
    updateCell(cellObj, nameEvents) {
        let y = cellObj.coordinates[0];
        let x = cellObj.coordinates[1];
        let cellElement = this.table.children[y].children[x];
        if (nameEvents === "deleteAFlag") {
            this.removeStylesWithElement(cellElement, "board__cell_flag");
            return;
        }
        if (cellObj.isFlag) {
            this.openElementCell(cellElement, "board__cell_flag");
            if (cellObj.isDeactivated) {
                this.openElementCell(cellElement, "board__cell_mine-deactivated");
                this.openElementCell(cellElement, "board__cell_opened");
                return;
            }
        }
        if (!cellObj.isOpen)
            return;
        this.openElementCell(cellElement, "board__cell_opened");
        if (cellObj.isMine) {
            this.openElementCell(cellElement, "board__cell_mine");
            if (cellObj.clickMine) {
                this.openElementCell(cellElement, "board__cell_mine-click");
            }
            return;
        }
        if (cellObj.countMines > 0) {
            cellElement.innerHTML = cellObj.countMines;
            this.#addColorClassForCell(cellElement, cellObj.countMines);
        }
    }
    openElementCell(cellElement, className) {
        cellElement.classList.add(className);
    }
    removeStylesWithElement(cellElement, className) {
        cellElement.classList.remove(className);
    }
    createElementTable() {
        let table = document.createElement("table");
        table.className += " board__table ";
        let board = document.querySelector(".board");
        if (!board) {
            throw new Error("Не найден элемент с классом .board в файле .vieTables.js");
        }
        board.append(table);
    }
    renderTable(board) {
        let table = document.querySelector(".board__table");
        if (!table)
            throw new Error("Не найден элемент с классом .table в файле viewTable.js");
        for (let i = 0, maxTr = board.length; i < maxTr; i = i + 1) {
            let row = board[i];
            let tr = document.createElement("tr");
            tr.classList.add("board__row");
            for (let j = 0, maxTd = row.length; j < maxTd; j = j + 1) {
                let td = document.createElement("td");
                td.classList.add("board__cell");
                let cell = row[j];
                if (cell.isOpen)
                    td.classList.add("board__cell_opened");
                if (cell.isFlag)
                    td.classList.add("board__cell_flag");
                tr.append(td);
            }
            table.append(tr);
            this.table = table;
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
}
let viewTable = new ViewTable();
export { viewTable };
