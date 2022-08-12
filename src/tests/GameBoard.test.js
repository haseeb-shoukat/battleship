import { GameBoard } from "../modules/GameBoard";

test("Place ship on board", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    type: "Submarine",
    coords: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  });

  let exists = false;
  gameBoard.ships.forEach((ship) => {
    if (ship.info.type === "Submarine") {
      exists = true;
      return;
    }
  });

  expect(exists).toBe(true);
});

test("Mark a ship coordinates as hit", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  });
  let confirmHit = gameBoard.receiveAttack(0, 1);

  expect(confirmHit).toBe(true);
});

test("Add coordinates to missed if no ship in place", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [0, 1],
      [0, 2],
    ],
  });

  gameBoard.receiveAttack(0, 3);
  expect(gameBoard.missed.length).not.toBe(0);
});

test("Report if all ships sunk", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({ coords: [[0, 1]] });

  gameBoard.receiveAttack(0, 1);
  expect(gameBoard.allSunk()).toBe(true);
});

test("Report if all ships not sunk", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  });

  expect(gameBoard.allSunk()).toBe(false);
});

test("Report if a move is illegal: Already hit", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  });

  gameBoard.receiveAttack(0, 1);
  expect(gameBoard.isIllegal(0, 1)).toBe(true);
});

test("Report if a move is illegal: Already missed", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  });

  gameBoard.receiveAttack(0, 3);
  expect(gameBoard.isIllegal(0, 3)).toBe(true);
});

test("Report if a move is illegal: Out of bounds", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  });

  expect(gameBoard.isIllegal(0, 11)).toBe(true);
});

test("Report if a move is Legal", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
  });

  expect(gameBoard.isIllegal(0, 9)).toBe(false);
});

test("Ships cannot overlap each other", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    axis: "x",
  });

  expect(
    gameBoard.canPlaceShip([
      [0, 1],
      [0, 2],
      [0, 3],
    ]) ||
      gameBoard.canPlaceShip([
        [0, 3],
        [0, 4],
        [0, 5],
      ])
  ).toBe(false);
});

test("Two ships cannot be on top of each other", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    axis: "x",
  });

  gameBoard.placeShip({
    coords: [
      [2, 5],
      [3, 5],
      [4, 5],
    ],
    axis: "y",
  });

  expect(
    gameBoard.canPlaceShip([
      [1, 4],
      [1, 5],
      [1, 6],
    ]) ||
      gameBoard.canPlaceShip([
        [5, 5],
        [6, 5],
        [7, 5],
      ])
  ).toBe(false);
});

test("Two ships cannot be directly next to each other", () => {
  const gameBoard = GameBoard();
  gameBoard.placeShip({
    coords: [
      [1, 1],
      [1, 2],
      [1, 3],
    ],
    axis: "x",
  });

  gameBoard.placeShip({
    coords: [
      [2, 5],
      [3, 5],
      [4, 5],
    ],
    axis: "y",
  });

  expect(
    gameBoard.canPlaceShip([
      [2, 4],
      [2, 5],
      [2, 6],
    ]) ||
      gameBoard.canPlaceShip([
        [5, 4],
        [6, 4],
        [7, 4],
      ])
  ).toBe(false);
});

test("Ship cannot be placed outside board boundary", () => {
  const gameBoard = GameBoard();

  expect(
    gameBoard.canPlaceShip([
      [-1, 4],
      [-1, 5],
      [-1, 6],
    ]) ||
      gameBoard.canPlaceShip([
        [1, 8],
        [1, 9],
        [1, 10],
      ])
  ).toBe(false);
});

test("Ship can be placed in legal spots", () => {
  const gameBoard = GameBoard();

  expect(
    gameBoard.canPlaceShip([
      [1, 4],
      [1, 5],
    ]) &&
      gameBoard.canPlaceShip([
        [1, 7],
        [1, 8],
        [1, 9],
      ])
  ).toBe(true);
});
