class ModelBoard {
  loadGame() {
    console.log("LocalStorage", localStorage);
    let boardString = localStorage.getItem("boardString");
    if (!boardString) return;
    let boardObj = JSON.parse(boardString);
  }
}

let modelBoard = new ModelBoard();

export { modelBoard };
