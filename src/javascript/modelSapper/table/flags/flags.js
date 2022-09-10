import { model } from "../../model.js";
class Flags {
    constructor() {
        this.countFlags = model.levels[model.currentIndex].countMines;
        // let menuFlagsElem = document.querySelector(".menu__span");
        // if (!menuFlagsElem)
        //   throw new Error("Не найден элемент с классом menu__span");
        // this.menuFlags = menuFlagsElem;
    }
    setCountFlags(numberOfFlags) {
        this.countFlags = numberOfFlags;
    }
    getCountFlags() {
        return this.countFlags;
    }
    putAFlag(cell) {
        if (this.countFlags <= 0)
            return;
        this.countFlags--;
        // this.menuFlags.innerHTML = `${this.countFlags}`;
    }
    deleteAFlag(cell) {
        this.countFlags++;
        // cell.td.classList.remove("board__cell_flag");
        // this.menuFlags.innerHTML = `${++this.countFlags}`;
    }
}
let flags = new Flags();
export { flags };
