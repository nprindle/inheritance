/// <reference path="Tool.ts" />
/// <reference path="Modifier.ts" />
/// <reference path="Enemy.ts" />
/// <reference path="Player.ts" />

class ItemPoolEntry<T extends { clone: () => T }, E> {

  key: string;
  value: T;
  tags: E[];

  constructor(key: string, value: T, ...tags: E[]) {
    this.key = key;
    this.value = value;
    this.tags = tags;
  }

  get(): T { //get(): T images. good for stock photo
    return this.value.clone();
  }

  hasTags(...tags: E[]) { //returns true if it has any of the tags
    return tags.length === 0 || this.tags.some(x => tags.indexOf(x) !== -1);
  }

}

class ItemPool<T extends { clone: () => T }, E> {

  items: Object;
  keys: string[];

  constructor() {
    this.items = {};
    this.keys = [];
  }

  add(key: string, item: T, ...tags: E[]): void {
    this.items[key] = new ItemPoolEntry<T, E>(key, item, ...tags);
    this.keys.push(key);
  }

  get(key: string): T {
    if (!this.items[key]) {
      return null;
    }
    return this.items[key].get();
  }

  getRandom(): T {
    let key = Random.fromArray(this.keys);
    return this.get(key);
  }

  // Select all items with the given tags that haven't been seen. If none of the
  // items has the given tags, fall back to the next tag set. If none of the tag
  // sets match, clean items matching the first tag set out of the seen array
  // and recalculate.
  selectUnseenTags(seen: string[], tags: E[] = [], ...fallbacks: E[][]): string[] {
    const unseen = (k) => seen.indexOf(k) < 0;
    let unseenMatching = [];
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
    return this.selectUnseenTags(seen, tags, ...fallbacks).map(k => this.get(k));
  }

  selectRandomUnseen(seen: string[], tags: E[] = [], ...fallbacks: E[][]): T {
    const unseen = this.selectUnseenTags(seen, tags, ...fallbacks);
    const key = Random.fromArray(unseen);
    seen.push(key);
    return this.get(key);
  }

  getAll(): T[] {
    return this.keys.map((x) => this.get(x));
  }

}

const tools = new ItemPool<Tool, string>();
const modifiers = new ItemPool<Modifier, string>();
const characters = new ItemPool<Player, string>();
const enemies = new ItemPool<Enemy, string>();