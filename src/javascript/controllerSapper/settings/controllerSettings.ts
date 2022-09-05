import { model } from "../../modelSapper/model.js";
import { modelSettings } from "../../modelSapper/settings/modelSettings.js";
import { modelTable } from "../../modelSapper/table/modelTable.js";

interface Level {
  name: string;
  sizes: {
    width: number;
    height: number;
  };
  countMines: number;
}
interface ControllerSapperSettings {
  levels: Level[];
  currentIndex: number;
  levelElement: HTMLElement | null;
}
class ControllerSapperSettings {
  constructor() {
    this.levelElement = document.querySelector(".settings__level");
    if (!this.levelElement)
      throw new Error(
        "Не найден элемент в контроллере с классом .settings__level"
      );

    this.levelUp = this.levelUp.bind(this);

    this.levelElement.addEventListener("click", this.levelUp);
  }

  levelUp(event: Event) {
    event.preventDefault();

    let table: HTMLTableElement | null =
      document.querySelector(".board__table");
    if (!table)
      throw new Error(
        "Не найден элемент с классом .board__table в файле controllerSettings"
      );
    modelTable.removeDataOfTable(table);

    modelSettings.changeLevel();
    modelTable.changeCreateTable();
  }
}

let controllerSapper = new ControllerSapperSettings();

export { controllerSapper };
