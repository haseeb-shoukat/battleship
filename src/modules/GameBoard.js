import { Ship } from "./Ship";

const GameBoard = function () {
  let legalMoves = [];
  let legalPlacements = [];
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      legalMoves.push([x, y]);
      legalPlacements.push([x, y]);
    }
  }

  return {
    ships: [],
    missed: [],
    types: [
      { type: "Carrier", len: 5 },
      { type: "Battleship", len: 4 },
      { type: "Destroyer", len: 3 },
      { type: "Submarine", len: 3 },
      { type: "Patrol Boat", len: 2 },
    ],
    legalPlacements,
    legalMoves,

    placeShip: function (info) {
      this.ships.push(Ship(info));
      this.updateLegalPlacements(info);
    },

    canPlaceShip: function (coords) {
      return coords.every((coord) => {
        return legalMoves.some((legalMove) => {
          return JSON.stringify(coord) === JSON.stringify(legalMove);
        });
      });
    },

    updateLegalPlacements: function (info) {
      let list = JSON.parse(JSON.stringify(info.coords));
      let [a, b] = info.coords[0];
      let [y, z] = info.coords[info.coords.length - 1];

      if (info.axis === "x") {
        list.push([a - 1, b], [y + 1, z]);
        info.coords.forEach(([x, y]) => {
          list.push([x, y - 1], [x, y + 1]);
        });
      } else {
        list.push([a, b - 1], [y, z + 1]);
        info.coords.forEach(([x, y]) => {
          list.push([x - 1, y], [x + 1, y]);
        });
      }

      let arr = this.legalPlacements.filter((coord) => {
        return list.every(
          (item) => JSON.stringify(coord) !== JSON.stringify(item)
        );
      });

      this.legalPlacements = arr;
    },

    receiveAttack: function (x, y) {
      let hit = false;
      this.ships.every((ship) => {
        if (ship.contains([x, y], "coords")) {
          ship.processHit([x, y]);
          hit = true;
          return false;
        }
        return true;
      });

      if (hit === false) this.missed.push([x, y]);
      this.updateLegal(x, y);
      return hit;
    },

    allSunk: function () {
      return this.ships.every((ship) => {
        return ship.isSunk();
      });
    },

    updateLegal: function (x, y) {
      let arr = this.legalMoves.filter(
        (coord) => JSON.stringify(coord) !== JSON.stringify([x, y])
      );

      this.legalMoves = arr;
    },

    isIllegal: function (x, y) {
      return this.legalMoves.every((coord) => {
        return JSON.stringify(coord) !== JSON.stringify([x, y]);
      });
    },
  };
};

export { GameBoard };
