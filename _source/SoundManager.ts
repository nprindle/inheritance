enum SoundEffects {
    Noise = 'noise.ogg',
    Modifier = 'Modifier.ogg',
    Trait = "Trait.ogg"
}

class SoundManager {

    static audioElems: Record<SoundEffects, HTMLAudioElement>;

    static init(): void {
        let newAudioElement = () => document.createElement('audio');
        this.audioElems = {
            'noise.ogg': newAudioElement(),
            'Modifier.ogg': newAudioElement(),
            'Trait.ogg': newAudioElement(),
        };
        let container: HTMLElement = document.getElementById('audio');
        Object.keys(SoundEffects).forEach(key => {
            let filename: string = SoundEffects[key];
            let filepath: string = `assets/sfx/${filename}`;
            let audio = this.audioElems[filename];
            audio.preload = 'auto';
            audio.src = filepath;
            container.appendChild(audio);
        });
    }

    static setVolume(volume: number): void {
        Object.keys(SoundEffects).forEach(key => {
            this.audioElems[SoundEffects[key]].volume = volume;
        });
    }

    static playSoundEffect(sfx: SoundEffects): void {
        this.audioElems[sfx].currentTime = 0;
        this.audioElems[sfx].play();
    }

}