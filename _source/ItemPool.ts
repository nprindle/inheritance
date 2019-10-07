/// <reference path="Tool.ts" />
/// <reference path="Modifier.ts" />

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
    return this.tags.some(x => tags.indexOf(x) !== -1);
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

  getAll(): T[] {
    return this.keys.map(x => this.get(x));
  }

}

const tools = new ItemPool<Tool, string>();
const modifiers = new ItemPool<Modifier, string>();
const characters = new ItemPool<Player, string>();

characters.add('kid', new Player('The Kid', 10, 10));
