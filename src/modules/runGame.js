import { Player } from "./Player";
import { renderGame } from "./renderGame";

const runGame = (function () {
  let player;
  let computer;

  const initialize = function () {
    player = new Player();
    computer = new Player("comp");
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
    let winner = endGame();
    if (winner) {
      renderGame.endGame(winner);
    } else {
      gameLoop();
    }
  };

  const endGame = function () {
    let winner;
    if (player.myBoard.allSunk()) {
      winner = "Computer Wins! Better luck next time.";
    } else if (computer.myBoard.allSunk()) {
      winner = "Congratulations! You win.";
    } else winner = false;
    return winner;
  };

  return {
    initialize,
    gameLoop,
  };
})();

export { runGame };
