/// <reference path="Player.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="UI.ts" />

class Fight {

  player: Player;
  enemy: Enemy;
  playersTurn: boolean;
  div: HTMLElement;
  enemyButtons: HTMLElement[];

  constructor(p: Player, e: Enemy) {
    this.player = p;
    p.refresh();
    this.enemy = e;
    e.refresh();
    this.playersTurn = true;
    this.enemyButtons = [];
    UI.setRedrawFunction(() => { this.redraw(); });
    this.player.setDeathFunc(() => { this.end(); });
    this.enemy.setDeathFunc(() => { this.end(); });
    this.draw();
  }

  endTurn(): void {
    this.playersTurn = !this.playersTurn;
    this.player.refresh();
    this.enemy.refresh();
    console.log('turn ended :)');
    this.enemyButtons = [];
    UI.redraw();
    if (!this.playersTurn) {
      let enemyMoveSequence = AI.bestMoveSequence(this.enemy, this.player, 2000);
      this.makeNextEnemyMove(enemyMoveSequence);
    }
  }

  makeNextEnemyMove(moveSequence: number[]): void {
    if(moveSequence.length <= 0) {
      UI.fakeClick(this.enemyButtons[this.enemyButtons.length - 1]);
      return;
    } else {
      let move = moveSequence.shift();
      console.log("Move: " + move);
      UI.fakeClick(this.enemyButtons[move]);
      window.setTimeout(() => {
        this.makeNextEnemyMove(moveSequence);
      }, 750);
    }
  }

  endTurnButton(): HTMLElement {
    return UI.makeButton('End Turn', () => { this.endTurn(); }, !this.playersTurn, 'endturn');
  }

  draw(): void {
    this.div = UI.makeDiv('arena');
    document.body.appendChild(this.div);
    this.redraw();
  }

  redraw(): void {
    this.div.innerHTML = '';
    this.div.appendChild(UI.renderCombatant(this.player, this.enemy, this.playersTurn));
    this.div.appendChild(UI.renderCombatant(this.enemy, this.player, false, this.enemyButtons));
    let etb = this.endTurnButton();
    this.div.appendChild(etb);
    this.enemyButtons.push(etb);
  }

  end(): void {
    document.body.removeChild(this.div);
    moveOn();
  }

}
