import { Ship } from "../modules/Ship";

test("Adds coordinates to hit", () => {
  const ship = Ship(0, [
    [0, 1],
    [0, 2],
    [0, 3],
  ]);
  
  ship.processHit([0, 1]);
  expect(ship.contains([0, 1], "hit")).toBe(true);
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
