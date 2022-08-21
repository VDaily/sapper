import { board } from "../javascript/board/board.js";
import { placeMines } from "../javascript/mines/placeMines.js";
import { createTable } from "../javascript/table/table.js";

placeMines(board);
createTable(board);
