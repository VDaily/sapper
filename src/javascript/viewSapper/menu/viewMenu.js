import { modelMenu } from "../../modelSapper/menu/modelMenu.js";
class ViewMenu {
    constructor() {
        this.currentLevel = modelMenu.getCurrentLevel();
        this.countFlags = this.currentLevel.countMines;
        this.render();
        let timerElement = document.querySelector(".menu__timer-seconds");
        if (!timerElement)
            throw new Error("Не найден элемент с классом .menu__timer-seconds в viewMenu");
        let menuSpan = document.querySelector(".menu__span");
        if (!menuSpan)
            throw new Error("Не найден элемент с классом .menu__span в viewMenu");
        this.timerElement = timerElement;
        this.menuSpan = menuSpan;
    }
    info(nameEvents) {
        this.currentLevel = modelMenu.getCurrentLevel();
        if (nameEvents === "flags") {
            this.changeCountFlags();
        }
        else if (nameEvents === "timer") {
            this.changeNumberOfSeconds();
        }
        else {
            this.changeCountFlags();
            this.changeNumberOfSeconds();
        }
    }
    changeNumberOfSeconds() {
        this.timerElement.innerHTML = `${modelMenu.getCountTimer()}`;
    }
    changeCountFlags() {
        this.menuSpan.innerHTML = `${modelMenu.getCountFlags()}`;
    }
    createMenu() {
        let html = `
      <div class="menu">
        <div class="menu__countMines">
          <div class="menu__paragraph">Флаги</div>
          <div class="menu__span">${this.countFlags}</div>
        </div>
        
        <div class="menu__reload">
          <div class="menu__img"></div>
        </div>

        <div class="menu__timer">
          <p class="menu__timer-paragraph">Время</p>
          <p class="menu__timer-seconds">0</p>
        </div>

      </div>
    `;
        return html;
    }
    render() {
        let htmlMenu = this.createMenu();
        let boardInfo = document.querySelector(".board__info");
        let board = document.querySelector(".board");
        if (!board)
            throw new Error("Не удалось найти элемент с классом .board в файле viewSettings");
        if (!boardInfo)
            throw new Error("Не найден элемент в viewMenu с классом .board__info");
        boardInfo.insertAdjacentHTML("beforeend", htmlMenu);
        board.append(boardInfo);
    }
}
let viewMenu = new ViewMenu();
export { viewMenu };
