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

test("Mark a ship coordinates as hit", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);
  let confirmHit = gameBoard.receiveAttack(0, 1);

  expect(confirmHit).toBe(true);
});

test("Do not mark as hit if already hit", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);
  gameBoard.receiveAttack(0, 1);
  let confirmHit = gameBoard.receiveAttack(0, 1);

  expect(confirmHit).toBe("Already hit");
});

test("Add to coordinates to missed if no ship in place", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);

  gameBoard.receiveAttack(0, 3);
  expect(gameBoard.missed.length).not.toBe(0);
});

