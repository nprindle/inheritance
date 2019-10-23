/// <reference path="Floor.ts" />
/// <reference path="RoomEvent.ts" />

class Room {
    // Some events reoccur after a certain number of room entrances, so we keep
    // track of the total number here
    private static roomsEntered: number = 0;

    containerFloor: Floor;
    coordinates: [number, number];
    exits: Room[];
    distanceFromEntrance: number;
    visited: boolean;
    hasPlayer: boolean;
    roomEvent: RoomEvent;

    constructor(containerFloor: Floor, coordinates: [number, number], roomEvent: RoomEvent, entrance?: Room, hasPlayer?: boolean) {
        this.containerFloor = containerFloor;
        this.coordinates = coordinates;
        this.roomEvent = roomEvent;
        this.exits = entrance ? [entrance] : [];
        this.distanceFromEntrance = entrance ? entrance.distanceFromEntrance + 1 : 0;
        this.hasPlayer = hasPlayer || false;
        this.visited = false;
    }

    continueFloor(): void {
        UI.fillScreen(UI.renderFloor(this.containerFloor));
    }

    enter(): void {
        Room.roomsEntered++;
        this.exits.forEach(e => e.hasPlayer = false);
        this.visited = true;
        this.hasPlayer = true;
        this.roomEvent = this.roomEvent.onRoomEnter(this, Room.roomsEntered);
    }

    getRoomType(): RoomType {
        return this.roomEvent.roomType;
    }

    getExitCoordinates(): [number, number][] {
        return this.exits.map(e => e.coordinates);
    }

    // Note: includes coordinates off the map as blocked
    getBlockedCoordinates(): [number, number][] {
        let offsets = [[1, 0], [0, 1], [-1, 0], [0, -1]] as [number, number][];
        let exitCoords: [number, number][] = this.exits.map(e => e.coordinates);
        let surrounding: [number, number][] = offsets.map(o => {
            return [this.coordinates[0] + o[0], this.coordinates[1] + o[1]];
        });
        return surrounding.filter(x => !exitCoords.some(c => c == x));
    }

    // Returns offsets from this room that are not accessible from this room. An
    // offset is one of [1, 0], [0, 1], [-1, 0], or [0, -1].
    getBlockedOffsets(): [number, number][] {
        let offsets = [[1, 0], [0, 1], [-1, 0], [0, -1]] as [number, number][];
        let exitCoords = this.exits.map(e => e.coordinates);
        return offsets.filter(offset => {
            let coord = [offset[0] + this.coordinates[0], offset[1] + this.coordinates[1]];
            return !exitCoords.some(c => c == coord);
        });
    }

}
