function placeMines(board: object[]): void {
  let indexes = generationIndexes(board.length);
  indexes.forEach((index) => {
    board[index].isMine = true;
  });
  console.log(indexes);
}
function isFreely(indexes: number[], randomNumber: number): boolean {
  return indexes.includes(randomNumber);
}
function generationIndexes(length: number) {
  let numberOfMines = Math.ceil((length / 100) * 15);
  let randomNumber: number;
  let indexes: number[] = [];
  let max = length,
    min = 0;
  while (indexes.length < numberOfMines) {
    randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (!isFreely(indexes, randomNumber)) {
      indexes.push(randomNumber);
    }
  }
  return indexes;
}
export { placeMines };
