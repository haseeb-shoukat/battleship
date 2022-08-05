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
      return (this.hit.length === this.coords.length) ? true : false;
    },
  };
};

export { Ship };
