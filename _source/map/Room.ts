/// <reference path="RoomType.ts" />
/// <reference path="Floor.ts" />

class Room {
    containerFloor: Floor;
    type : RoomType;
    exits : Room[];
    distanceFromEntrance : number;
    visited: boolean;
    hasPlayer: boolean;

    constructor(containerFloor: Floor, type: RoomType, entrance? : Room, distanceFromEntrance? : number, hasPlayer? : boolean) {
        this.containerFloor = containerFloor;
        this.type = type;
        this.exits = entrance ? [entrance] : [];
        if (entrance) {
            this.distanceFromEntrance = entrance.distanceFromEntrance + 1
        } else {
            this.distanceFromEntrance = distanceFromEntrance || 0;
        }
        this.hasPlayer = hasPlayer || false;
        this.visited = false;
        console.log(this.exits);
    }

    enter(): void {
        console.log(this.exits);
        for (var i = 0; i < this.exits.length; i++) {
            this.exits[i].hasPlayer = false;
        }
        this.visited = true;
        this.hasPlayer = true;
        switch(this.type) {
            case RoomType.Empty:
            case RoomType.Entrance:
            case RoomType.Exit:
                this.containerFloor.redraw();
                break;
        }
    }
}