import { createMenu } from "../menu/menu.js";

function createTable(board: any) {
  let table = document.createElement("table");
  let div = document.createElement("div");
  let menu = createMenu();
  div.classList.add("board", "board_startGame");

  table.classList.add("board__table");
  let tr: HTMLTableRowElement;
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
  div.append(menu);
  div.append(table);

  document.body.append(div);
}

export { createTable };
