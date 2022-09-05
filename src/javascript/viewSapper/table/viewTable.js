import { modelTable } from "../../modelSapper/table/modelTable.js";
class ViewTable {
    constructor() {
        this.createElementTable();
        this.renderTable();
    }
    changeEvent() {
        this.renderTable();
    }
    createElementTable() {
        let table = document.createElement("table");
        table.className += "board__table";
        let board = document.querySelector(".board");
        if (!board) {
            throw new Error("Не найден элемент с классом .board в файле .vieTables.js");
        }
        console.log("board", board);
        console.log("table", table);
        board.append(table);
    }
    createTable(board) {
        let time = performance.now();
        let table = document.querySelector(".board__table");
        if (!table)
            throw new Error("Не найден элемент с классом .table в файле viewTable.js");
        for (let i = 0, maxTr = board.length; i < maxTr; i = i + 1) {
            let row = board[i];
            let tr = document.createElement("tr");
            tr.className += "board__row";
            for (let j = 0, maxTd = row.length; j < maxTd; j = j + 1) {
                let td = document.createElement("td");
                td.className += "board__cell";
                let cell = row[j];
                if (cell.isOpen)
                    console.log(123);
                tr.append(td);
            }
            table.append(tr);
        }
        time = performance.now() - time;
        console.log("Время выполнения createTable:", time / 1000, "миллисекунд");
    }
    renderTable() {
        let time = performance.now();
        let board = modelTable.getBoard();
        let boardElement = document.querySelector(".board");
        if (!boardElement)
            throw new Error("Не удалось найти элемент с классом .board в файле viewSettings");
        this.createTable(board);
        boardElement.append(this.table);
        time = performance.now() - time;
        console.log("Время выполнения renderTable:", time / 1000, "миллисекунд");
    }
}
let viewTable = new ViewTable();
export { viewTable };
