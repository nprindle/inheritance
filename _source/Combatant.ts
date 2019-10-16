/// <reference path="Tool.ts" />
/// <reference path="AbstractStatus.ts" />

abstract class Combatant {
  name: string;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  tools: Tool[];
  statuses: AbstractStatus[];
  deathFunc: Function;

  constructor(name: string, health: number, energy: number, ...tools: Tool[]) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.energy = energy;
    this.maxEnergy = energy;
    this.tools = tools;
    this.deathFunc = function() {};
    this.statuses = [];
  };

  abstract clone(): Combatant;

  status(): string {
    return `${this.name}: ${this.health} / ${this.maxHealth}`;
  };

  wound(damage: number): void {
    this.directDamage(this.statusFold(StatusFolds.DAMAGE_TAKEN, damage));
  };

  //This bypasses status folding.
  directDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
  }

  heal(amount: number): void {
    this.directHeal(this.statusFold(StatusFolds.AMOUNT_HEALED, amount));
  }

  //This bypasses status folding.
  directHeal(amount: number): void {
    this.health += amount;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  }

  refresh(): void {
    this.energy = this.maxEnergy;
    for (let i = 0; i < this.tools.length; i++) {
      this.tools[i].refresh();
    }
  }

  canAfford(cost: Cost): boolean {
    return this.health > cost.healthCost && this.energy >= cost.energyCost;
  };

  pay(cost: Cost): void {
    this.directDamage(cost.healthCost);
    this.energy -= cost.energyCost;
  };

  validMoves(): number[] {
    let result: number[] = [];
    for (let i = 0; i < this.tools.length; i++) {
      if (this.tools[i].usableBy(this)) {
        result.push(i);
      }
    }
    return result;
  }

  useTool(index: number, target: Combatant): void {
    if (index < 0 || index > this.tools.length) {
      return;
    }
    const tool: Tool = this.tools[index];
    tool.use(this, target);
    this.statusCallback(StatusCallbacks.USE_TOOL, target);
  };

  die(): void {
    this.deathFunc.call(this);
  }

  setDeathFunc(f: Function): void {
    this.deathFunc = f;
  }
  
  addStatus(status: AbstractStatus) {
    for (let i = 0; i < this.statuses.length; i++) {
      let done = this.statuses[i].add(status);
      if (done) {
        return;
      }
    }
    this.statuses.push(status);
  }

  private statusCallback(callback: StatusCallbacks, other: Combatant): void {
    const callbacks: Function[] = this.statuses.map(x => <Function> x[callback]);
    callbacks.forEach(x => x(this, other));
    this.statuses = this.statuses.filter(status => status.amount !== 0);
  }

  private statusFold(fold: StatusFolds, value: number): number {
    const foldingCallbacks: Function[] = this.statuses.map(x => <Function> x[fold]);
    const result: number = foldingCallbacks.reduce((acc, x) => x(acc), value);
    this.statuses = this.statuses.filter(status => status.amount !== 0);
    return result;
  }

}
