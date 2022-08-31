import { sapper } from "../sapper.js";
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
                isActive: true,
            },
            {
                name: "Средний",
                sizes: {
                    width: 16,
                    height: 16,
                },
                countMines: 40,
                isActive: false,
            },
            {
                name: "Сложный",
                sizes: {
                    width: 30,
                    height: 30,
                },
                countMines: 135,
                isActive: false,
            },
            {
                name: "Профессионал",
                sizes: {
                    width: 50,
                    height: 50,
                },
                countMines: 375,
                isActive: false,
            },
        ];
        this.currentIndex = 0;
    }
    toSwitchLevel() {
        this.currentIndex++;
        if (this.currentIndex >= this.levels.length)
            this.currentIndex = 0;
        console.log(sapper.restart());
    }
}
// click(event: Event) {
//     event.preventDefault();
//     this.currentIndex++;
//     this.changeSizesOfBoard();
//     this.changeSettingsLevel();
//   }
//   getElementSettings() {
//     let settings = document.querySelector(".settings");
//     if (!settings) throw new Error("Не найден элемент с классом .settings");
//     return settings;
//   }
//   changeSettingsLevel() {
//     if (this.currentIndex >= this.levels.length) this.currentIndex = 0;
//     console.log(this.settingsLevel, this.levels[this.currentIndex].name);
//     this.settingsLevel.innerHTML = this.levels[this.currentIndex].name;
//   }
//   changeSizesOfBoard() {
//     let width = this.levels[this.currentIndex].sizes.width;
//     let height = this.levels[this.currentIndex].sizes.height;
//     this.sapper.restart(width, height);
let settings = new Settings();
export { settings };
