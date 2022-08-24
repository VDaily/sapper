import { board } from "../javascript/board/board.js";
import { placeMines } from "../javascript/mines/placeMines.js";
import { createTable } from "../javascript/table/table.js";
import { UniqueCells } from "../javascript/cells/cells.js";

createTable(board);
placeMines(board);

let table = document.querySelector(".board");
let uniqueCells = new UniqueCells();

table?.addEventListener("click", (event: any) => {
  if (!event.target?.matches(".board__cell")) return;
  let target = event.target;
  let tr = target.closest(".board__row");
  let cell = board.arrayBoard[tr.rowIndex][target.cellIndex];
  if (cell.isOpen) return;
  if (isHit(cell)) {
    alert("BOOM");
    return;
  } else {
    if (cell.countMines > 0) {
      openCell(cell);
      markMines(cell, cell.countMines);
      return;
    }
    uniqueCells.aroundCells(cell, board);

    walkTheAroundCells(board);
  }

  uniqueCells.setCells.clear();
});

function isHit(cell: any) {
  if (cell.isMine) return true;
  return false;
}

function openCell(cell: any) {
  cell.td.classList.add("board__cell_opened");
  cell.isOpen = true;
}
function markMines(cell: any, count: any) {
  cell.td.innerHTML = count;
}
function walkTheAroundCells(board: any) {
  for (let cell of uniqueCells.setCells.values()) {
    if (cell.isMine === false) {
      if (cell.countMines > 0) {
        markMines(cell, cell.countMines);
      } else {
        uniqueCells.aroundCells(cell, board);
      }
      openCell(cell);
    }
  }
}
