import { model } from "../../../modelSapper/model.js";

class ModelRating {
  constructor() {}

  getLevel() {
    return model.levels[model.currentIndex].name;
  }
}

let modelRating = new ModelRating();

export { modelRating };
