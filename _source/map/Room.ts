/// <reference path="../Coordinates.ts" />
/// <reference path="Floor.ts" />
/// <reference path="RoomEvent.ts" />

class Room {
    // Some events reoccur after a certain number of room entrances, so we keep
    // track of the total number here
    private static roomsEntered: number = 0;

    // TODO: can this be decoupled?
    containerFloor: Floor;
    coordinates: Coordinates;
    exits: Room[];
    distanceFromEntrance: number;
    visited: boolean;
    seen: boolean;
    roomEvent: RoomEvent;

    constructor(containerFloor: Floor, coordinates: Coordinates, roomEvent: RoomEvent, entrance?: Room) {
        this.containerFloor = containerFloor;
        this.coordinates = coordinates;
        this.roomEvent = roomEvent;
        this.exits = entrance ? [entrance] : [];
        this.distanceFromEntrance = entrance ? entrance.distanceFromEntrance + 1 : 0;
        this.visited = false;
        this.seen = false;
    }

    continueFloor(): void {
        this.containerFloor.redraw();
    }

    enter(): void {
        Game.currentRun.movePlayer(this.coordinates);
        Room.roomsEntered++;
        this.visited = true;
        this.exits.forEach(room => room.seen = true);
        this.roomEvent = this.roomEvent.onRoomEnter(this, Room.roomsEntered);
    }

    getRoomType(): RoomType {
        return this.roomEvent.roomType;
    }

    getIcon(): RoomIcon {
        return this.roomEvent.roomIcon;
    }

    // Returns true if some of this room's neighbors are further from the entrance.
    hasFurtherNeighbors(): boolean {
        return this.exits.some(exit => exit.distanceFromEntrance > this.distanceFromEntrance);
    }

    // Get the coordinates of all exits from this room
    getExitCoordinates(): Coordinates[] {
        return this.exits.map(e => e.coordinates);
    }

    // Note: includes coordinates off the map as blocked
    getBlockedCoordinates(): Coordinates[] {
        let exitCoords = this.getExitCoordinates();
        let surrounding = this.coordinates.surroundingCoords();
        return surrounding.filter(x => !exitCoords.some(c => x.equals(c)));
    }

    getBlockedDirections(): Direction[] {
        let directions = Directions.values();
        let exitCoords = this.getExitCoordinates();
        return directions.filter(d => {
            let offset = Directions.getOffset(d);
            let coord = this.coordinates.applyOffset(offset);
            return !exitCoords.some(c => coord.equals(c));
        });
    }

    clearEvent(): void {
        this.roomEvent = new EmptyRoomEvent(RoomType.Empty);
    }

}
