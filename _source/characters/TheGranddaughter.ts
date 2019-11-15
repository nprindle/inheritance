/// <reference path="../Player.ts" />
/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />

characters.addSorted('kid', new Player('The Granddaughter', 15, 10,
    [
        tools.get('wrench')!,
        tools.get('veil')!,
        tools.get('lighter')!,
        tools.get('jacket')!,
        tools.get('thumbtack')!
    ],
    [], 'assets/thegranddaughter.png'
), 0);
