/// <reference path="../AbstractStatus.ts" />

class FreezeStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    useTool(affected: Combatant, other: Combatant) {
        affected.loseEnergy(this.amount);
    }

    endTurn(affected: Combatant, other: Combatant) {
        this.amount = 0;
    }

    add(other: AbstractStatus): boolean {
        if (other instanceof FreezeStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    sameKind(other: AbstractStatus): boolean {
        return other instanceof FreezeStatus;
    }

    clone(): FreezeStatus {
        return new FreezeStatus(this.amount);
    }

    getName(): string {
        return 'freeze';
    }

    getDescription(): string {
        return `Lose ${this.amount} energy whenever you use a tool this turn.`
    }

    getSortingNumber(): number {
        return 0;
    }

    getUtility(): number {
        return -2 * this.amount;
    }

}