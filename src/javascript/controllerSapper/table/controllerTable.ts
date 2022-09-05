class ControllerTable {
  constructor() {
    let table = document.querySelector(".board__table");

    if (!table)
      throw new Error(
        "Не найден элемент с классом .board__table в файле controllerTable.js"
      );
    this.click = this.click.bind(this);
    table.addEventListener("click", this.click);
  }

  click() {
    // let cell = this.getACell(event.target);
    // if (!cell) return;
    // if (cell.isOpen) return;
    // if (cell.isFlag) return;
    // if (!this.isStartGame) {
    //   this.isStartGame = true;
    //   this.timer.startTimer();
    // }
    // if (this.isHit(cell)) {
    //   endGame(cell, this.mines, false);
    //   this.finishGame();
    //   this.isStartGame = false;
    //   return;
    // } else {
    //   if (cell.countMines > 0) {
    //     addColorClassForCell(cell.td, cell.countMines);
    //     this.numberOfOpenCell++;
    //     this.openCell(cell);
    //     this.markCell(cell, cell.countMines);
    //     this.isFinishGame(cell, this.mines);
    //     let saveSapper = JSON.stringify(sapper);
    //     localStorage.setItem("sapperJson", saveSapper);
    //     return;
    //   }
    //   this.uniqueCells.aroundCells(cell, this.board);
    //   this.walkTheAroundCells(this.board);
    // }
    // this.isFinishGame(cell, this.mines);
    // this.uniqueCells.setCells.clear();
    // let saveSapper = JSON.stringify(sapper);
    // localStorage.setItem("sapperJson", saveSapper);
  }
}
