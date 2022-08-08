import { Player } from "./Player";

const runGame = (function () {
  const boardOne = document.querySelector(".board-one");
  const boardTwo = document.querySelector(".board-two");
  const player = new Player();
  const computer = new Player("comp");
  let currentTurn = player;

  const initialize = function () {
    player.setEnemy(computer);
    computer.setEnemy(player);

    player.myBoard.legalMoves.forEach((coord) => {
      const item = document.createElement("div");
      item.classList.add("board-item");
      item.dataset.coord = coord.join("");
      boardOne.appendChild(item);
      boardTwo.appendChild(item.cloneNode());
    });

    gameLoop();
  };

  const gameLoop = function () {
    render();
    if (currentTurn === player) {
      computer.myBoard.legalMoves.forEach((legalMove) => {
        document
          .querySelector(`.board-two > [data-coord="${legalMove.join("")}"]`)
          .addEventListener("click", processClick);
      });
      return;
    }

    processClick();
  };

  const endGame = function () {};

  const render = function () {
    renderMisses();
    renderHits();
  };

  const processClick = function (e = "null") {
    let status;
    if (currentTurn === player) {
      let [x, y] = e.target.dataset.coord.split("").map(Number);
      status = player.attack(x, y);
      if (status === false) currentTurn = computer;
    } else {
      status = computer.compAttack();
      if (status === false) currentTurn = player;
    }

    gameLoop();
  };

  const renderMisses = function () {
    const renderMiss = function (p, num) {
      p.myBoard.missed.forEach((miss) => {
        document
          .querySelector(`.board-${num} > [data-coord="${miss.join("")}"]`)
          .classList.add("missed");
      });
    };

    renderMiss(player, "one");
    renderMiss(computer, "two");
  };

  const renderHits = function () {
    const renderHit = function (p, num) {
      p.myBoard.ships.forEach((ship) => {
        ship.hit.forEach((hit) => {
          document
            .querySelector(`.board-${num} > [data-coord="${hit.join("")}"]`)
            .classList.add("hit");
        });
      });
    };

    renderHit(player, "one");
    renderHit(computer, "two");
  };

  return {
    initialize,
  };
})();

export { runGame };
