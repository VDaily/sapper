import { viewsSettings } from "../../viewSapper/settings/viewSettings.js";
import { viewTable } from "../../viewSapper/table/viewTable.js";
import { model, Model } from "../model.js";

class ModelSapperSettings extends Model {
  constructor() {
    super();
  }
  getCurrentName() {
    let name = model.levels[model.currentIndex].name;
    return name;
  }
  changeLevelName() {
    let name: string = model.levels[model.currentIndex].name;
    viewsSettings.changeEvent();
  }
  changeLevel(): void {
    model.changeLevel();
    viewsSettings.changeEvent();
  }
}

let modelSettings = new ModelSapperSettings();
export { modelSettings };
