class Game {

    static showTitle(): void {
        UI.fillScreen(
            UI.renderTitleScreen([
                ['New Game', () => Game.showCharSelect()],
                ['Settings', () => {}], //TODO: settings
                ['Files', () => {}], //TODO: files (what should we call these?)
                ['Credits', () => Game.showCredits()],
            ])
        );
    }

    static showCharSelect(): void {
        UI.fillScreen(
            UI.renderCharacterSelect(Game.newRun, ...characters.getAll())
        );
        console.log(characters.getAll());
    }

    static newRun(character: Player): void {

    }
    
    static showCredits(): void {
        UI.fillScreen(
            UI.renderCredits([
                new CreditsEntry('May Lawver', 'Team Lead', 'Design', 'Programming'),
                new CreditsEntry('Pranay Rapolu', 'Programming', 'Music'),
                new CreditsEntry('Grace Rarer', 'Programming'),
                new CreditsEntry('Mitchell Philipp', 'Programming'),
                new CreditsEntry('Seong Ryoo', 'Art'),
            ], () => Game.showTitle())
        );
    }

}