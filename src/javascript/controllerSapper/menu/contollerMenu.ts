import { timer } from "../../modelSapper/menu/timer/timer.js";
import { model } from "../../modelSapper/model.js";
import { modelTable } from "../../modelSapper/table/modelTable.js";

class ControllerMenu {
  constructor() {
    let menuReload = document.querySelector(".menu__reload");
    let menuTimer = document.querySelector(".menu__timer");
    if (!menuReload) return;
    if (!menuTimer) return;

    this.click = this.click.bind(this);
    menuReload.addEventListener("click", this.click);
  }
  click(event: Event) {
    modelTable.deleteGame();
    modelTable.reload();
    timer.reload();
    model.isStartGame = false;
  }
  load() {}
}

let controllerMenu = new ControllerMenu();

export { controllerMenu };
