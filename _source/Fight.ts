/// <reference path="Player.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="UI.ts" />

class Fight {

  player: Player;
  enemy: Enemy;
  playersTurn: boolean;
  div: HTMLElement;

  constructor(p: Player, e: Enemy) {
    this.player = p;
    this.enemy = e;
    this.playersTurn = true;
    //i know this is gross.
    let closure = this;
    UI.setRedrawFunction(function() {closure.redraw()});
    this.draw();
  }

  endTurn(): void {
    this.playersTurn = !this.playersTurn;
    this.player.refresh();
    this.enemy.refresh();
    console.log('turn ended :)');
    UI.redraw();
  }

  endTurnButton(): HTMLElement {
    let closure = this;
    return UI.makeButton('End Turn', function() {closure.endTurn()}, false, 'endturn');
  }

  draw(): void {
    this.div = UI.makeDiv('arena');
    document.body.appendChild(this.div);
    this.redraw();
  }

  redraw(): void {
    this.div.innerHTML = '';
    this.div.appendChild(UI.renderCombatant(this.player, this.enemy, this.playersTurn));
    this.div.appendChild(UI.renderCombatant(this.enemy, this.player, !this.playersTurn));
    this.div.appendChild(this.endTurnButton());
  }

}
