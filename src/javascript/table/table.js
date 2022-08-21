function createTable(board) {
    let table = document.createElement("table");
    let tr = document.createElement("tr");
    board.forEach((block) => {
        let td = document.createElement("td");
        td.innerHTML += block.coordinates;
        tr.append(td);
    });
    table.append(tr);
    document.body.append(table);
}
export { createTable };
