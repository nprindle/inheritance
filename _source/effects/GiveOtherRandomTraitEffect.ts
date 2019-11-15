/// <reference path="../AbstractEffect.ts" />
/// <reference path="../ItemPool.ts" />

class GiveOtherRandomTraitEffect extends AbstractEffect {

    constructor() {
        super();
    }

    effect(user: Combatant, target: Combatant): void {
        const trait: Trait = traits.selectRandomUnseen([], [TraitTags.randomable]);
        target.addTrait(trait);
        trait.startFight(target);
    }

    toString(): string {
        return `give your opponent a random trait`;
    }

    clone(): GiveOtherRandomTraitEffect {
        return new GiveOtherRandomTraitEffect();
    }

}
