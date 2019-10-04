/// <reference path="util.ts" />
/// <reference path="UI.ts" />
/// <reference path="Player.ts" />
/// <reference path="effects.ts" />
/// <reference path="Fight.ts" />
/// <reference path="Modifier.ts" />
/// <reference path="ItemPool.ts" />
/// <reference path="tools.ts" />
/// <reference path="modifiers.ts" />

const p: Player = new Player('The Kid', 10, 10);

var numEvents: number = 0;

p.tools = [
  tools.get('wrench'),
  tools.get('bandages'),
  tools.get('singleton')
];

function setUpFight(i: number): void {
  document.body.innerHTML = '';
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
  const offer = modifiers.getRandom();
  div.appendChild(UI.renderModifier(offer, p));
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
  document.body.appendChild(
    UI.renderTitleScreen([
      ['New Game', function() {setUpFight(0)}]
    ])
  );
}

if (window.innerHeight === 0) {
  window.console.log('tools', tools);
  window.console.log('modifiers', modifiers);
}
