function createBoardArray(x, y) {
    let board = [];
    for (let i = 1; i <= y; i++) {
        for (let j = 1; j <= x; j++) {
            board.push({
                coordinates: [i, j],
                isMine: false,
            });
        }
    }
    return board;
}
class Board {
}
let board = createBoardArray(6, 6);
export { board };
