const Ship = function (info) {
  return {
    info,
    coords: info.coords,
    hit: [],
    processHit: function (coord) {
      this.hit.push(coord);
    },
    isSunk: function () {
      return this.hit.length === this.coords.length ? true : false;
    },
    contains: function (coord, obj) {
      return this[obj].some(
        (item) => JSON.stringify(item) === JSON.stringify(coord)
      );
    },
  };
};

export { Ship };
