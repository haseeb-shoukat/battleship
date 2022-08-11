const renderGame = (function () {
  const boardOne = document.querySelector(".board-one");
  const boardTwo = document.querySelector(".board-two");
  const placingBoard = document.querySelector(".placing-board");

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const item = document.createElement("div");
      item.classList.add("board-item");
      item.dataset.coord = [x, y].join("");
      boardOne.appendChild(item);
      boardTwo.appendChild(item.cloneNode());
      placingBoard.appendChild(item.cloneNode());
    }
  }

  const renderPlacingBoard = function (p1) {
    const boardItems = document.querySelectorAll(
      ".placing-board > .board-item"
    );
    const rotateBtn = document.querySelector(".rotate-btn");
    const cardText = document.querySelector(".card-text");

    p1.myBoard.types.forEach((type) => {
      let axis = "y";
      cardText.textContent = `Place your ${type.type}`;
      rotateBtn.addEventListener("click", (e) => {
        axis === "y" ? (axis = "x") : (axis = "y");
      });
      boardItems.forEach((item) => {
        item.addEventListener("mouseover", (e) => {
          const [x, y] = item.dataset.coord.split("").map(Number);
          let coords = [];
          if (axis === "x") {
            for (let i = x; i < x + type.len; i++) {
              // document
              //   .querySelector(`.placing-board > [data-coord="${[i, y].join("")}"]`)
              //   .classList.add("hover");
              coords.push([i, y]);
            }
          } else {
            for (let i = y; i < y + type.len; i++) {
              // document
              // //   .querySelector(`.placing-board > [data-coord="${[x, i].join("")}"]`)
              // //   .classList.add("hover");
              coords.push([x, i]);
            }
          }
        });
        item.addEventListener("mouseout", (e) => {
          document
            .querySelectorAll(".hover")
            .forEach((item) => item.classList.remove("hover"));
        });
      });
    });
  };

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
    renderPlacingBoard,
  };
})();

export { renderGame };
