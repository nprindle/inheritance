/// <reference path="../Player.ts" />
/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../traits.ts" />

//TODO: implement Flow status and make Catburglar interesting

characters.addSorted('catburglar', new Player('The Catburglar', 10, 10,
    [
        tools.get('claws')!,
        tools.get('holoarmor')!,
        tools.get('coupdegrace')!
    ],
    [traits.get('counterfeiting')!], 'assets/The_Catburgurlar.png'
), 1);
