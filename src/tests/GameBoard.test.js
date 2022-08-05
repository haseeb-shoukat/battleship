import { GameBoard } from "../modules/GameBoard";

test("Place ship on board", () => {
  const gameBoard = GameBoard();
  let id = gameBoard.ships.length;
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);

  let exists = false;
  gameBoard.ships.forEach((ship) => {
    if (ship.id === id) {
      exists = true;
      return;
    }
  });

  expect(exists).toBe(true);
});


