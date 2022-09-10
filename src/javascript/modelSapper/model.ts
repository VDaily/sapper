import { viewsSettings } from "../../javascript/viewSapper/settings/viewSettings.js";
import { modelMenu } from "./menu/modelMenu.js";
interface Level {
  name: string;
  sizes: {
    width: number;
    height: number;
  };
  countMines: number;
}
[];
interface Model {
  levels: Level[];
  currentIndex: number;
  isStartGame: boolean;
}
class Model {
  constructor() {
    this.currentSettings();
  }
  currentSettings() {
    this.levels = [
      {
        name: "Лёгкий",
        sizes: {
          width: 9,
          height: 9,
        },
        countMines: 13,
      },
      {
        name: "Средний",
        sizes: {
          width: 16,
          height: 16,
        },
        countMines: 40,
      },
      {
        name: "Сложный",
        sizes: {
          width: 30,
          height: 30,
        },
        countMines: 135,
      },
      {
        name: "Профессионал",
        sizes: {
          width: 50,
          height: 50,
        },
        countMines: 375,
      },
    ];
    this.currentIndex = 0;
    this.isStartGame = false;
  }
  changeLevel() {
    this.currentIndex++;
    if (this.currentIndex >= this.levels.length) this.currentIndex = 0;
  }
  setSettings(currentIndex: number) {
    this.currentIndex = currentIndex;

    viewsSettings.changeEvent();
  }
}
let model = new Model();
export { model, Model };
