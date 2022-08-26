function countFlags(count) {
  let countFlags = count;

  return function flags(cell) {
    cell.td.classList.add("board__cell_flag");
    let menuFlags = document.querySelector(".menu__span");
    console.log(menuFlags);
    if (countFlags <= 0) return;
    menuFlags.innerHTML = --countFlags;
  };
}
class Flags {
  constructor(countFlags) {
    this.countFlags = countFlags;
    this.menuFlags = document.querySelector(".menu__span");
  }
  putAFlag(cell) {
    cell.td.classList.add("board__cell_flag");
    if (this.countFlags <= 0) return;
    this.menuFlags.innerHTML = --this.countFlags;
  }
  deleteAFlag(cell) {
    cell.td.classList.remove("board__cell_flag");
    this.menuFlags.innerHTML = ++this.countFlags;
  }
}
export { Flags };
