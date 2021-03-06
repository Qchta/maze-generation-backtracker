// Import stylesheets
import "./style.css";
import Stack from "ts-data.stack";

class Cell {
  constructor(
    public i: number,
    public j: number,
    public visited: boolean,
    public hasTopWall: boolean,
    public hasBottomWall: boolean,
    public hasRightWall: boolean,
    public hasLeftWall: boolean
  ) {}
}

var cells: Cell[][] = [];

for (let i = 0; i < 20; i++) {
  cells[i] = [];
  for (let j = 0; j < 20; j++) {
    cells[i][j] = {
      i: i,
      j: j,
      visited: false,
      hasTopWall: true,
      hasBottomWall: true,
      hasRightWall: true,
      hasLeftWall: true
    };
  }
}

function render() {
  const appDiv = document.getElementById("app");
  appDiv.innerHTML = "";

  for (let i = 0; i < 20; i++) {
    let row = document.createElement("div");
    row.setAttribute("class", "q-row");
    appDiv.appendChild(row);

    for (let j = 0; j < 20; j++) {
      let cell = document.createElement("div");
      cell.classList.add("q-cell");
      if (cells[i][j].hasTopWall) {
        cell.classList.add("q-top-wall");
      } else {
        cell.classList.add("q-top-no-wall");
      }
      if (cells[i][j].hasBottomWall) {
        cell.classList.add("q-bottom-wall");
      } else {
        cell.classList.add("q-bottom-no-wall");
      }
      if (cells[i][j].hasRightWall) {
        cell.classList.add("q-right-wall");
      } else {
        cell.classList.add("q-right-no-wall");
      }
      if (cells[i][j].hasLeftWall) {
        cell.classList.add("q-left-wall");
      } else {
        cell.classList.add("q-left-no-wall");
      }
      if (cells[i][j].visited) {
        cell.classList.add("q-visited");
      }
      row.appendChild(cell);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generate() {
  var stack = new Stack<Cell>();

  cells[0][0].visited = true;
  stack.push(cells[0][0]);

  while (!stack.isEmpty()) {
    let current = stack.pop();
    let i = current.i;
    let j = current.j;
    let neighbors = [];
    if ( cells[i - 1] !== undefined && cells[i - 1][j] !== undefined && !cells[i - 1][j].visited) {
      neighbors.push({ direction: "top", cell: cells[i - 1][j] });
    }
    if (cells[i + 1] !== undefined && cells[i + 1][j] !== undefined && !cells[i + 1][j].visited) {
      neighbors.push({ direction: "bottom", cell: cells[i + 1][j] });
    }
    if (cells[i][j + 1] !== undefined && !cells[i][j + 1].visited) {
      neighbors.push({ direction: "right", cell: cells[i][j + 1] });
    }
    if (cells[i][j - 1] !== undefined && !cells[i][j - 1].visited) {
      neighbors.push({ direction: "left", cell: cells[i][j - 1] });
    }
    
    if (neighbors.length > 0) {
      stack.push(current);
      let selected = neighbors[Math.floor(Math.random() * neighbors.length)];
      switch (selected.direction) {
        case "top":
          current.hasTopWall = false;
          selected.cell.hasBottomWall = false;
          break;
        case "bottom":
          current.hasBottomWall = false;
          selected.cell.hasTopWall = false;
          break;
        case "right":
          current.hasRightWall = false;
          selected.cell.hasLeftWall = false;
          break;
        case "left":
          current.hasLeftWall = false;
          selected.cell.hasRightWall = false;
          break;
      }
      selected.cell.visited = true;
      stack.push(selected.cell);
    }
    render();
    await sleep(10);
  }
}

generate();
// render();