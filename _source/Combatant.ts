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

  canAfford(cost: Cost): boolean {
    return this.health > cost.healthCost && this.energy >= cost.energyCost;
  }

  abstract die(): void;
}
