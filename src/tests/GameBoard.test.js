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

test("Add coordinates to missed if no ship in place", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);

  gameBoard.receiveAttack(0, 3);
  expect(gameBoard.missed.length).not.toBe(0);
});

test("Report if all ships sunk", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
  ]);

  gameBoard.receiveAttack(0, 1);
  expect(gameBoard.allSunk()).toBe(true);
});

test("Report if all ships not sunk", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);

  expect(gameBoard.allSunk()).toBe(false);
});

test("Report if a move is illegal: Already hit", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);

  gameBoard.receiveAttack(0, 1);
  expect(gameBoard.isIllegal(0, 1)).toBe(true);
});

test("Report if a move is illegal: Already missed", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);

  gameBoard.receiveAttack(0, 3);
  expect(gameBoard.isIllegal(0, 3)).toBe(true);
});

test("Report if a move is illegal: Out of bounds", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);

  expect(gameBoard.isIllegal(0, 11)).toBe(true);
});

test("Report if a move is Legal", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip([
    [0, 1],
    [0, 2],
  ]);

  expect(gameBoard.isIllegal(0, 9)).toBe(false);
});

