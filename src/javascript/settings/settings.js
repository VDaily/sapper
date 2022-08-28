import { Board } from "../board/board";
class Settings {
    constructor() {
        this.levels = {
            1: new Board(9, 9),
            2: new Board(15, 15),
            3: new Board(20, 20),
            4: new Board(30, 30),
        };
    }
}
