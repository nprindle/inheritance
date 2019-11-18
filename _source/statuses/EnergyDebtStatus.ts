/// <reference path="../AbstractStatus.ts" />
/// <reference path="../AiUtilityFunctions.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class EnergyDebtStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    energyGainedFold(acc: number, affected: Combatant): number {
        if (acc >= this.amount) {
          acc -= this.amount;
          this.amount = 0;
          return acc;
        } else {
          this.amount -= acc;
          return 0;
        }
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof EnergyDebtStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof EnergyDebtStatus;
    }

    @override(AbstractStatus)
    clone(): EnergyDebtStatus {
        return new EnergyDebtStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'energy Debt';
    }

    @override(AbstractStatus)
    getDescription(): string {
        //TODO: describe this better
        return `The next ${this.amount} Energy you gain will not count.`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 10;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return -2 * this.amount;
    }

}
