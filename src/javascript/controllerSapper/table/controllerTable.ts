import { timer } from "../../modelSapper/menu/timer/timer.js";
import { model } from "../../modelSapper/model.js";
import { modelTable } from "../../modelSapper/table/modelTable.js";
interface ControllerTable {
  table: Element;
}
class ControllerTable {
  constructor() {
    let table = document.querySelector(".board__table");

    if (!table)
      throw new Error(
        "Не найден элемент с классом .board__table в файле controllerTable.js"
      );
    this.click = this.click.bind(this);
    this.rightClick = this.rightClick.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);

    table.addEventListener("mousedown", this.mouseDown);
    table.addEventListener("mouseup", this.mouseUp);
    table.addEventListener("click", this.click);
    table.addEventListener("contextmenu", this.rightClick);
    table.addEventListener("selectstart", (event) => {
      event.preventDefault();
    });
    this.table = table;
  }

  click(event: Event) {
    if (this.#isEndGame(modelTable.isEndGame)) return;

    if (!model.isStartGame) {
      timer.startTimer();
      model.isStartGame = true;
    }

    modelTable.clickOnCell(event);
  }
  rightClick(event: Event) {
    event.preventDefault();
    if (this.#isEndGame(modelTable.isEndGame)) return;
    modelTable.rightClickOnCell(event);
  }
  mouseUp(event: any) {
    if (event.button !== 0) return;
    if (!event.target) return;
    if (!event.target.matches(".board__cell")) return;
    event.target.classList.remove("board__cell_active");

    if (this.#isEndGame(modelTable.isEndGame)) return;
    modelTable.removeClassReloadScary(event);
  }
  mouseDown(event: any) {
    if (event.button !== 0) return;
    if (!event.target) return;
    if (!event.target.matches(".board__cell")) return;
    if (this.#isEndGame(modelTable.isEndGame)) return;
    if (modelTable.isActiveOrFlag(event.target)) return;
    event.target?.classList.add("board__cell_active");

    modelTable.addClassReloadScary(event);
    this.table.addEventListener("mouseout", this.mouseLeave);
  }

  mouseLeave(event: any) {
    event.target?.classList.remove("board__cell_active");
    modelTable.removeClassReloadScary(event);
    this.table.removeEventListener("mouseout", this.mouseLeave);
  }
  #isEndGame(isEndGame: boolean) {
    if (isEndGame) return true;
    return false;
  }
}

let controllerTable = new ControllerTable();
export { controllerTable };
