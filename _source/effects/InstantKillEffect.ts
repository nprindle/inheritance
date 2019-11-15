/// <reference path="../AbstractEffect.ts" />

class InstantKillEffect extends AbstractEffect {

    constructor() {
        super();
    }

    effect(user: Combatant, target: Combatant): void {
        target.actuallyDie();
    }

    toString(): string {
        return `kill your opponent`;
    }

    clone(): InstantKillEffect {
        return new InstantKillEffect();
    }

}
