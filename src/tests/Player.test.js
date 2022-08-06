import { Player } from "../modules/Player"

test("Set player enemy", () => {
    const player = new Player();
    const enemy = new Player("comp");
    player.setEnemy(enemy);
    expect(player.enemy).toBe(enemy)
})

test("Attack enemy", () => {
    const player = new Player();
    const enemy = new Player("comp");
    player.setEnemy(enemy);
    player.attack(0, 1)
    expect(enemy.myBoard.isIllegal(0, 1)).toBe(true)
})

test("Attack enemy (Computer player)", () => {
    const player = new Player();
    const enemy = new Player("comp");
    enemy.setEnemy(player);
    enemy.compAttack()
    expect(player.myBoard.legalMoves.length).toBe(80)
})