// Coordinates, usually using the top left of the screen as the origin by
// convention
class Coordinates {
    readonly x: number;
    readonly y: number;

    constructor(c: { x: number; y: number }) {
        this.x = c.x;
        this.y = c.y;
    }

    surroundingCoords(): Coordinates[] {
        let offsets: [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        return offsets.map(o => this.applyOffset(o));
    }

    applyOffset(offset: [number, number]): Coordinates {
        return new Coordinates({ x: this.x + offset[0], y: this.y + offset[1] });
    }

    calculateOffset(other: Coordinates): [number, number] {
        return [other.x - this.x, other.y - this.y];
    }

    equals(other: Coordinates): boolean {
        return this.x === other.x && this.y === other.y;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }

}

