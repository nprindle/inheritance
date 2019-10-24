/// <reference path="Floor.ts" />

abstract class RoomEvent {
    abstract roomType: RoomType;

    // Upon entering each room, this will trigger some event for the room, such
    // as picking up a tool or starting a fight. After the event, a new event is
    // returned which is used the next time the room is entered. Some events
    // reoccur after a certain number of room entrances, so we inject the total
    // number here.
    abstract onRoomEnter(room: Room, roomsEntered: number): RoomEvent;

    private static parseWeights(weights: { name: string; weight: number }[]): [string, number][] {
        return weights.map(w => [w.name, w.weight]);
    }

    // This used to have a freaky JSON type on the parameter.
    // Now it has a FloorConfig class. So much cleaner.
    public static randomRoomEvent(settings: FloorConfig): RoomEvent {
        let roomType = settings.getRoomType();
        let event;
        if (roomType === RoomType.Enemy) {
            let enemy = settings.getEnemy();
            let recovery = Infinity; // TODO
            event = new EnemyRoomEvent(enemy, recovery);
        } else if (roomType === RoomType.Tool) {
            event = new EmptyRoomEvent(RoomType.Empty);
        } else if (roomType === RoomType.Modifier) {
            event = new ModifierRoomEvent(settings.getModifier());
        } else {
            return new EmptyRoomEvent(roomType);
        }
        return event;
    }
}

class EmptyRoomEvent extends RoomEvent {
    roomType = RoomType.Empty;

    constructor(roomType: RoomType.Empty | RoomType.Entrance | RoomType.Exit) {
        super();
        this.roomType = roomType;
    }

    onRoomEnter(room: Room, roomsEntered: number): RoomEvent {
        room.containerFloor.redraw();
        return this;
    }
}

class ToolRoomEvent extends RoomEvent {
    roomType = RoomType.Tool;

    constructor(private tool: Tool) {
        super();
    }

    onRoomEnter(room: Room, roomsEntered: number): RoomEvent {
        room.containerFloor.redraw();
        // TODO
        return new EmptyRoomEvent(RoomType.Empty);
    }
}

class EnemyRoomEvent extends RoomEvent {
    roomType = RoomType.Enemy;

    // The last roomsEntered count when the enemy was defeated
    private lastEntered: number = 0;
    private firstEntry: boolean = true;

    // The enemy is allowed to recover after the player has entered and left a
    // certain number of rooms; this is its recoveryTime
    constructor(private enemy: Enemy, private recoveryTime?: number) {
        super();
    }

    onRoomEnter(room: Room, roomsEntered: number): RoomEvent {
        // Note: we don't redraw if we fight the enemy
        if (this.firstEntry || (this.recoveryTime !== undefined && (roomsEntered - this.lastEntered) > this.recoveryTime)) {
            this.lastEntered = roomsEntered;
            if (this.firstEntry) {
                this.firstEntry = false;
            } else {
                this.enemy.heal(this.enemy.maxHealth);
            }
            new Fight(room.containerFloor.currentRun.player, this.enemy, room);
        } else {
            room.containerFloor.redraw();
        }
        return this;
    }
}

class ModifierRoomEvent extends RoomEvent {

    roomType = RoomType.Modifier;
    private modifier: Modifier;

    constructor(m: Modifier) {
        super();
        this.modifier = m;
    }

    onRoomEnter(room: Room, roomsEntered: number): RoomEvent {
        UI.fillScreen(UI.renderModifier(this.modifier, Game.currentRun.player, () => {
            room.containerFloor.redraw();
        }));
        return new EmptyRoomEvent(RoomType.Empty);
    }

}