class Random {

    public static bool(chance: number = 0.5): boolean {
        return Math.random() < chance;
    }

    public static between(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static intBetween(min: number, max: number): number {
        return Random.between(min, max) << 0;
    }

    public static tupleInt(tuple: [number, number]) {
        return Random.intBetween(tuple[0], tuple[1]);
    }

    public static lessThan(max: number): number {
        return Random.between(0, max);
    }

    public static intLessThan(max: number): number {
        return Random.intBetween(0, max);
    }

    public static intCoord(width: number, height: number): Coordinates {
        return new Coordinates({
            x: Random.intLessThan(width),
            y: Random.intLessThan(height)
        });
    }

    public static fromArray<T>(arr: T[]): T {
        return arr[Random.intBetween(0, arr.length)];
    }

    public static weightedRandom<T>(arr: [T, number][]): T {
        const totalWeight = arr.map(x => x[1]).reduce((acc, x) => acc + x);
        const weight = Random.between(0, totalWeight);
        let totalIndex = 0;
        //index into the array
        for (let curr of arr) {
            totalIndex += curr[1];
            if (totalIndex >= weight) {
                return curr[0];
            }
        }
        return arr[0][0];
    }

    public static shuffle<T>(arr: T[]): T[] {
        for (let i = 0; i < arr.length - 2; i++) {
            let j: number = Random.intBetween(i, arr.length);
            let temp: T = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    // Selects a random enum key from a numeric enum.
    public static fromNumericEnum<T extends Record<number, U>, U>(e: T): T[keyof T] {
        let keys = Object.keys(e).map(n => Number(n)).filter(n => !isNaN(n)) as unknown as T[keyof T][];
        return Random.fromArray(keys);
    }

}
