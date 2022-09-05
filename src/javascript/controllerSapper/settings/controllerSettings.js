import { modelSettings } from "../../modelSapper/settings/modelSettings.js";
import { modelTable } from "../../modelSapper/table/modelTable.js";
class ControllerSapperSettings {
    constructor() {
        this.levelElement = document.querySelector(".settings__level");
        if (!this.levelElement)
            throw new Error("Не найден элемент в контроллере с классом .settings__level");
        this.levelUp = this.levelUp.bind(this);
        this.levelElement.addEventListener("click", this.levelUp);
    }
    levelUp(event) {
        event.preventDefault();
        let table = document.querySelector(".board__table");
        if (!table)
            throw new Error("Не найден элемент с классом .board__table в файле controllerSettings");
        modelTable.removeDataOfTable(table);
        modelSettings.changeLevel();
        modelTable.changeCreateTable();
    }
}
let controllerSapper = new ControllerSapperSettings();
export { controllerSapper };