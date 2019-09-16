/// <reference path="Tool.ts" />

abstract class Combatant {
  name: string;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  tools: Tool[];
  deathFunc: Function;

  constructor(name: string, health: number, energy: number, ...tools: Tool[]) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.energy = energy;
    this.maxEnergy = energy;
    this.tools = tools;
    this.deathFunc = function() {};
  };

  status(): string {
    return `${this.name}: ${this.health} / ${this.maxHealth}`;
  };

  wound(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
  };

  heal(amount: number): void {
    this.health += amount;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  };

  refresh(): void {
    this.energy = this.maxEnergy;
  }

  canAfford(cost: Cost): boolean {
    return this.health > cost.healthCost && this.energy >= cost.energyCost;
  };

  pay(cost: Cost): void {
    this.wound(cost.healthCost);
    this.energy -= cost.energyCost;
  };

  useTool(index: number, target: Combatant): void {
    if (index < 0 || index > this.tools.length) {
      return;
    }
    const tool: Tool = this.tools[index];
    tool.use(this, target);
  };

  die(): void {
    this.deathFunc.call(this);
  }

  setDeathFunc(f: Function): void {
    this.deathFunc = f;
  }

}
