/// <reference path="../AbstractStatus.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class ShieldStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount);
    }

    damageTakenFold(acc: number): number {
        if (acc >= this.amount) {
          acc -= this.amount;
          this.amount = 0;
          return acc;
        } else {
          this.amount -= acc;
          return 0;
        }
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof ShieldStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    sameKind(other: AbstractStatus): boolean {
        return other instanceof ShieldStatus;
    }

    clone(): ShieldStatus {
        return new ShieldStatus(this.amount);
    }

    getName(): string {
        return 'shield';
    }

    getDescription(): string {
        return `Block ${this.amount} damage.`;
    }

    getSortingNumber(): number {
        return 10;
    }

    getUtility(): number {
        return this.amount;
    }

}
