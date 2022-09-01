import { sapper } from "../../sapper.js";

function createMenu() {
  let menu = document.createElement("div");
  menu.classList.add("menu");

  let menuCountMines = createElementWithClass("div", "menu__countMines");
  let menuText = createElementWithClass("p", "menu__paragraph");
  menuText.innerHTML = "Флаги";
  let menuCount = createElementWithClass("p", "menu__span");
  menuCount.innerHTML = "0";
  menuCountMines.append(menuText, menuCount);

  let reload = createElementWithClass("div", "menu__reload");
  reload.addEventListener("click", function (event) {
    sapper.restart();
  });
  let reloadImg = createElementWithClass("div", "menu__img");
  reload.append(reloadImg);

  let timer = createElementWithClass("div", "menu__timer");
  let timerText = createElementWithClass("p", "menu__timer-paragraph");
  timerText.innerHTML = "Время";
  let timerSeconds = createElementWithClass("p", "menu__timer-seconds");
  timerSeconds.innerHTML = "0";
  timer.append(timerText, timerSeconds);

  menu.append(menuCountMines, reload, timer);
  return menu;
}
interface Timer {
  count: number;
  saveIndexTimeout: number;
}
class Timer {
  constructor() {
    this.count = 0;
    this.saveIndexTimeout;
  }
  startTimer() {
    let tic = this.tic.bind(this);
    this.saveIndexTimeout = setTimeout(tic, 1000);
  }
  finishTimer() {
    clearTimeout(this.saveIndexTimeout);
  }
  tic() {
    let timer = document.querySelector(".menu__timer-seconds");
    if (!timer) return;
    this.count++;
    timer.innerHTML = `${this.count}`;
    let tic = this.tic.bind(this);
    this.saveIndexTimeout = setTimeout(tic, 1000);
  }
}

function createElementWithClass(tag: string, className: string) {
  let div = document.createElement(tag);
  div.classList.add(className);
  return div;
}
function setInMenuCountFlags(count: number) {
  let menuCountMines = document.querySelector(".menu__span");
  if (!menuCountMines) throw new Error("Не найден элемент menu__span");
  menuCountMines.innerHTML = `${count}`;
}
export { createMenu, setInMenuCountFlags, Timer };
