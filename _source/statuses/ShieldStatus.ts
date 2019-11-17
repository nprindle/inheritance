/// <reference path="../AbstractStatus.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class ShieldStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    damageTakenFold(acc: number, affected: Combatant): number {
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
        if (other instanceof ShieldStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof ShieldStatus;
    }

    @override(AbstractStatus)
    clone(): ShieldStatus {
        return new ShieldStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'shield';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return `Block ${this.amount} damage.`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 10;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return this.amount;
    }

}
