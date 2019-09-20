/// <reference path="Tool.ts" />
class ItemPool<T> {

  items: Object;

  constructor() {
    this.items = {};
  }

  add(key: string, item: T): void {
    this.items[key] = item;
  }

  get(key: string): T {
    if (this.items[key].clone) {
      return this.items[key].clone();
    } else {
      return this.items[key];
    }
  }

}

const tools = new ItemPool<Tool>();
