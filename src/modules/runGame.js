import { Player } from "./Player";
import { renderGame } from "./renderGame";

const runGame = (function () {
  const player = new Player();
  const computer = new Player("comp");

  const initialize = function () {
    player.setEnemy(computer);
    computer.setEnemy(player);
    player.setCurrent(true);
    placeShips();
  };

  const placeShips = function () {
    computer.compShips();
    renderGame.renderPlacingBoard(player);
  };

  const gameLoop = function () {
    renderGame.render(player, computer);

    if (player.currentTurn === true) {
      computer.myBoard.legalMoves.forEach((legalMove) => {
        document
          .querySelector(`.board-two > [data-coord="${legalMove.join("")}"]`)
          .addEventListener("click", processClick);
      });
      return;
    }

    processClick();
  };

  const processClick = function (e = "null") {
    if (player.currentTurn === true) {
      let [x, y] = e.target.dataset.coord.split("").map(Number);
      player.attack(x, y);
    } else {
      computer.compAttack();
    }
    gameLoop();
  };

  const endGame = function () {};

  return {
    initialize,
    gameLoop,
  };
})();

export { runGame };
