/// <reference path="../AbstractStatus.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />
/// <reference path="./FlowStatus.ts" />

class DecoyStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    takeDamage(affected: Combatant, other: Combatant): void {
        affected.addStatus(new FlowStatus(this.amount));
    }

    @override(AbstractStatus)
    startTurn(affected: Combatant, other: Combatant): void {
        this.amount = 0;
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof DecoyStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof DecoyStatus;
    }

    @override(AbstractStatus)
    clone(): DecoyStatus {
        return new DecoyStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'decoy';
    }

    @override(AbstractStatus)
    damageTakenFold(acc: number, affected: Combatant): number {
        this.amount--;
        affected.addStatus(new FlowStatus(1));
        return 0;
    }

    @override(AbstractStatus)
    getDescription(): string {
        if (this.amount === 1) {
            return 'Block the next attack this turn. Gain Flow when attacked.'
        }
        return `Block the next ${this.amount} attacks this turn. Gain Flow when attacked.`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return -20;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return this.amount;
    }

}
