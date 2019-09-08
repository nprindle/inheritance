/// <reference path="AbstractEffect.ts" />

abstract class AbstractAction {
  abstract activate(): AbstractEffect;
}
