/// <reference path="RoomType.ts" />

class Room {
    type : RoomType;
    exits : Room[];
    distanceFromEntrance : number;
    visited: boolean;

    constructor(type: RoomType, entrance? : Room, distanceFromEntrance? : number) {
        this.type = type;
        this.exits = [entrance] || [];
        if (entrance) {
            this.distanceFromEntrance = entrance.distanceFromEntrance + 1
        } else {
            this.distanceFromEntrance = distanceFromEntrance || 0;
        }
        this.visited = false;
    }

    renderRoom() : HTMLElement {
        const div : HTMLElement = UI.makeDiv("room");
        div.classList.add(this.type);
        if (!this.visited) div.classList.add("unvisited");
        div.innerHTML = this.distanceFromEntrance.toString();
        return div;
    }
}