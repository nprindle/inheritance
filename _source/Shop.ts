class Shop {


    //TODO inventory
    modifiersForSale: Modifier[];
    traitsForSale: Trait[];

    constructor(modifierTags: ModifierTags[], traitTags: TraitTags[]) {

        this.modifiersForSale = Arrays.generate(4, () => (Game.currentRun.nextModifier(modifierTags)));
        this.traitsForSale = Arrays.generate(4, () => (Game.currentRun.nextTrait(traitTags)));
    }

    //TODO get methods for available traits
    getModifierListings(): [Modifier, number][] {
        return this.modifiersForSale.map((modifier: Modifier) => [modifier, Shop.modifierPrice(modifier)]);
    }


    //TODO get methods for available modifiers
    getTraitListings(): [Trait, number][] {
        return this.traitsForSale.map((trait: Trait) => [trait, Shop.traitPrice(trait)]);
    }

    sellModifier(modifier: Modifier, player: Player) {
        console.log("Tried to sell" + modifier.name);

        // make sure player can afford this item
        if (Shop.playerCanAffordModifier(modifier, player)) {
            // make sure that this shop can sell the specified item
            if (this.modifiersForSale.indexOf(modifier) != -1) {
                this.modifiersForSale.splice(this.modifiersForSale.indexOf(modifier), 1); // remove item from shop inventory
                this.modifiersForSale.splice(this.modifiersForSale.indexOf(modifier), 1); // remove item from shop inventory
                // we don't need to apply the modifier here because it is done by the Offer Modifier screen
                player.payCurrency(Shop.modifierPrice(modifier));
            }
        }
    }

    sellTrait(trait: Trait, player: Player) {
        console.log("Tried to sell" + trait.name);

        // make sure player can afford this item
        if (Shop.playerCanAffordTrait(trait, player)) {
           // make sure that this shop can sell the specified item
            if (this.traitsForSale.indexOf(trait) != -1) {
                this.traitsForSale.splice(this.traitsForSale.indexOf(trait), 1); // remove item from shop inventory
                player.addTrait(trait);
                player.payCurrency(Shop.traitPrice(trait));
            }
        }
    }

    static modifierPrice(modifier: Modifier): number {
        return 1;
    }
    static traitPrice(trait: Trait): number {
        return 1;
    }

    static playerCanAffordModifier(modifier: Modifier, player: Player) {
        return player.currency >= Shop.modifierPrice(modifier);
    }

    static playerCanAffordTrait(trait: Trait, player: Player) {
        return player.currency >= Shop.traitPrice(trait);
    }
}