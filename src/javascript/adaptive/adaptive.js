"use strict";
let saveWidthTable;
window.addEventListener("resize", resizeWidth);
function resizeWidth(event) {
    let table, board, widthTable;
    table = document.querySelector(".board__table");
    if (!table)
        throw new Error("Не найден элемент с классом .board__table");
    widthTable = table.offsetWidth;
    if (saveWidthTable === widthTable)
        return;
    saveWidthTable = widthTable;
    board = document.querySelector(".board");
    console.log(board);
    if (!board)
        throw new Error("Не найден элемент с классом .board");
    board.style.width = saveWidthTable + "px";
    console.log(saveWidthTable);
}
