import { modelRating } from "../model/modelRating.js";

interface ViewRating {
  boardTable: Element;
  table: HTMLTableElement;
  level: Element;
}
class ViewRating {
  constructor() {
    this.render();
  }

  createTableRating() {
    this.boardTable = document.createElement("div");
    this.boardTable.className = "rating";

    this.table = document.createElement("table");
    this.table.className = "rating__table";

    this.level = document.createElement("p");
    this.level.innerHTML = `${modelRating.getLevel()}`;
    this.level.className = "rating__level";

    let cellTitle = ["Место", "Имя", "Время"];
    for (let i = 0, max = 10; i < max; i++) {
      let tr = document.createElement("tr");
      tr.className = "rating__row";
      for (let j = 0, maxCell = 2; j <= maxCell; j++) {
        let element: Element;
        if (i === 0) {
          element = document.createElement("th");
          element.className = "rating__cell-title";
          console.log(j, cellTitle[j]);
          element.innerHTML = cellTitle[j];
        } else {
          element = document.createElement("td");
          element.className = "rating__cell";
        }
        console.log(element);
        tr.append(element);
      }
      this.table.append(tr);
    }
    console.log(this.table);
    this.boardTable.append(this.level, this.table);
  }
  render() {
    this.createTableRating();

    document.body.append(this.boardTable);
  }
}

let viewRating = new ViewRating();

export { viewRating };
