/// <reference path="Tool.ts" />
/// <reference path="Modifier.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="Player.ts" />
/// <reference path="Trait.ts" />

class ItemPoolEntry<T extends { clone: () => T }, E> {

    key: string;
    value: T;
    tags: E[];
    sortingNumber: number;

    constructor(key: string, value: T, num: number, ...tags: E[]) {
        this.key = key;
        this.value = value;
        this.tags = tags;
        this.sortingNumber = num;
    }

    get(): T { //get(): T images. good for stock photo
        return this.value.clone();
    }

    hasTags(...tags: E[]) { //returns true if it has any of the tags
        return tags.length === 0 || this.tags.some(x => tags.indexOf(x) !== -1);
    }

}

class ItemPool<T extends { clone: () => T }, E> {

    items: { [key: string]: ItemPoolEntry<T, E> };
    keys: string[];
    sorted: boolean;

    constructor(sorted: boolean = false) {
        this.items = {};
        this.keys = [];
        this.sorted = sorted;
    }

    add(key: string, item: T, ...tags: E[]): void {
        this.items[key] = new ItemPoolEntry<T, E>(key, item, 0, ...tags);
        this.keys.push(key);
    }

    addSorted(key: string, item: T, position: number, ...tags: E[]): void {
        this.items[key] = new ItemPoolEntry<T, E>(key, item, position, ...tags);
        this.keys.push(key);
    }

    get(key: string): T | null {
        if (this.items[key] === undefined) {
            return null;
        }
        return this.items[key].get();
    }

    getRandom(): T | null {
        let key = Random.fromArray(this.keys);
        return this.get(key);
    }

    // Select all items with the given tags that haven't been seen. If none of the
    // items has the given tags, fall back to the next tag set. If none of the tag
    // sets match, clean items matching the first tag set out of the seen array
    // and recalculate.
    selectUnseenTags(seen: string[], tags: E[] = [], ...fallbacks: E[][]): string[] {
        const unseen = (k: string) => seen.indexOf(k) < 0;
        let unseenMatching: string[] = [];
        let tagsMatch = this.keys.filter((k) => this.items[k].hasTags(...tags));
        for (let ts of [tags, ...fallbacks]) {
            const matching = this.keys.filter((k) => unseen(k) && this.items[k].hasTags(...ts));
            if (matching.length > 0) {
                unseenMatching = matching;
                break;
            }
        }
        // Clean when no unseen matches were found. If anything matched from the
        // first tag set when not considering whether it was seen, it will match
        // after cleaning. Otherwise, if none of the tags matched, they won't match
        // after cleaning, either.
        if (unseenMatching.length == 0) {
            filterInPlace(seen, (k) => this.items[k].hasTags(...tags));
            return tagsMatch;
        }
        return unseenMatching;
    }

    selectAllUnseen(seen: string[], tags: E[] = [], ...fallbacks: E[][]): T[] {
        let unseen = this.selectUnseenTags(seen, tags, ...fallbacks);
        // Note: a cast is much faster than a map((x) => x!) here
        return unseen.map(k => this.get(k)).filter((x) => x !== null) as T[];
    }

    selectRandomUnseen(seen: string[], tags: E[] = [], ...fallbacks: E[][]): T | null {
        const unseen = this.selectUnseenTags(seen, tags, ...fallbacks);
        const key = Random.fromArray(unseen);
        seen.push(key);
        return this.get(key);
    }

    getAll(): T[] {
        // Note: a cast is much faster than a mapped assertion here
        if (this.sorted) {
            return this.keys.map((x) => this.items[x])
            .sort((a, b) => a.sortingNumber - b.sortingNumber)
            .map(x => x.get()).filter((x) => x !== null) as T[];
        }
        return this.keys.map((x) => this.get(x)).filter((x) => x !== null) as T[];
    }

}

const tools = new ItemPool<Tool, string>();

enum ModifierTags {

}

const modifiers = new ItemPool<Modifier, ModifierTags>();
const characters = new ItemPool<Player, string>(true);

enum EnemyTags {
    level1, level2, level3, boss
}

const enemies = new ItemPool<Enemy, EnemyTags>();

enum TraitTags {
    standard, elite, curse
}

const traits = new ItemPool<Trait, TraitTags>();
