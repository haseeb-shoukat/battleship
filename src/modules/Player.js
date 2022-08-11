import { GameBoard } from "./GameBoard";

class Player {
  constructor(id = "player") {
    this.myBoard = GameBoard();
    this.enemy;
    this.id = id;
    this.currentTurn = false;
  }

  setEnemy(player) {
    this.enemy = player;
  }

  setCurrent(turn) {
    this.currentTurn = turn;
  }

  attack(x, y) {
    return this.enemy.receive(x, y);
  }

  compShips() {
    if (this.id !== "comp") return;
    this.myBoard.automaticShips();
  }

  compAttack() {
    if (this.id !== "comp") return;
    let legalMoves = this.enemy.myBoard.legalMoves;
    let [x, y] = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    return this.enemy.receive(x, y);
  }

  receive(x, y) {
    if (this.myBoard.isIllegal(x, y)) return "Illegal Move";
    let hit = this.myBoard.receiveAttack(x, y);
    if (hit !== true) {
      this.currentTurn = true;
      this.enemy.setCurrent(false);
    }
    return 
  }
}

export { Player };
