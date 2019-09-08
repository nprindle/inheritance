abstract class AbstractEffect {
  next: AbstractEffect | null;

  constructor() {
    this.next = null;
  }

  activate(user: Combatant, foe: Combatant): void {
    this.effect(user, foe);
    if (typeof this.next === AbstractEffect) {
      this.next.activate(user, foe);
    }
  }

  abstract effect(user: Combatant, foe: Combatant): void;
}

class NothingEffect extends AbstractEffect { //does nothing
  effect(user: Combatant, foe: Combatant): void {
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
