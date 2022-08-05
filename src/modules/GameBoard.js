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
      this.ships.forEach((ship) => {
        if (hit === true) return;
        ship.coords.forEach((coord) => {
          if ([x, y] === coord) {
            ship.processHit();
            hit = true;
            return;
          }
        });
      });

      if (hit === false) {
        this.missed.push([x, y]);
      }
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

export { GameBoard }