import { Player } from "./Player";

const runGame = (function () {
  const boardOne = document.querySelector(".board-one");
  const boardTwo = document.querySelector(".board-two");
  const player = new Player();
  const computer = new Player("comp");

  const initialize = function () {
    player.setEnemy(computer);
    computer.setEnemy(player);

    
    for (let i = 0; i < 100; i++) {
      const item = document.createElement("div");
      item.classList.add("board-item");
      boardOne.appendChild(item);
      boardTwo.appendChild(item.cloneNode());
    }
  };

  const render = function () {};

  return {
    initialize,
  };
})();

export { runGame };
