/// <reference path="../AbstractEffect.ts" />
/// <reference path="../ItemPool.ts" />

class GiveSelfRandomTraitEffect extends AbstractEffect {

    constructor() {
        super();
    }

    effect(user: Combatant, target: Combatant): void {
        const trait: Trait = traits.selectRandomUnseen([], [TraitTags.randomable]);
        user.addTrait(trait);
        trait.startFight(user);
    }

    toString(): string {
        return `gain a random trait`;
    }

    clone(): GiveSelfRandomTraitEffect {
        return new GiveSelfRandomTraitEffect();
    }

}
