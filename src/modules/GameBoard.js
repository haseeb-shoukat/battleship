import { Ship } from "./Ship";

const GameBoard = function () {
  let legalMoves = [];
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      legalMoves.push([x, y]);
    }
  }

  return {
    ships: [],
    missed: [],
    legalMoves,

    placeShip: function (coords) {
      this.ships.push(Ship(this.ships.length, coords));
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
      updateLegal(x, y);
      return hit;
    },

    allSunk: function () {
      return this.ships.every((ship) => {
        if (ship.isSunk() === false) {
          return false;
        }
        return true;
      });
    },

    updateLegal: function (x, y) {
      let arr = this.legalMoves.filter(
        (coord) => JSON.stringify(coord) !== JSON.stringify([x, y])
      );

      this.legalMoves = arr;
    },

    isIllegal: function(x, y) {
      return legalMoves.some(coord => {
        return JSON.stringify(coord) === JSON.stringify([x, y]);
      })
    }
  };
};

export { GameBoard };
