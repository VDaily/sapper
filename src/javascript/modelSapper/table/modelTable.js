import { viewTable } from "../../viewSapper/table/viewTable.js";
import { model, Model } from "../model.js";
class ModelTable extends Model {
    constructor() {
        super();
        this.board = this.createTableArray();
    }
    createTableArray() {
        let board = [];
        let width = model.levels[model.currentIndex].sizes.width;
        let height = model.levels[model.currentIndex].sizes.height;
        console.log(width, height);
        for (let i = 0; i < height; i++) {
            let arr = [];
            for (let j = 0; j < width; j++) {
                let point = {
                    coordinates: [i, j],
                    isMine: false,
                };
                arr.push(point);
            }
            board.push(arr);
        }
        return board;
    }
    changeCreateTable() {
        this.board = this.createTableArray();
        viewTable.changeEvent();
    }
    getBoard() {
        return this.board;
    }
    removeDataOfTable(table) {
        table.innerHTML = "";
    }
}
let modelTable = new ModelTable();
export { modelTable };
