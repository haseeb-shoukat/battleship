import { Ship } from "./Ship";

const GameBoard = function () {
  return {
    ships: [],
    missed: [],
    takenCoords: [],

    placeShip: function (coords) {
      this.ships.push(Ship(this.ships.length, coords));
    },

    receiveAttack: function (x, y) {
      let hit = false;
      this.ships.every((ship) => {
        if (ship.contains([x, y], "coords")) {
          if (ship.contains([x, y], "hit")) {
            hit = "Already hit";
          } else {
            ship.processHit([x, y]);
            hit = true;
          }

          return false;
        }
        return true;
      });

      if (hit === false) this.missed.push([x, y]);
      return hit;
    },

    allSunk: function () {
      this.ships.forEach((ship) => {
        if (ship.sunk === false) {
          return false;
        }
      });

      return true;
    },
  };
};

export { GameBoard };
