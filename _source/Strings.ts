class Strings {

    private static readonly superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];

    public static capitalize(str: string): string {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    public static conjoin(strs: string[]): string {
        return strs.map(x => `${Strings.capitalize(x)}.`).join(' ');
    }

    public static powerTuple(tuple: [string, number]): string {
        if (tuple[1] <= 1) {
            return tuple[0];
        }
        return `${tuple[0]}${Strings.power(tuple[1])}`;
    }

    public static power(n: number): string {
        let digits: number[] = `${n}`.split('').map(x => parseInt(x));
        return digits.map(x => Strings.superscripts[x]).join('');
    }

}
