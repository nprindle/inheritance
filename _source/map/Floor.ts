/// <reference path="Room.ts" />
/// <reference path="RoomType.ts" />
/// <reference path="../Arrays.ts" />
/// <reference path="../UI.ts" />
/// <reference path="../floors.ts" />
/// <reference path="../Random.ts" />

class Floor {
    width: number;
    height: number;

    roomCount: number;
    rooms: Array<Array<Room>>;
    entranceRoom: Room;

    div: HTMLElement;

    currentRun: Run;

    constructor(level: number, currentRun: Run) {
        this.currentRun = currentRun
        let floorSettings = floors[level];
        this.width = floorSettings.getWidth();
        this.height = floorSettings.getHeight();

        this.roomCount = floorSettings.getNumRooms();

        this.rooms = Arrays.generate(this.height, () => new Array<Room>(this.width));

        let entranceCoords = new Coordinates({
            x: Random.intLessThan(this.width),
            y: Random.intLessThan(this.height)
        });
        let entranceRoom = new Room(this, entranceCoords, new EmptyRoomEvent(RoomType.Entrance));
        entranceRoom.visited = true;
        this.entranceRoom = entranceRoom;

        this.rooms[entranceCoords.y][entranceCoords.x] = entranceRoom;
        let assignableRooms = [];
        let maxRoomDistance = 0;
        for (let i = 0; i < this.roomCount - 1; i++) {
            let roomCoords;
            let newRoomCoords;
            do {
                roomCoords = Random.intCoord(this.height, this.width);
                if (this.rooms[roomCoords.y][roomCoords.x] !== undefined) {
                    let newRoomOffset = Floor.randomDirectionOffset();
                    newRoomCoords = roomCoords.applyOffset(newRoomOffset);
                }
            } while (!newRoomCoords || this.shouldGenNewRoom(newRoomCoords));

            let entrance = this.rooms[roomCoords.y][roomCoords.x];
            let newRoom = new Room(this, newRoomCoords, new EmptyRoomEvent(RoomType.Empty), entrance);
            this.rooms[newRoomCoords.y][newRoomCoords.x] = newRoom;

            this.rooms[roomCoords.y][roomCoords.x].exits.push(newRoom);
            assignableRooms.push(newRoom);
            maxRoomDistance = Math.max(maxRoomDistance, newRoom.distanceFromEntrance);
        }
        let minExitDistance = Math.ceil(maxRoomDistance * 3.0 / 4);
        let potentialExits = Arrays.flatten(this.rooms).filter(x => x.distanceFromEntrance >= minExitDistance);
        let exitRoom = Random.fromArray(potentialExits);
        exitRoom.roomEvent = new EmptyRoomEvent(RoomType.Exit);

        assignableRooms = assignableRooms.filter(room => room !== exitRoom);
        assignableRooms = Random.shuffle(assignableRooms);
        let events = floorSettings.getEvents();
        for (let i = 0; i < events.length && i < assignableRooms.length; i++) {
            assignableRooms[i].roomEvent = events[i];
        }
        UI.announce(floorSettings.name);
    }

    draw(): void {
        this.div = UI.makeDiv('map');
        document.body.appendChild(this.div);
        this.redraw();
    }

    redraw(): void {
        UI.fillScreen(UI.renderGameView(this, Game.currentRun.player));
    }

    end(): void {
        document.body.removeChild(this.div);
    }

    private static randomDirectionOffset(): [number, number] {
        let angle = Random.intLessThan(4) * Math.PI / 2;
        return [Math.cos(angle) << 0, Math.sin(angle) << 0];
    }

    private shouldGenNewRoom(coord: Coordinates): boolean {
        if (!coord) {
            return false;
        }
        let x = coord.x;
        let y = coord.y;
        return x <= -1 || x >= this.width || y <= -1 || y >= this.height || this.rooms[y][x] !== undefined;
    }

}
