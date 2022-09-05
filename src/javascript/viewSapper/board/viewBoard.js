class viewsBoard {
    constructor() {
        this.renderBoard();
    }
    createBoard() {
        let board = document.createElement("div");
        board.classList.add("board", "board_startGame");
        return board;
    }
    renderBoard() {
        let board = this.createBoard();
        document.body.append(board);
    }
}
let board = new viewsBoard();
export { board };
