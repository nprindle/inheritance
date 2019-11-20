/// <reference path="../Player.ts" />
/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />

characters.addSorted('reject', new Player('The Reject', 10, 6,
    [
        tools.get('mutagens')!,
        tools.get('boneclaws')!,
        tools.get('rawhideskin')!,
        tools.get('geneburst')!,
        tools.get('toxicblood')!
    ],
    [], 'assets/The_Reject_-_Done.png', 'tiles/character tiles/the reject.png'
), 5, CharacterTags.inFinalGame);
