function placeMines(board) {
    let indexes = generationIndexes(board.length);
    indexes.forEach((index) => {
        board[index].isMine = true;
    });
    console.log(indexes);
}
function isFreely(indexes, randomNumber) {
    return indexes.includes(randomNumber);
}
function generationIndexes(length) {
    let numberOfMines = Math.ceil((length / 100) * 15);
    let randomNumber;
    let indexes = [];
    let max = length, min = 0;
    while (indexes.length < numberOfMines) {
        randomNumber = Math.floor(Math.random() * (max - min)) + min;
        if (!isFreely(indexes, randomNumber)) {
            indexes.push(randomNumber);
        }
    }
    return indexes;
}
export { placeMines };
