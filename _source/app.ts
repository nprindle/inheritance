/// <reference path="util.ts" />
/// <reference path="UI.ts" />
/// <reference path="Player.ts" />
/// <reference path="effects.ts" />
/// <reference path="Fight.ts" />

const p: Player = new Player('The Kid', 10, 10);
p.tools = [
  new Tool('Wrench', new Cost([1, CostTypes.Energy]), new DamageEffect(1))
];

const e: Enemy = new Enemy('Goldfish', 10, 10);
e.tools = [
  new Tool('Splish Splash', new Cost([1, CostTypes.Energy]), new NothingEffect())
];

const f: Fight = new Fight(p, e);
