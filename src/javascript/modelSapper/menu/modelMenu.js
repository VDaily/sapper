import { viewMenu } from "../../viewSapper/menu/viewMenu.js";
import { model, Model } from "../model.js";
import { flags } from "../table/flags/flags.js";
import { timer } from "./timer/timer.js";
class ModelMenu extends Model {
    constructor() {
        super();
    }
    getCurrentLevel() {
        return model.levels[model.currentIndex];
    }
    getCountTimer() {
        return timer.getCount();
    }
    getCountFlags() {
        return flags.getCountFlags();
    }
    setCountFlags(countFlags) {
        flags.setCountFlags(countFlags);
    }
    changeMenu(nameEvents = "default") {
        viewMenu.info(nameEvents);
    }
}
let modelMenu = new ModelMenu();
export { modelMenu };
