/// <reference path="../Player.ts" />
/// <reference path="../ItemPool.ts" />
/// <reference path="../tools.ts" />

// This is a character for debug purposes.
characters.addSorted('troubleshooter', new Player('The Troubleshooter', 100, 100,
    [
        tools.get('killscreen')!
    ], []
), 10);
