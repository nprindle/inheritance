abstract class Combatant {
  name: string;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  constructor(name: string, health: number, energy: number) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
    this.energy = energy;
    this.maxEnergy = energy;
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
  abstract die(): void;
}
