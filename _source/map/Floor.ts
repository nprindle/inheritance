/// <reference path="Room.ts" />
/// <reference path="RoomType.ts" />
/// <reference path="../Arrays.ts" />
/// <reference path="../UI.ts" />
/// <reference path="../floors.ts" />
/// <reference path="../Random.ts" />
/// <reference path="../SoundManager.ts" />

class Floor {
    floorName: string;
    song: MusicTracks;

    width: number;
    height: number;

    roomCount: number;
    rooms: Array<Array<Room>>;
    entranceRoom: Room;

    div: HTMLElement;

    currentRun: Run;

    constructor(level: number, currentRun: Run) {
        this.currentRun = currentRun
        let floorSettings: FloorConfig = floors[level];
        this.floorName = floorSettings.name;
        this.song = floorSettings.song;
        this.width = floorSettings.getWidth();
        this.height = floorSettings.getHeight();

        this.roomCount = floorSettings.getNumRooms();

        this.rooms = Arrays.generate(this.height, () => new Array<Room>(this.width));

        let entranceCoords = new Coordinates({
            x: Random.intLessThan(this.width),
            y: Random.intLessThan(this.height)
        });
        let entranceRoom = new Room(this, entranceCoords, new EmptyRoomEvent(RoomType.Entrance));
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
                    let dir = Random.fromNumericEnum(Direction);
                    let newRoomOffset = Directions.getOffset(dir);
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
        //only add exit if the floor supports it
        if (floorSettings.modifiers.indexOf(FloorModifiers.NO_EXIT) === -1) {
            let potentialExits = Arrays.flatten(this.rooms)
                .filter(room => !room.hasFurtherNeighbors())
                .sort((a, b) => b.distanceFromEntrance - a.distanceFromEntrance);
            let exitRoom = potentialExits[0];
            exitRoom.roomEvent = new ExitRoomEvent();
            assignableRooms = assignableRooms.filter(room => room !== exitRoom);
        }

        assignableRooms = Random.shuffle(assignableRooms);
        let events = floorSettings.getEvents();
        for (let i = 0; i < events.length && i < assignableRooms.length; i++) {
            assignableRooms[i].roomEvent = events[i];
        }
    }

    reveal(): void {
        this.rooms.forEach(arr => arr.forEach(room => {
            room.seen = true;
        }));
        this.redraw();
    }

    draw(): void {
        this.div = UI.makeDiv('map');
        document.body.appendChild(this.div);
        this.redraw();
    }

    redraw(): void {
        UI.showMapScreen();
    }

    end(): void {
        document.body.removeChild(this.div);
    }

    getRoomAt(coords: Coordinates): Room | undefined {
        return this.rooms[coords.y] && this.rooms[coords.y][coords.x];
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
