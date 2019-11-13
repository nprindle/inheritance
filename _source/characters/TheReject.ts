/// <reference path="../Player.ts" />
/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />

characters.addSorted('reject', new Player('The Reject', 10, 6,
    [
        tools.get('mutagens')!,
        tools.get('boneclaws')!,
        tools.get('rawhideskin')!,
        tools.get('geneburst')!
    ],
    []
), 5);
