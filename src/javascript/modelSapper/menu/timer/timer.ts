import { modelMenu } from "../modelMenu.js";

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
    let tic = this.tic.bind(this);
    modelMenu.changeMenu("timer");
    this.saveTimer();
    this.saveIndexTimeout = setTimeout(tic, 1000);
  }
  getCount() {
    return this.count;
  }
  setCount(numberOfSeconds: number) {
    this.count = numberOfSeconds;
  }
  saveTimer() {
    let numberOfSeconds = JSON.stringify(this.getCount());
    localStorage.setItem("timer", numberOfSeconds);
  }
  reload() {
    this.finishTimer();
    let timer = document.querySelector(".menu__timer-seconds");
    if (!timer) return;
    this.count = 0;
    timer.innerHTML = `${this.count}`;
  }
}
let timer = new Timer();
export { timer };
