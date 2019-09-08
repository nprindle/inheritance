/// <reference path="AbstractEffect.ts" />

abstract class AbstractAction {

  next: AbstractAction | null;

  constructor(next: AbstractAction | null) {
    this.next = next;
  }

  abstract activate(): AbstractEffect;

}
