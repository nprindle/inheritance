/// <reference path="../AbstractStatus.ts" />
/// <reference path="../AiUtilityFunctions.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class EnergizedStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    startTurn(affected: Combatant, other: Combatant) {
        affected.energy += this.amount; //otherwise it can get eaten by energy debt
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant, other: Combatant) {
        this.amount = 0;
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof EnergizedStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof EnergizedStatus;
    }

    @override(AbstractStatus)
    clone(): EnergizedStatus {
        return new EnergizedStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'energized';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return `Start with ${this.amount} extra damage this turn.`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 9;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return 2 * this.amount;
    }

}
