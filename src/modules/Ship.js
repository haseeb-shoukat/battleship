const Ship = function (id, coords) {
  return {
    id,
    coords,
    hit: [],
    sunk: false,
    processHit: function (coord) {
      this.hit.push(coord);
    },
    isSunk: function () {
      return this.hit.length === this.coords.length ? true : false;
    },
    isHit: function (x, y) {
      return this.hits.forEach((coords) => {
        coords.forEach((coord) => {
          if (coord[0] === x && coord[1] === y) {
            return true;
          }
        });
        return false;
      });
    },
  };
};

export { Ship };
