/// <reference path="util.ts" />
/// <reference path="UI.ts" />
/// <reference path="Player.ts" />
/// <reference path="effects.ts" />
/// <reference path="Fight.ts" />
/// <reference path="Modifier.ts" />
/// <reference path="ItemPool.ts" />
/// <reference path="tools.ts" />

const p: Player = new Player('The Kid', 10, 10);

var numEvents: number = 0;

p.tools = [
  tools.get('wrench'),
  tools.get('bandages'),
  tools.get('singleton')
];

const modifiers: Modifier[] = [
  new Modifier('Jittering', '+1 Multiplier. x2 Cost.', [ModifierTypes.CostMult, 2], [ModifierTypes.MultAdd, 1]),
  new Modifier('Spiky', 'Weapon does 1 damage, too. +1 Energy Cost', [ModifierTypes.AddEnergyCost, 1], new DamageEffect(1))
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
  const div = UI.makeDiv('offer');
  div.appendChild(UI.makeTextParagraph('You wanna modifier?'));
  div.appendChild(UI.renderModifier(modifiers[Math.floor(Math.random() * modifiers.length)], p));
  document.body.appendChild(div);
}

function moveOn(): void {
  numEvents++;
  document.body.innerHTML = '';
  switch (numEvents % 2) {
    case 0:
      setUpFight(Math.floor(numEvents / 2));
      break;
    case 1:
      offerModifier();
      break;
  }
}

window.onload = function() {
  setUpFight(0);
}

if (window.innerHeight === 0) {
  window.console.log(tools);
}
