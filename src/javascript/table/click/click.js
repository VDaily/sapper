let table = document.querySelector(".board");
table?.addEventListener("click", (event) => {
    if (isHit(board))
        console.log("Boom");
});
function isHit(board) {
    return true;
}
import { board } from "../../board/board.js";
