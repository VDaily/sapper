let saveWidthTable: number;
window.addEventListener("resize", adaptiveWidth);
window.addEventListener("load", adaptiveWidth);

function adaptiveWidth(event: Event) {
  let table: HTMLElement | null, board: HTMLElement | null, widthTable: number;
  table = document.querySelector(".board__table");

  if (!table) throw new Error("Не найден элемент с классом .board__table");
  widthTable = table.offsetWidth;

  if (saveWidthTable === widthTable) return;
  saveWidthTable = widthTable;
  board = document.querySelector(".board");
  console.log(board);

  if (!board) throw new Error("Не найден элемент с классом .board");

  board.style.width = saveWidthTable + "px";
}
