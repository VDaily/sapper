import { Model } from "../model.js";
class ModelMenu extends Model {
    constructor() {
        super();
    }
    getCurrentLevel() {
        return this.levels[this.currentIndex];
    }
}
let modelMenu = new ModelMenu();
export { modelMenu };
