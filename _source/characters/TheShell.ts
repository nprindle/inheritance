/// <reference path="../Player.ts" />
/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />
/// <reference path="../traits.ts" />

characters.addSorted('shell', new Player('The Shell', 10, 4,
     [
         tools.get('selfrepair')!,
         tools.get('blaster')!,
         tools.get('forcefield')!,
         tools.get('recharge')!,
     ],
     [
         traits.get('voltaic')!
     ], 'assets/the_shell.png', 'tiles/character tiles/the shell.png'
), 4, CharacterTags.inFinalGame);
