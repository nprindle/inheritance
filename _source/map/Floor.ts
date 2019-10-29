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

    div: HTMLElement;

    currentRun: Run;

    constructor(level: number, currentRun: Run) {
        this.currentRun = currentRun
        let floorSettings = floors[level];
        this.width = floorSettings.getWidth();
        this.height = floorSettings.getHeight();

        this.roomCount = floorSettings.getNumRooms();

        this.rooms = new Array<Array<Room>>(this.height);
        for (let i = 0; i < this.rooms.length; i++) {
            this.rooms[i] = new Array<Room>(this.width);
        }

        let entranceCoords = [Random.intLessThan(this.height), Random.intLessThan(this.width)] as [number, number];
        let entranceRoom = new Room(this, entranceCoords, new EmptyRoomEvent(RoomType.Entrance));
        entranceRoom.hasPlayer = true;
        entranceRoom.visited = true;

        this.rooms[entranceCoords[0]][entranceCoords[1]] = entranceRoom;
        let assignableRooms = [];
        let maxRoomDistance = 0;
        for (let i = 0; i < this.roomCount - 1; i++) {
            let roomIndex;
            let newRoomIndex;
            do {
                roomIndex = Random.intCoord(this.height, this.width);
                if (this.rooms[roomIndex[0]][roomIndex[1]] !== undefined) {
                    let newRoomOffset = Floor.randomDirectionOffset();
                    newRoomIndex = [roomIndex[0] + newRoomOffset[0], roomIndex[1] + newRoomOffset[1]] as [number, number];
                }
            } while (!newRoomIndex || this.shouldGenNewRoom(newRoomIndex));
            let entrance = this.rooms[roomIndex[0]][roomIndex[1]]
            let newRoom = new Room(this, newRoomIndex, new EmptyRoomEvent(RoomType.Empty), entrance);
            this.rooms[newRoomIndex[0]][newRoomIndex[1]] = newRoom;
            this.rooms[roomIndex[0]][roomIndex[1]].exits.push(newRoom);
            assignableRooms.push(newRoom);
            maxRoomDistance = Math.max(maxRoomDistance, newRoom.distanceFromEntrance);
        }
        let minExitDistance = Math.ceil(maxRoomDistance * 3.0 / 4);
        let potentialExits = Arrays.flatten(this.rooms).filter(x => x.distanceFromEntrance >= minExitDistance);
        let exitRoom = Random.fromArray(potentialExits);
        exitRoom.roomEvent = new EmptyRoomEvent(RoomType.Exit);

        assignableRooms = assignableRooms.filter(room => room !== exitRoom);
        let events = floorSettings.getEvents(assignableRooms.length);
        for (let i = 0; i < events.length; i++) {
            assignableRooms[i].roomEvent = events[i];
        }
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

    private shouldGenNewRoom(coord: [number, number]): boolean {
        if (!coord) {
            return false;
        }
        let x = coord[0];
        let y = coord[1];
        return x <= -1 || x >= this.height || y <= -1 || y >= this.width || this.rooms[x][y] !== undefined;
    }

}
