interface Flags {
  countFlags: number;
  menuFlags: Element;
}
class Flags {
  constructor(countFlags: number) {
    this.countFlags = countFlags;
    let menuFlagsElem = document.querySelector(".menu__span");
    if (!menuFlagsElem)
      throw new Error("Не найден элемент с классом menu__span");
    this.menuFlags = menuFlagsElem;
  }
  putAFlag(cell: any) {
    cell.td.classList.add("board__cell_flag");
    if (this.countFlags <= 0) return;
    this.menuFlags.innerHTML = `${--this.countFlags}`;
  }
  deleteAFlag(cell: any) {
    cell.td.classList.remove("board__cell_flag");
    this.menuFlags.innerHTML = `${++this.countFlags}`;
  }
}
export { Flags };
