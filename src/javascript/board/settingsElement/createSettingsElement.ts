import { settings } from "../../settings/settings.js";

function createSettings() {
  let elementSettings = document.createElement("div");
  let settingsTitle = document.createElement("p");
  let settingsLevel = document.createElement("p");

  elementSettings.classList.add("settings");
  settingsTitle.classList.add("settings__title");
  settingsLevel.classList.add("settings__level");

  settingsLevel.innerHTML = settings.levels[settings.currentIndex].name;

  settingsLevel.addEventListener("click", function (event) {
    settings.toSwitchLevel();
    console.log(123);
  });
  settingsTitle.innerHTML = "Уровень: ";

  elementSettings.append(settingsTitle, settingsLevel);
  return elementSettings;
}

export { createSettings };
