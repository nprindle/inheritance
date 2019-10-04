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
    //i know this is gross.
    let closure = this;
    UI.setRedrawFunction(function() {closure.redraw()});
    this.player.setDeathFunc(function() {
      closure.end();
    });
    this.enemy.setDeathFunc(function() {
      closure.end();
    });
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
      this.makeEnemyMove();
    }
  }

  makeEnemyMove(): void {
    let move = this.enemy.think(this.player);
    if (move === -1) {
      UI.fakeClick(this.enemyButtons[this.enemyButtons.length - 1]);
      return;
    } else {
      UI.fakeClick(this.enemyButtons[move]);
      let closure = this;
      window.setTimeout(function() {
        closure.makeEnemyMove();
      }, 750);
    }
  }

  endTurnButton(): HTMLElement {
    let closure = this;
    return UI.makeButton('End Turn', function() {closure.endTurn()}, !this.playersTurn, 'endturn');
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
