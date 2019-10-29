/// <reference path="../AbstractStatus.ts" />
/// <reference path="../AiUtilityFunctions.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class EnergyDebtStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount);
    }

    energyGainedFold(acc: number): number {
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
        if (other instanceof EnergyDebtStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    sameKind(other: AbstractStatus): boolean {
        return other instanceof EnergyDebtStatus;
    }

    clone(): EnergyDebtStatus {
        return new EnergyDebtStatus(this.amount);
    }

    getName(): string {
        return 'energy Debt';
    }

    getDescription(): string {
        //TODO: describe this better
        return `The next ${this.amount} Energy you gain will not count.`;
    }

    getSortingNumber(): number {
        return 10;
    }

    getUtility(): number {
        return -2 * this.amount;
    }

}
