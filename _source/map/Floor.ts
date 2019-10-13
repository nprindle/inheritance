/// <reference path="Room.ts" />
/// <reference path="RoomType.ts" />
/// <reference path="../UI.ts" />

class Floor {
    width: number;
    height: number;

    roomCount: number;
    rooms: Array<Array<Room>>;

    div : HTMLElement;

    constructor(width: number, height: number, minRooms: number, maxRooms: number) {
        this.width = width;
        this.height = height;

        this.roomCount = Math.random() * (1 + maxRooms - minRooms) + minRooms;
        
        this.rooms = new Array<Array<Room>>(this.height);
        for (var i = 0; i < this.rooms.length; i++) {
            this.rooms[i] = new Array<Room>(this.width);
        }

        var entranceRoom = new Room(this, RoomType.Entrance);
        entranceRoom.hasPlayer = true;
        entranceRoom.visited = true;
        this.rooms[Math.floor(Math.random() * this.height)][Math.floor(Math.random() * this.width)] = entranceRoom;
        for (var i = 0; i < this.roomCount - 1 ; i++) {
            var roomIndex;
            var newRoomIndex;
            var maxRoomDistance = 0;
            while (true) {
                roomIndex = [Math.floor(Math.random() * this.height), Math.floor(Math.random() * this.width)];
                if (this.rooms[roomIndex[0]][roomIndex[1]] != undefined) {
                    var branchDirection = Math.floor(Math.random() * 4);
                    var newRoomOffset;
                    switch(branchDirection) {
                        case 0:
                            newRoomOffset = [1,0];
                            break;
                        case 1:
                            newRoomOffset = [0,1];
                            break;
                        case 2:
                            newRoomOffset = [-1,0];
                            break;
                        case 3:
                            newRoomOffset = [0,-1];
                    }
                    newRoomIndex = [roomIndex[0] + newRoomOffset[0], roomIndex[1] + newRoomOffset[1]];
                    if (newRoomIndex[0] > -1 && newRoomIndex[0] < this.height && newRoomIndex[1] > -1 && newRoomIndex[1] < this.width && this.rooms[newRoomIndex[0]][newRoomIndex[1]] == undefined) break;
                }
            }
            var newRoom = new Room(this, RoomType.Empty, this.rooms[roomIndex[0]][roomIndex[1]]);
            this.rooms[newRoomIndex[0]][newRoomIndex[1]] = newRoom;
            this.rooms[roomIndex[0]][roomIndex[1]].exits.push(newRoom);
            maxRoomDistance = Math.max(maxRoomDistance, newRoom.distanceFromEntrance);
        }
        var minExitDistance = Math.ceil(maxRoomDistance * 3.0 / 4);
        var potentialExits = [];
        for (var i = 0; i < this.height; i++) {
            for (var j = 0; j < this.width; j++) {
                if (this.rooms[i][j] && this.rooms[i][j].distanceFromEntrance >= minExitDistance) {
                    potentialExits.push(this.rooms[i][j]);
                }
            }
        }
        var exitRoom = potentialExits[Math.floor(Math.random() * potentialExits.length)];
        exitRoom.type = RoomType.Exit;
    }

    draw(): void {
        this.div = UI.makeDiv('map');
        document.body.appendChild(this.div);
        this.redraw();
    }
    
    redraw(): void {
        document.body.innerHTML = '';
        document.body.appendChild(UI.renderFloor(this));
    }
    
    end(): void {
        document.body.removeChild(this.div);
        moveOn();
    }
}