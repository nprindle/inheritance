abstract class AbstractEffect {

  activate(user: Combatant, foe: Combatant): void {
    this.effect(user, foe);
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
    super();
    this.effects = effects;
  }

  effect(user: Combatant, foe: Combatant): void {
    for (let i = 0; i < this.effects.length; i++) {
      this.effects[i].activate(user, foe);
    }
  }

}

class RepeatingEffect extends AbstractEffect {

  times: number;

  constructor(times: number) {
    super();
    this.times = times;
  }

  effect(user: Combatant, foe: Combatant): void {
    if (this.next instanceof AbstractEffect) {
      for (let i = 0; i < this.times - 1; i++) {
        this.next.activate(user, foe);
      }
    }
  }

}

class AppendingEffect extends AbstractEffect {

  text: string;

  constructor(text: string) {
    super();
    this.text = text;
  }

  effect(user: Combatant, foe: Combatant): void {
    document.body.appendChild(document.createTextNode(this.text));
  }

}
