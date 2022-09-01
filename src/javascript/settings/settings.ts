import { sapper } from "../sapper.js";
interface Settings {
  currentIndex: number;
  levels: {
    name: string;
    sizes: {
      width: number;
      height: number;
    };
    countMines: number;
  }[];
  settingsLevel: any;
}

class Settings {
  constructor() {
    this.levels = [
      {
        name: "Лёгкий",
        sizes: {
          width: 9,
          height: 9,
        },
        countMines: 15,
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
  }
  toSwitchLevel() {
    this.currentIndex++;
    if (this.currentIndex >= this.levels.length) this.currentIndex = 0;
    console.log(sapper.restart());
  }
}

let settings = new Settings();
export { settings };
