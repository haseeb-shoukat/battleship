import { GameBoard } from "./GameBoard";

class Player {
  constructor(id = "player") {
    this.myBoard = GameBoard();
    this.enemy;
    this.id = id;
  }

  setEnemy(player) {
    this.enemy = player;
  }

  attack(x, y) {
    this.enemy.receive(x, y);
  }

  compAttack() {
    if (this.id !== "comp") return;
    let legalMoves = this.enemy.myBoard.legalMoves;
    let [x, y] = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    this.enemy.receive(x, y);
  }

  receive(x, y) {
    if (this.myBoard.isIllegal(x, y)) return "Illegal Move";
    this.myBoard.receiveAttack(x, y);
  }
}

export { Player };
