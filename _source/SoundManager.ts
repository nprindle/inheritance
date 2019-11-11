enum SoundEffects {
    Noise = 'noise.ogg',
    Modifier = 'Modifier.ogg',
    Trait = "Trait.ogg"
}

class SoundManager {

    //TODO: make indexing better
    static audioElems: Record<string, HTMLAudioElement>;

    static init(): void {
        this.audioElems = {};
        let container: HTMLElement = document.getElementById('audio');
        Object.keys(SoundEffects).forEach(key => {
            let filename: string = `assets/sfx/${SoundEffects[key]}`;
            let audio: HTMLAudioElement = document.createElement('audio');
            audio.preload = 'auto';
            audio.src = filename;
            this.audioElems[SoundEffects[key]] = audio;
            container.appendChild(audio);
        });
    }

    static playSoundEffect(sfx: SoundEffects): void {
        this.audioElems[sfx].currentTime = 0;
        this.audioElems[sfx].play();
    }

}