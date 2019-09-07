abstract class Combatant {
  name: string;
  health: number;
  maxHealth: number;
  constructor(name: string, health: number) {
    this.name = name;
    this.health = health;
    this.maxHealth = health;
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
