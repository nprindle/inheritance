abstract class AbstractEffect {

  activate(user: Combatant, foe: Combatant): void {
    this.effect(user, foe);
  }

  abstract effect(user: Combatant, foe: Combatant): void;

  abstract toString(): string;

  abstract clone(): AbstractEffect;

}

class NothingEffect extends AbstractEffect { //does nothing
  effect(user: Combatant, foe: Combatant): void {
    return;
  }

  toString(): string {
    return 'do nothing';
  }

  clone(): NothingEffect {
    return new NothingEffect();
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

  clone(): CombinationEffect {
    return new CombinationEffect(...this.effects.map(x => x.clone()));
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

  clone(): RepeatingEffect {
    return new RepeatingEffect(this.next.clone(), this.times);
  }

}

//TODO: how should this work with multipliers?

class CounterEffect extends AbstractEffect {
  currentCounter: number;
  maxCounter: number;
  next: AbstractEffect;

  constructor(next: AbstractEffect, count: number) {
    super();
    this.next = next;
    this.maxCounter = count;
    this.currentCounter = count;
  }

  effect(user: Combatant, foe: Combatant): void {
    this.currentCounter--;
    if (this.currentCounter <= 0) {
      this.next.activate(user, foe);
      this.currentCounter = this.maxCounter;
    }
  }

  toString(): string {
    if (this.currentCounter === 1) {
      return `next use, ${this.next.toString()}`;
    } else {
      return `in ${this.currentCounter} uses, ${this.next.toString()}`
    }
  }

  clone(): CounterEffect {
    return new CounterEffect(this.next.clone(), this.maxCounter);
  }
}