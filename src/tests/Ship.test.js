import { Ship } from "../modules/Ship";

test("Adds coordinates to hit", () => {
  const ship = Ship(0, [
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
  let value = false;

  ship.processHit([0, 1]);
  ship.hit.forEach((arr) => {
    if (arr[0] === 0 && arr[1] === 1) {
      value = true;
      return;
    }
  });
  expect(value).toBe(true);
});

test("Reports if ship is sunk", () => {
  const ship = Ship(0, [[0, 1]]);

  ship.processHit([0, 1]);
  expect(ship.isSunk()).toBe(true);
});

test("Reports if ship is NOT sunk", () => {
  const ship = Ship(0, [[0, 1], [0, 2]]);

  ship.processHit([0, 1]);
  expect(ship.isSunk()).toBe(false);
});
