const Ship = function (id, coords) {
  return {
    id,
    coords,
    hit: [],
    processHit: function (coord) {
      this.hit.push(coord);
    },
    isSunk: function () {
      return this.hit.length === this.coords.length ? true : false;
    },
    contains: function (arr, obj) {
      let compare = false
      this[obj].forEach((coord) => {
        if (coord[0] === arr[0] && coord[1] === arr[1]) {
          compare = true;
          return;
        }
      });
      return compare
    },
  };
};

export { Ship };
