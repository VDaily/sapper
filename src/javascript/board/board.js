class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.arrayBoard = this.createBoardArray(width, height);
    }
    createBoardArray(x, y) {
        let board = [];
        for (let i = 0; i < y; i++) {
            let arr = [];
            for (let j = 0; j < x; j++) {
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
}
let width = 9;
let height = 9;
let board = new Board(width, height);
export { board };
