const renderGame = (function () {
  const boardOne = document.querySelector(".board-one");
  const boardTwo = document.querySelector(".board-two");

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const item = document.createElement("div");
      item.classList.add("board-item");
      item.dataset.coord = [x, y].join("");
      boardOne.appendChild(item);
      boardTwo.appendChild(item.cloneNode());
    }
  }

  const render = function (p1, p2) {
    renderPlayer(p1);
    renderPlayer(p2);
  };

  const renderPlayer = function (player) {
    let num;
    if (player.id === "player") {
      num = "one";
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

  return {
    render,
  };
})();

export { renderGame };
