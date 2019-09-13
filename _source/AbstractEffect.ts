abstract class AbstractEffect {

  activate(user: Combatant, foe: Combatant): void {
    this.effect(user, foe);
  }

  abstract effect(user: Combatant, foe: Combatant): void;

  abstract toString(): string;

}

class NothingEffect extends AbstractEffect { //does nothing
  effect(user: Combatant, foe: Combatant): void {
    return;
  }

  toString(): string {
    return 'do nothing';
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

  toString(): string {
    let acc = [];
    for (let i = 0; i < this.effects.length; i++) {
      acc.push(this.effects[i].toString());
    }
    return acc.join(' ');
  }

}

class RepeatingEffect extends AbstractEffect {

  times: number;
  next: AbstractEffect;

  constructor(next: AbstractEffect, times: number) {
    super();
    this.next = next;
    this.times = times;
  }

  effect(user: Combatant, foe: Combatant): void {
    for (let i = 0; i < this.times; i++) {
      this.next.activate(user, foe);
    }
  }

  toString(): string {
    return `${this.next.toString()} ${this.times} times`;
  }

}
