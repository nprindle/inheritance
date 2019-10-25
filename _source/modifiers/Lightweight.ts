/// <reference path="../ItemPool.ts" />
/// <reference path="../Modifier.ts" />
/// <reference path="../effects.ts" />
modifiers.add('lightweight',
    new Modifier('Lightweight', [ModifierTypes.CostMult, 0], [ModifierTypes.UsesPerTurn, 1])
);
