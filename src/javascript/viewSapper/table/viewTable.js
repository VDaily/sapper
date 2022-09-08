import { modelTable } from "../../modelSapper/table/modelTable.js";
class ViewTable {
    constructor() {
        this.board = modelTable.getBoard();
        this.createElementTable();
        console.log("ViewTable", this.board);
        this.renderTable(this.board);
    }
    changeEvent() {
        this.board = modelTable.getBoard();
        this.renderTable(this.board);
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
                // console.log(board[i][j]);
                let td = board[i][j].td;
                td.classList.add("board__cell");
                let cell = row[j];
                if (cell.isOpen)
                    td.classList.add("board__cell_opened");
                if (cell.isFlag)
                    td.classList.add("board__cell_flag");
                tr.append(td);
            }
            table.append(tr);
        }
    }
}
let viewTable = new ViewTable();
export { viewTable };
