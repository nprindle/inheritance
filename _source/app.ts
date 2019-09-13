/// <reference path="util.ts" />
/// <reference path="UI.ts" />
/// <reference path="Player.ts" />
/// <reference path="effects.ts" />
/// <reference path="Fight.ts" />

const p: Player = new Player('The Kid', 10, 10);

var numEvents: number = 0;

p.tools = [
  new Tool('Wrench', new Cost([1, CostTypes.Energy]), new DamageEffect(1)),
  new Tool('Generic Brand Bandages', new Cost([1, CostTypes.Energy]), new HealingEffect(1))
];

function setUpFight(i: number): void {
  const e: Enemy = new Enemy('Goldfish', 10 + i * 5, 10);
  e.tools = [
    new Tool('Splish Splash', new Cost([1, CostTypes.Energy]), new NothingEffect()),
    new Tool('Violent Splash', new Cost([1, CostTypes.Energy]), new DamageEffect(1 + i))
  ];

  const f: Fight = new Fight(p, e);
}

function offerModifier(): void {

}

function moveOn(): void {
  numEvents++;
  switch (numEvents % 2) {
    case 0:
      setUpFight(Math.floor(numEvents / 2));
      break;
    case 1:
      offerModifier();
      break;
  }
}

setUpFight(0);
