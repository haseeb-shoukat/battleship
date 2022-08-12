import { runGame } from "./runGame";

const renderGame = (function () {
  const initialize = function () {
    let html = `<div class="main-title">Battleship</div>
    <div class="board">
        <div class="board-one"></div>
    </div>
    <div class="board">
        <div class="board-two"></div>
    </div>
    <div class="overlay">
        <div class="card">
            <div class="card-heading">Welcome to Battleship!</div>
            <div class="card-text"></div>
            <button class="rotate-btn">Rotate</button>
            <div class="placing-board"></div>
        </div>
    </div>`;

    document.body.innerHTML = html;
    initializeVariables();

    rotateBtn.addEventListener("click", (e) => {
      axis === "y" ? (axis = "x") : (axis = "y");
    });

    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const item = document.createElement("div");
        item.classList.add("board-item");
        item.dataset.coord = [y, x].join("");
        boardOne.appendChild(item);
        boardTwo.appendChild(item.cloneNode());
      }
    }
  };

  const initializeVariables = function () {
    window.boardOne = document.querySelector(".board-one");
    window.boardTwo = document.querySelector(".board-two");
    window.placingBoard = document.querySelector(".placing-board");
    window.rotateBtn = document.querySelector(".rotate-btn");
    window.freshCoords = [];
    window.axis = "x";
  };

  const loadPlacingBoard = function (p1) {
    placingBoard.innerHTML = "";
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        const item = document.createElement("div");
        item.classList.add("board-item", "invalid-placement");
        item.dataset.coord = [y, x].join("");
        placingBoard.appendChild(item);
      }
    }
    p1.myBoard.legalPlacements.forEach(([x, y]) => {
      const item = document.querySelector(
        `.placing-board > [data-coord="${x}${y}"`
      );
      item.classList.remove("invalid-placement");
    });

    p1.myBoard.ships.forEach((ship) => {
      ship.coords.forEach(([x, y]) => {
        const item = document.querySelector(
          `.placing-board > [data-coord="${x}${y}"`
        );
        item.classList.remove("invalid-placement");
        item.classList.add("ship");
      });
    });
  };

  const renderPlacingBoard = function (p1) {
    initialize();
    placeShip(p1, 0);
  };

  const placeShip = function (p1, index) {
    loadPlacingBoard(p1);
    const boardItems = document.querySelectorAll(
      ".placing-board > .board-item"
    );
    const cardText = document.querySelector(".card-text");
    const type = p1.myBoard.types[index];
    cardText.textContent = `Place your ${type.type}`;

    boardItems.forEach((item) => {
      item.addEventListener(
        "mouseover",
        handleMouseOver.bind(null, item, type, p1)
      );
      item.addEventListener("mouseout", handleMouseOut);
      item.addEventListener("click", handleClick.bind(null, p1, type, index));
    });
  };

  const handleMouseOver = function (item, type, p1) {
    const [x, y] = item.dataset.coord.split("").map(Number);
    let coords = [];
    if (axis === "y") {
      for (let i = x; i < x + type.len; i++) {
        coords.push([i, y]);
      }
    } else {
      for (let i = y; i < y + type.len; i++) {
        coords.push([x, i]);
      }
    }
    if (p1.myBoard.canPlaceShip(coords)) {
      coords.forEach(([i, y]) => {
        document
          .querySelector(`.placing-board > [data-coord="${[i, y].join("")}"]`)
          .classList.add("hover");
      });
      freshCoords = coords;
    } else {
      let [x, y] = coords[0];
      document
        .querySelector(`.placing-board > [data-coord="${[x, y].join("")}"]`)
        .classList.add("invalid-hover");
      freshCoords = [];
    }
  };

  const handleMouseOut = function (e) {
    document
      .querySelectorAll(".hover")
      .forEach((item) => item.classList.remove("hover"));
    document
      .querySelectorAll(".invalid-hover")
      .forEach((item) => item.classList.remove("invalid-hover"));
  };

  const handleClick = function (p1, type, index) {
    if (!p1.myBoard.canPlaceShip(freshCoords)) return;

    p1.myBoard.placeShip({
      coords: freshCoords,
      axis,
    });

    if (type.type === "Patrol Boat") {
      document.querySelector(".overlay").remove();
      runGame.gameLoop();
    } else {
      placeShip(p1, index + 1);
    }
  };

  const render = function (p1, p2) {
    renderPlayer(p1);
    renderPlayer(p2);
  };

  const renderPlayer = function (player) {
    let num;
    if (player.id === "player") {
      num = "one";
      player.myBoard.ships.forEach((ship) => {
        ship.coords.forEach((coord) => {
          document
            .querySelector(`.board-${num} > [data-coord="${coord.join("")}"]`)
            .classList.add("ship");
        });
      });
    } else {
      num = "two";
    }

    player.myBoard.missed.forEach((miss) => {
      document
        .querySelector(`.board-${num} > [data-coord="${miss.join("")}"]`)
        .classList.add("missed");
    });

    player.myBoard.ships.forEach((ship) => {
      ship.hit.forEach((hit) => {
        document
          .querySelector(`.board-${num} > [data-coord="${hit.join("")}"]`)
          .classList.add("hit");
      });
    });
  };

  const endGame = function (winner) {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.innerHTML = `
    <div class="overlay">
        <div class="end-card">
            <div class="card-heading">${winner}</div>
            <button class="restart-btn">Play Again</button>
        </div>
    </div>`;
    document.body.appendChild(overlay);
    document.querySelector(".restart-btn").addEventListener("click", restart);
  };

  const restart = function () {
    document.body.innerHTML = "";
    runGame.initialize();
  };

  return {
    render,
    renderPlacingBoard,
    endGame,
  };
})();

export { renderGame };
