function createTable(board) {
    let table = document.createElement("table");
    table.classList.add("board");
    let tr;
    let width = board.width;
    let height = board.height;
    let numberOfCell = board.width * board.height;
    for (let i = 0; i < height; i++) {
        tr = document.createElement("tr");
        tr.classList.add("board__row");
        for (let j = 0; j < width; j++) {
            let td = document.createElement("td");
            board.arrayBoard[i][j].td = td;
            td.classList.add("board__cell");
            tr.append(td);
        }
        table.append(tr);
    }
    document.body.append(table);
}
export { createTable };
