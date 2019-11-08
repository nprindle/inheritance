enum Direction {
    Right,
    Up,
    Left,
    Down,
}

namespace Directions {

    export function values(): Direction[] {
        return Object.keys(Direction).map(n => parseInt(n)).filter(n => !isNaN(n));
    }

    export function getOffset(dir: Direction): [number, number] {
        switch (dir) {
            case Direction.Up:
                return [0, -1];
            case Direction.Down:
                return [0, 1];
            case Direction.Left:
                return [-1, 0];
            case Direction.Right:
                return [1, 0];
        }
    }

}
