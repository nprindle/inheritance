/// <reference path="../AbstractStatus.ts" />

class FreezeStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    useTool(affected: Combatant, other: Combatant) {
        affected.loseEnergy(this.amount);
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant, other: Combatant) {
        this.amount = 0;
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof FreezeStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof FreezeStatus;
    }

    @override(AbstractStatus)
    clone(): FreezeStatus {
        return new FreezeStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'freeze';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return `Lose ${this.amount} energy whenever you use a tool this turn.`
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 0;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return -2 * this.amount;
    }

}
