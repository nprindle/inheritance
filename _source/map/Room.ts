/// <reference path="Floor.ts" />
/// <reference path="RoomEvent.ts" />

class Room {
    // Some events reoccur after a certain number of room entrances, so we keep
    // track of the total number here
    private static roomsEntered: number = 0;

    containerFloor: Floor;
    exits: Room[];
    blockedSides: string[];
    distanceFromEntrance: number;
    visited: boolean;
    hasPlayer: boolean;
    roomEvent: RoomEvent;

    constructor(containerFloor: Floor, roomEvent: RoomEvent, entrance?: Room, hasPlayer?: boolean) {
        this.containerFloor = containerFloor;
        this.roomEvent = roomEvent;
        this.exits = entrance ? [entrance] : [];
        this.distanceFromEntrance = entrance ? entrance.distanceFromEntrance + 1 : 0;
        this.hasPlayer = hasPlayer || false;
        this.visited = false;
        this.blockedSides = [];
    }

    continueFloor(): void {
        UI.fillScreen(UI.renderFloor(this.containerFloor));
    }

    enter(): void {
        console.log("Entered");
        Room.roomsEntered++;
        this.exits.forEach(e => e.hasPlayer = false);
        this.visited = true;
        this.hasPlayer = true;
        this.roomEvent = this.roomEvent.onRoomEnter(this, Room.roomsEntered);
    }

    getRoomType(): RoomType {
        return this.roomEvent.roomType;
    }

}
