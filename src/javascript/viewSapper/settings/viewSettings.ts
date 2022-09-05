import { modelSettings } from "../../modelSapper/settings/modelSettings.js";
import { settings } from "../../settings/settings.js";

interface Level {
  name: string;
  sizes: {
    width: number;
    height: number;
  };
  countMines: number;
}
[];

interface ViewSapperSettings {
  name: string;
  settingsLevel: HTMLElement;
}
class ViewSapperSettings {
  constructor() {
    this.name = modelSettings.getCurrentName();
    // this.createSettings();
    this.renderSettings();
  }
  changeEvent() {
    this.name = modelSettings.getCurrentName();

    this.changeLevel();
    console.log(this.name);
  }
  changeLevel() {
    let settingsLevel = document.querySelector(".settings__level");
    if (!settingsLevel)
      throw new Error(
        "Не найден элемент в viewSettings с классом settings__level"
      );
    settingsLevel.innerHTML = this.name;
  }
  createSettings() {
    let htmlSettings = `
      <div class="board__info">
        <div class="settings">
          <p class="settings__title">Уровень:</p>
          <p class="settings__level">${this.name}</p>
        </div>
      </div>
    `;

    return htmlSettings;
  }
  renderSettings() {
    let board = document.querySelector(".board");
    if (!board)
      throw new Error(
        "Не удалось найти элемент с классом .board в файле viewSettings"
      );
    let htmlSettings = this.createSettings();
    board.insertAdjacentHTML("afterbegin", htmlSettings);
  }
}

let viewsSettings = new ViewSapperSettings();

export { viewsSettings };
