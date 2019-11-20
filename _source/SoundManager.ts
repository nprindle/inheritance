enum SoundEffects {
    Noise = 'noise.ogg',
    Modifier = 'Modifier.ogg',
    Trait = "Trait.ogg"
}

enum MusicTracks {
    Foyer = 'the_foyer.ogg',
    MainTheme = 'main_theme.ogg',
    ProtoInh = 'the_prototype_inheritance.ogg'
}

class SoundManager {

    static sfxElems: Record<SoundEffects, HTMLAudioElement>;
    static musicElems: Record<MusicTracks, HTMLAudioElement>;
    static currentSong: MusicTracks | false;

    static init(): void {
        let newAudioElement = () => document.createElement('audio');
        this.sfxElems = {
            'noise.ogg': newAudioElement(),
            'Modifier.ogg': newAudioElement(),
            'Trait.ogg': newAudioElement(),
        };
        this.musicElems = {
            'main_theme.ogg': newAudioElement(),
            'the_foyer.ogg': newAudioElement(),
            'the_prototype_inheritance.ogg': newAudioElement()
        }
        let container: HTMLElement = document.getElementById('audio');
        Object.keys(SoundEffects).forEach(key => {
            let filename: string = SoundEffects[key];
            let filepath: string = `assets/sfx/${filename}`;
            let audio = this.sfxElems[filename];
            audio.preload = 'auto';
            audio.src = filepath;
            container.appendChild(audio);
        });
        Object.keys(MusicTracks).forEach(key => {
            let filename: string = MusicTracks[key];
            let filepath: string = `assets/music/${filename}`;
            let audio = this.musicElems[filename];
            audio.preload = 'auto';
            audio.loop = 'true';
            audio.src = filepath;
            container.appendChild(audio);
        });
        this.currentSong = false;
    }

    // Set the absolute volume (not as a percentage). Note: this does not change
    // the game settings; use Settings.setVolumePercent for that.
    static setVolume(volume: number): void {
        Object.keys(SoundEffects).forEach(key => {
            this.sfxElems[SoundEffects[key]].volume = volume;
        });
        Object.keys(MusicTracks).forEach(key => {
            this.musicElems[MusicTracks[key]].volume = volume;
        });
    }

    static playSoundEffect(sfx: SoundEffects): void {
        this.sfxElems[sfx].currentTime = 0;
        this.sfxElems[sfx].play();
    }

    static playSong(song: MusicTracks): void {
        if (song === this.currentSong) {
            return;
        }
        if (this.currentSong !== false) {
            this.musicElems[this.currentSong].pause();
        }
        this.musicElems[song].currentTime = 0;
        this.musicElems[song].play();
        this.currentSong = song;
    }

}
