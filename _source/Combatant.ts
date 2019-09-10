/// <reference path="Tool.ts" />

abstract class Combatant {
  name: string;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  tools: Tool[];

  constructor(name: string, health: number, energy: number, ...tools: Tool[]) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.energy = energy;
    this.maxEnergy = energy;
    this.tools = tools;
  };

  status(): string {
    return `${this.name}: ${this.health} / ${this.maxHealth}`;
  };

  wound(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.die();
    }
  };

  heal(amount: number): void {
    this.health += amount;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
  };

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
    if (!this.canAfford(tool.cost)) {
      return;
    } else {
      this.pay(tool.cost);
      tool.use(this, target);
    }
  };

  abstract die(): void;
}
