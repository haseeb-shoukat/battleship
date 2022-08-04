const Ship = function(length) {
    return {
        length,
        hit: [],
        sunk: false,
        processHit: function(coord) {
            if (this.hit.includes(coord)) return;
            else this.hit.push(coord)
        },
        isSunk: function() {
            (this.hit.length === this.length) ? true: false;
        },
    }
}

const GameBoard = function() {
    
}

