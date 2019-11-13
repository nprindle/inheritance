// The type that should be parsed from the JSON in LocalStorage
type SettingsOptions = {
    volumePercent: number;
};

// Type predicate to check if a value is an object with the necessary fields to
// be a SettingsOptions
function isSettingsOptions(x: any): x is SettingsOptions {
    if (typeof(x) === "object" && x !== null) {
        let y = x as SettingsOptions;
        return y.volumePercent !== undefined;
    } else {
        return false;
    }
}

class Settings {
    private static options: SettingsOptions = {
        // Percentage from 0 to 100, defaulting to max volume
        volumePercent: 100
    };

    public static getVolumePercent(): number {
        return Settings.options.volumePercent;
    }

    // Set the volume percentage setting
    public static setVolumePercent(percent: number): void {
        Settings.options.volumePercent = percent;
        SoundManager.setVolume(percent / 100);
    }

    // Load settings from an object and return true, if necessary properties are
    // present. If not, return false.
    public static loadFromObject(obj: SettingsOptions): void {
        Settings.options = {...obj};
    }

    public static dumpToObject(): SettingsOptions {
        return {...Settings.options};
    }

}

