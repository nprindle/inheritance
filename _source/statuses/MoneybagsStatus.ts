/// <reference path="../AbstractStatus.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class MoneybagsStatus extends AbstractStatus {

    damageTaken: number;

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
        this.damageTaken = 0;
    }

    @override(AbstractStatus)
    damageTakenFold(acc: number, affected: Combatant): number {
        this.damageTaken += acc;
        return acc;
    }

    @override(AbstractStatus)
    takeDamage(affected: Combatant, other: Combatant): void {
        if (other instanceof Player) {
            other.giveCurrency(Math.floor(this.damageTaken / this.amount));
        }
        this.damageTaken = this.damageTaken % this.amount;
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof MoneybagsStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof MoneybagsStatus;
    }

    @override(AbstractStatus)
    clone(): MoneybagsStatus {
        return new MoneybagsStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'moneybags';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return `Give your opponent 1 Scrip for every ${this.amount} damage you take.`;
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 900;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return 0;
    }

}
