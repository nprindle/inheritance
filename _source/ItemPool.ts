/// <reference path="Tool.ts" />
/// <reference path="Modifier.ts" />
class ItemPool<T> {

  items: Object;
  keys: string[];

  constructor() {
    this.items = {};
    this.keys = [];
  }

  add(key: string, item: T): void {
    this.items[key] = item;
    this.keys.push(key);
  }

  get(key: string): T {
    if (this.items[key].clone) {
      return this.items[key].clone();
    } else {
      return this.items[key];
    }
  }

  getRandom(): T {
    let key = this.keys[Math.floor(Math.random() * this.keys.length)];
    return this.get(key);
  }

}

const tools = new ItemPool<Tool>();
const modifiers = new ItemPool<Modifier>();
