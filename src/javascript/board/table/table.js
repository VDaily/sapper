import { createMenu } from "../menu/menu.js";
import { createSettings } from "../settingsElement/createSettingsElement.js";
function createTable(board) {
    let table = document.createElement("table");
    let div = document.createElement("div");
    let menu = createMenu();
    let settings = createSettings();
    let info = document.createElement("div");
    info.classList.add("board__info");
    div.classList.add("board", "board_startGame");
    table.classList.add("board__table");
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
    info.append(settings);
    info.append(menu);
    div.append(info);
    div.append(table);
    document.body.append(div);
    let widthTable = table.getBoundingClientRect().width;
    div.style.width = widthTable + "px";
}
export { createTable };
