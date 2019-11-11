/// <reference path="../AbstractStatus.ts" />
/// <reference path="../AiUtilityFunctions.ts" />
/// <reference path="../Enemy.ts" />
/// <reference path="../Player.ts" />

class ConfusionStatus extends AbstractStatus {

    constructor(amount: number) {
        super(amount, StatusValidators.POSITIVE);
    }

    @override(AbstractStatus)
    endTurn(affected: Combatant, other: Combatant) {
        this.amount--;
    }

    @override(AbstractStatus)
    overridenUtilityFunction(bot: Enemy, human: Player) {
        return AiUtilityFunctions.blindUtility(bot, human);
    }

    @override(AbstractStatus)
    add(other: AbstractStatus): boolean {
        if (other instanceof ConfusionStatus) {
            this.amount += other.amount;
            return true;
        }
        return false;
    }

    @override(AbstractStatus)
    sameKind(other: AbstractStatus): boolean {
        return other instanceof ConfusionStatus;
    }

    @override(AbstractStatus)
    clone(): ConfusionStatus {
        return new ConfusionStatus(this.amount);
    }

    @override(AbstractStatus)
    getName(): string {
        return 'confused';
    }

    @override(AbstractStatus)
    getDescription(): string {
        return 'Make random moves instead of thinking strategically.';
    }

    @override(AbstractStatus)
    getSortingNumber(): number {
        return 10;
    }

    @override(AbstractStatus)
    getUtility(): number {
        return -5 * this.amount;
    }

}
