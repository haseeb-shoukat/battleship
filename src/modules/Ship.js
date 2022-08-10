const Ship = function (info) {
  return {
    info,
    hit: [],
    processHit: function (coord) {
      this.hit.push(coord);
    },
    isSunk: function () {
      return this.hit.length === this.info.length ? true : false;
    },
    contains: function ([i, j], obj) {
      let compare = false
      this[obj].forEach(([x, y]) => {
        if (x === i && y === j) {
          compare = true;
          return;
        }
      });
      return compare
    },
  };
};

export { Ship };
