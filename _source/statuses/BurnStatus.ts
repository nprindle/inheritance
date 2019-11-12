/// <reference path="../AbstractStatus.ts" />

class BurnStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    useTool(affected: Combatant, other: Combatant) {
        affected.wound(this.amount);
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant, other: Combatant) {
        this.amount = 0;
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof BurnStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof BurnStatus;
    }

    @override(AbstractStatus)
    clone(): BurnStatus {
        return new BurnStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'burn';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return `Take ${this.amount} damage whenever you use a tool this turn.`
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 0;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return -5 * this.amount;
    }

}
