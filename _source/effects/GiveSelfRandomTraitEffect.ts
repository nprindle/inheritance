/// <reference path="../AbstractEffect.ts" />
/// <reference path="../ItemPool.ts" />

class GiveSelfRandomTraitEffect extends AbstractEffect {

    tags: TraitTags[];

    constructor(...tags: TraitTags[]) {
        super();
        if (tags.length === 0) {
            tags = [TraitTags.randomable];
        }
        this.tags = tags;
    }

    effect(user: Combatant, target: Combatant): void {
        const trait: Trait = traits.selectRandomUnseen([], this.tags);
        user.addTrait(trait);
        trait.startFight(user);
    }

    toString(): string {
        if (this.tags.includes(TraitTags.coupdegracereward)) {
            return `gain Cunning`;
        } else {
            return `gain a random trait`;
        }
    }

    clone(): GiveSelfRandomTraitEffect {
        return new GiveSelfRandomTraitEffect(...this.tags);
    }

}
