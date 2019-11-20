class Shop {

    private modifiersForSale: ShopModifierListing[];
    private traitsForSale: ShopTraitListing[];

    constructor(modifierCounts: [ModifierTags, number][], traitCounts: [TraitTags, number][]) {

        // generate modifiersListing
        this.modifiersForSale = [];
        modifierCounts.forEach((tuple: [ModifierTags, number]) => {
            let tag: ModifierTags = tuple[0];
            let count: number = tuple[1];
            let price = Shop.calculateModifierPrice(tag);
            if (tag) {
                let newModifiers: ShopModifierListing[] = Arrays.generate(count, () => (new ShopModifierListing(Game.currentRun.nextModifier([tag]), price)));
                newModifiers.forEach((listing: ShopModifierListing) => this.modifiersForSale.push(listing));
            } else {
                // if tag is null/undefined, provide items without any tag limitation
                let newModifiers: ShopModifierListing[] = Arrays.generate(count, () => (new ShopModifierListing(Game.currentRun.nextModifier(), price)));
                newModifiers.forEach((listing: ShopModifierListing) => this.modifiersForSale.push(listing));
            }
        });


        // generate trait listings
        this.traitsForSale = [];
        traitCounts.forEach((tuple: [TraitTags, number]) => {
            let tag: TraitTags = tuple[0];
            let count: number = tuple[1];
            let price = Shop.calculateTraitPrice(tag);
            if (tag !== null && tag !== undefined) {
                let newTraits: ShopTraitListing[] = Arrays.generate(count, () => (new ShopTraitListing(Game.currentRun.nextTrait([tag]), price)));
                newTraits.forEach((listing: ShopTraitListing) => this.traitsForSale.push(listing));
            } else {
                // if tag is null/undefined, provide items without any tag limitation
                let newTraits: ShopTraitListing[] = Arrays.generate(count, () => (new ShopTraitListing(Game.currentRun.nextTrait(), price)));
                newTraits.forEach((listing: ShopTraitListing) => this.traitsForSale.push(listing));
            }
        });
    }

    getModifierListings(): ShopModifierListing[] {
        return this.modifiersForSale;
    }

    getTraitListings(): ShopTraitListing[] {
        return this.traitsForSale;
    }

    sellModifier(listing: ShopModifierListing, player: Player) {
        debugLog("Tried to sell" + listing.modifier.name);

        // make sure player can afford this item
        if (listing.price <= player.currency) {
            // make sure that this shop can sell the specified item
            if (this.modifiersForSale.indexOf(listing) != -1) {
                this.modifiersForSale.splice(this.modifiersForSale.indexOf(listing), 1); // remove item from shop inventory
                // we don't need to apply the modifier here because it is done by the Offer Modifier screen
                player.payCurrency(listing.price);
            }
        }
    }

    sellTrait(listing: ShopTraitListing, player: Player) {
        debugLog("Tried to sell" + listing.trait.name);

        // make sure player can afford this item
        if (listing.price <= player.currency) {
           // make sure that this shop can sell the specified item
            if (this.traitsForSale.indexOf(listing) != -1) {
                this.traitsForSale.splice(this.traitsForSale.indexOf(listing), 1); // remove item from shop inventory
                player.addTrait(listing.trait);
                player.payCurrency(listing.price);
                Game.currentRun.addStatistic(RunStatistics.TRAITS_GAINED, 1);
            }
        }
    }


    static calculateModifierPrice(tag: ModifierTags) {
        // TODO change based on tag once modifier tags are added
        return 3;
    }

    static calculateTraitPrice(tag: TraitTags) {
        if (tag === TraitTags.elite) {
            return 5;
        } else if (tag === TraitTags.standard) {
            return 2;
        } else if (tag === TraitTags.curse) {
            return 0; // curses are free
        }
    }
}

class ShopModifierListing {
    modifier: Modifier;
    price: number;

    constructor (modifier: Modifier, price: number) {
        this.modifier = modifier;
        this.price = price;
    }
}

class ShopTraitListing {
    trait: Trait;
    price: number;

    constructor (trait: Trait, price: number) {
        this.trait = trait;
        this.price = price;
    }
}
