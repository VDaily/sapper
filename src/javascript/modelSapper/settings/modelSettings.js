import { viewsSettings } from "../../viewSapper/settings/viewSettings.js";
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
        let name = model.levels[model.currentIndex].name;
        viewsSettings.changeEvent();
    }
    changeLevel() {
        model.changeLevel();
        viewsSettings.changeEvent();
    }
}
let modelSettings = new ModelSapperSettings();
export { modelSettings };
