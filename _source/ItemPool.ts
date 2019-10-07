/// <reference path="Tool.ts" />
/// <reference path="Modifier.ts" />

class ItemPoolEntry<T> {

  key: string;
  value: any; //TODO: use better typing here
  tags: string[];

  constructor(key: string, value: T, ...tags: string[]) {
    this.key = key;
    this.value = value;
    this.tags = tags;
  }

  get(): T { //get(): T images. good for stock photo
    if (this.value.clone) {
      return this.value.clone();
    } else {
      return this.value;
    }
  }

  hasTags(...tags: string[]) { //returns true if it has any of the tags
    return this.tags.filter(x => tags.indexOf(x) !== -1).length > 0;
  }

}

class ItemPool<T> {

  items: Object;
  keys: string[];

  constructor() {
    this.items = {};
    this.keys = [];
  }

  add(key: string, item: T, ...tags: string[]): void {
    this.items[key] = new ItemPoolEntry<T>(key, item, ...tags);
    this.keys.push();
  }

  get(key: string): T {
    if (!this.items[key]) {
      return null;
    }
    return this.items[key].get();
  }

  getRandom(): T {
    let key = this.keys[Math.floor(Math.random() * this.keys.length)];
    return this.get(key);
  }

  getAll(): T[] {
    return this.keys.map(x => this.get(x));
  }

}

const tools = new ItemPool<Tool>();
const modifiers = new ItemPool<Modifier>();
