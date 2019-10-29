/// <reference path="../AbstractEffect.ts" />

class LoseAllTraitsEffect extends AbstractEffect {

    constructor() {
        super();
    }

    effect(user: Combatant, target: Combatant): void {
        let traits = user.traits.length;
        for (let i = 0; i < traits; i++) {
            user.removeTrait(0);
        }
    }

    toString(): string {
        return `lose all traits`;
    }

    clone(): LoseAllTraitsEffect {
        return new LoseAllTraitsEffect();
    }

}
