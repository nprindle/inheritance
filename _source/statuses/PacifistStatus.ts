/// <reference path="../AbstractStatus.ts" />
/// <reference path="../AiUtilityFunctions.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class PacifistStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant, other: Combatant) {
        this.amount--;
    }

    @override(AbstractStatus)
    overridenUtilityFunction(bot: Enemy, human: Player) {
        return AiUtilityFunctions.friendlyUtility(bot, human);
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof PacifistStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof PacifistStatus;
    }

    @override(AbstractStatus)
    clone(): PacifistStatus {
        return new PacifistStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'pacifist';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return 'Refuses to cause harm. Decreases by one each turn.';
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 10;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return -1 * this.amount;
    }

}
