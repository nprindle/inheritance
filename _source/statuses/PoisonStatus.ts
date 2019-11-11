/// <reference path="../AbstractStatus.ts" />

class PoisonStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    startTurn(affected: Combatant, other: Combatant) {
        affected.directDamage(this.amount);
        this.amount--;
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof PoisonStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof PoisonStatus;
    }

    @override(AbstractStatus)
    clone(): PoisonStatus {
        return new PoisonStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'poison';
    }

    @override(AbstractStatus)
    getDescription(): string {
        if (this.amount === 1) {
            return `Take 1 damage at the end of this turn.`;
        } else {
            return `Take ${this.amount} damage at the start of next turn. Decreases by one each turn.`;
        }
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 0;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return -1 * ((this.amount) * (this.amount + 1))/2;
    }

}
