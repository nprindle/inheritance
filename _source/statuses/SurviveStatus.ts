/// <reference path="../AbstractStatus.ts" />

class SurviveStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    die(affected: Combatant, other: Combatant): void {
        affected.health = 1;
        this.amount--;
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof SurviveStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof SurviveStatus;
    }

    @override(AbstractStatus)
    clone(): SurviveStatus {
        return new SurviveStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'survive';
    }

    @override(AbstractStatus)
    getDescription(): string {
        if (this.amount === 1) {
            return `Survive the next killing blow.`;
        } else {
            return `Survive the next ${this.amount} killing blows.`;
        }
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 0;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return 10 * this.amount;
    }

}
