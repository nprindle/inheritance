abstract class AbstractEffect {
  next: AbstractEffect | null;
  abstract activate(user: Combatant, foe: Combatant): void;
}

class NothingEffect extends AbstractEffect { //does nothing
  activate(user: Combatant, foe: Combatant): void {
    return;
  }
}

class CombinationEffect extends AbstractEffect { //combine multiple effects

  effects: AbstractEffect[];

  constructor(...effects: AbstractEffect[]) {
    this.effects = effects;
  }

  activate(user: Combatant, foe: Combatant): void {
    for (let i = 0; i < this.effects.length; i++) {
      this.effects[i].activate(user, foe);
    }
  }

}
