/// <reference path="../AbstractEffect.ts" />

class RemoveSelfStatusEffect extends AbstractEffect {

    status: AbstractStatus;
    constructor(status: AbstractStatus) {
        super();
        this.status = status;
    }

    effect(user: Combatant, target: Combatant): void {
        user.removeStatus(this.status.clone());
    }

    toString(): string {
        return `lose all ${Strings.capitalize(this.status.getName())}`;
    }

    clone(): RemoveSelfStatusEffect {
        return new RemoveSelfStatusEffect(this.status.clone());
    }

}
