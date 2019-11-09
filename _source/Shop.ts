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


        if (this.modifiersForSale.indexOf(modifier) != -1) {
            this.modifiersForSale.splice(this.modifiersForSale.indexOf(modifier), 1); // remove item from shop inventory
            //TODO deduct currency, show modifier screen
        } 
    }

    sellTrait(trait: Trait, player: Player) {
        console.log("Tried to sell" + trait.name);

        if (player.currency < Shop.traitPrice(trait)) {
            return;
        }

        // make sure that this shop can sell the specified item
        if (this.traitsForSale.indexOf(trait) != -1) {
            this.traitsForSale.splice(this.traitsForSale.indexOf(trait), 1); // remove item from shop inventory
            //TODO give item and deduct currency
        } 
    }

    static modifierPrice(modifier: Modifier): number {
        return 1;
    }
    static traitPrice(trait: Trait): number {
        return 1;
    }
}