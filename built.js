var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function appendText(text, node) {
    if (node === void 0) { node = document.body; }
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
}
function filterInPlace(arr, pred) {
    var i = 0;
    var j = 0;
    while (i < arr.length) {
        var x = arr[i];
        if (pred(x)) {
            arr[j++] = x;
        }
        i++;
    }
    arr.length = j;
}
var RoomType;
(function (RoomType) {
    RoomType["Empty"] = "empty";
    RoomType["Entrance"] = "entrance";
    RoomType["Exit"] = "exit";
    RoomType["Enemy"] = "enemy";
    RoomType["Tool"] = "tool";
})(RoomType || (RoomType = {}));
var Room = (function () {
    function Room(containerFloor, type, entrance, distanceFromEntrance, hasPlayer, containedEnemy, containedTool) {
        this.containerFloor = containerFloor;
        this.type = type;
        this.exits = entrance ? [entrance] : [];
        if (entrance) {
            this.distanceFromEntrance = entrance.distanceFromEntrance + 1;
        }
        else {
            this.distanceFromEntrance = distanceFromEntrance || 0;
        }
        this.hasPlayer = hasPlayer || false;
        this.visited = false;
        if (containedEnemy)
            this.containedEnemy = containedEnemy;
        if (containedTool)
            this.containedTool = containedTool;
        this.blockedSides = [];
    }
    Room.prototype.continueFloor = function () {
        UI.fillScreen(UI.renderFloor(this.containerFloor));
    };
    Room.prototype.enter = function () {
        for (var i = 0; i < this.exits.length; i++) {
            this.exits[i].hasPlayer = false;
        }
        this.visited = true;
        this.hasPlayer = true;
        switch (this.type) {
            case RoomType.Enemy:
                if (this.containedEnemy.health != 0) {
                    var f = new Fight(this.containerFloor.currentRun.player, this.containedEnemy, this);
                    break;
                }
            case RoomType.Empty:
            case RoomType.Entrance:
            case RoomType.Exit:
            case RoomType.Tool:
                this.containerFloor.redraw();
                break;
        }
    };
    return Room;
}());
var Arrays = (function () {
    function Arrays() {
    }
    Arrays.flatten = function (arr) {
        return arr.reduce(function (acc, x) {
            if (acc === void 0) { acc = []; }
            return acc.concat(x);
        });
    };
    return Arrays;
}());
var floors = [
    {
        "height": 5,
        "width": 5,
        "minRooms": 15,
        "maxRooms": 20,
        "roomWeights": [
            { "name": "empty", "weight": 2 },
            { "name": "enemy", "weight": 10 },
            { "name": "tool", "weight": 1 }
        ],
        "enemies": [
            { "name": "goldfish", "weight": 1 },
            { "name": "goldfishwithagun", "weight": 1 }
        ],
        "tools": [
            { "name": "singleton", "weight": 1 },
            { "name": "sixshooter", "weight": 1 }
        ]
    }
];
var Random = (function () {
    function Random() {
    }
    Random.bool = function (chance) {
        if (chance === void 0) { chance = 0.5; }
        return Math.random() < chance;
    };
    Random.between = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    Random.intBetween = function (min, max) {
        return Random.between(min, max) << 0;
    };
    Random.lessThan = function (max) {
        return Random.between(0, max);
    };
    Random.intLessThan = function (max) {
        return Random.intBetween(0, max);
    };
    Random.intCoord = function (width, height) {
        return [Random.intLessThan(width), Random.intLessThan(height)];
    };
    Random.fromArray = function (arr) {
        return arr[Random.intBetween(0, arr.length)];
    };
    Random.weightedRandom = function (arr) {
        var totalWeight = arr.map(function (x) { return x[1]; }).reduce(function (acc, x) { return acc + x; });
        var weight = Random.between(0, totalWeight);
        var totalIndex = 0;
        for (var i = 0; i < arr.length; i++) {
            totalIndex += arr[i][1];
            if (totalIndex >= weight) {
                return arr[i][0];
            }
        }
        return arr[0][0];
    };
    return Random;
}());
var Floor = (function () {
    function Floor(level, currentRun) {
        this.currentRun = currentRun;
        var floorSettings = floors[0];
        this.width = floorSettings.width;
        this.height = floorSettings.height;
        this.roomCount = Random.intBetween(floorSettings.minRooms, floorSettings.minRooms + 1);
        var roomWeights = floorSettings.roomWeights.map(function (obj) { return [obj.name, obj.weight]; });
        var floorEnemies = floorSettings.enemies.map(function (obj) { return [obj.name, obj.weight]; });
        this.rooms = new Array(this.height);
        for (var i = 0; i < this.rooms.length; i++) {
            this.rooms[i] = new Array(this.width);
        }
        var entranceRoom = new Room(this, RoomType.Entrance);
        entranceRoom.hasPlayer = true;
        entranceRoom.visited = true;
        this.rooms[Random.intLessThan(this.height)][Random.intLessThan(this.width)] = entranceRoom;
        for (var i = 0; i < this.roomCount - 1; i++) {
            var roomIndex;
            var newRoomIndex;
            var maxRoomDistance = 0;
            while (true) {
                roomIndex = Random.intCoord(this.height, this.width);
                if (this.rooms[roomIndex[0]][roomIndex[1]] != undefined) {
                    var branchDirection = Random.intLessThan(4);
                    var newRoomOffset;
                    switch (branchDirection) {
                        case 0:
                            newRoomOffset = [1, 0];
                            break;
                        case 1:
                            newRoomOffset = [0, 1];
                            break;
                        case 2:
                            newRoomOffset = [-1, 0];
                            break;
                        case 3:
                            newRoomOffset = [0, -1];
                            break;
                    }
                    newRoomIndex = [roomIndex[0] + newRoomOffset[0], roomIndex[1] + newRoomOffset[1]];
                    if (newRoomIndex[0] > -1 && newRoomIndex[0] < this.height && newRoomIndex[1] > -1 && newRoomIndex[1] < this.width && this.rooms[newRoomIndex[0]][newRoomIndex[1]] == undefined)
                        break;
                }
            }
            var roomType = Random.weightedRandom(roomWeights);
            var newRoom;
            if (roomType == RoomType.Enemy) {
                newRoom = new Room(this, roomType, this.rooms[roomIndex[0]][roomIndex[1]], 0, false, enemies.get(Random.weightedRandom(floorEnemies)));
            }
            else {
                newRoom = new Room(this, roomType, this.rooms[roomIndex[0]][roomIndex[1]]);
            }
            this.rooms[newRoomIndex[0]][newRoomIndex[1]] = newRoom;
            this.rooms[roomIndex[0]][roomIndex[1]].exits.push(newRoom);
            maxRoomDistance = Math.max(maxRoomDistance, newRoom.distanceFromEntrance);
        }
        var minExitDistance = Math.ceil(maxRoomDistance * 3.0 / 4);
        var potentialExits = Arrays.flatten(this.rooms).filter(function (x) { return x.distanceFromEntrance >= minExitDistance; });
        var exitRoom = Random.fromArray(potentialExits);
        exitRoom.type = RoomType.Exit;
        console.log(this);
    }
    Floor.prototype.draw = function () {
        this.div = UI.makeDiv('map');
        document.body.appendChild(this.div);
        this.redraw();
    };
    Floor.prototype.redraw = function () {
        document.body.innerHTML = '';
        document.body.appendChild(UI.renderFloor(this));
    };
    Floor.prototype.end = function () {
        document.body.removeChild(this.div);
    };
    return Floor;
}());
var UI = (function () {
    function UI() {
    }
    UI.makeDiv = function (c, cList, id) {
        var div = document.createElement('div');
        if (c) {
            div.classList.add(c);
        }
        if (cList) {
            for (var i = 0; i < cList.length; i++) {
                div.classList.add(cList[i]);
            }
        }
        if (id) {
            div.id = id;
        }
        return div;
    };
    UI.makeTextParagraph = function (str, c, id) {
        var p = document.createElement('p');
        p.innerText = str;
        if (c) {
            p.classList.add(c);
        }
        if (id) {
            p.id = id;
        }
        return p;
    };
    UI.makeHeader = function (str, c, id, level) {
        if (level === void 0) { level = 1; }
        var h = document.createElement("h" + level);
        h.innerText = str;
        if (c) {
            h.classList.add(c);
        }
        if (id) {
            h.id = id;
        }
        return h;
    };
    UI.makeButton = function (str, func, disabled, c, id) {
        if (disabled === void 0) { disabled = false; }
        var b = document.createElement('button');
        b.type = 'button';
        b.disabled = disabled;
        b.innerText = str;
        if (c) {
            b.classList.add(c);
        }
        if (id) {
            b.id = id;
        }
        b.onclick = function (ev) {
            ev.preventDefault;
            func.call(this, ev);
        };
        return b;
    };
    UI.makeImg = function (src, c, id) {
        var img = document.createElement('img');
        img.src = src;
        if (c) {
            img.classList.add(c);
        }
        if (id) {
            img.id = id;
        }
        return img;
    };
    UI.makeRoomIcon = function (str) {
        return UI.makeImg("assets/temp_" + str + ".png", 'room-icon');
    };
    UI.fakeClick = function (elem) {
        elem.classList.remove('fakeclick');
        elem.classList.add('fakeclick');
        window.setTimeout(function () {
            elem.onclick(new MouseEvent('click'));
            elem.classList.remove('fakeclick');
        }, 500);
    };
    UI.renderCombatant = function (c, target, isTurn, buttonArr) {
        var which;
        if (c instanceof Player) {
            which = 'player';
        }
        else {
            which = 'enemy';
        }
        var div = UI.makeDiv(which);
        div.appendChild(UI.makeTextParagraph(c.name, 'name'));
        div.appendChild(UI.makeTextParagraph("Health: " + c.health + " / " + c.maxHealth, 'health'));
        div.appendChild(UI.makeTextParagraph("Energy: " + c.energy + " / " + c.maxEnergy, 'energy'));
        var toolDiv = document.createElement('div');
        toolDiv.classList.add('tools');
        for (var i = 0; i < c.tools.length; i++) {
            var currentDiv = UI.renderCombatTool(c.tools[i], c, i, target, isTurn, buttonArr);
            currentDiv.classList.add("tool_" + i);
            toolDiv.appendChild(currentDiv);
        }
        div.appendChild(toolDiv);
        return div;
    };
    UI.renderTool = function (t) {
        var div = UI.makeDiv('tool');
        div.appendChild(UI.makeTextParagraph(t.name, 'name'));
        div.appendChild(UI.makeTextParagraph("Cost: " + t.cost.toString(), 'cost'));
        div.appendChild(UI.makeTextParagraph(t.effectsString(), 'effect'));
        if (t.multiplier > 1) {
            div.appendChild(UI.makeTextParagraph("x" + t.multiplier, 'multiplier'));
        }
        return div;
    };
    UI.renderCombatTool = function (t, c, i, target, isTurn, buttonArr) {
        var div = UI.renderTool(t);
        if (t.usesPerTurn < Infinity) {
            div.appendChild(UI.makeTextParagraph("(" + t.usesLeft + " use(s) left this turn)"));
        }
        if (c && i !== undefined && target !== undefined) {
            var b = UI.makeButton('Use', function (e) {
                c.useTool(i, target);
                UI.redraw();
            }, !t.usableBy(c) || !isTurn, 'use');
            div.appendChild(b);
            if (buttonArr !== undefined) {
                buttonArr.push(b);
            }
        }
        return div;
    };
    UI.renderOfferTool = function (t, m, callback) {
        var div = UI.renderTool(t);
        if (t.usesPerTurn < Infinity) {
            div.appendChild(UI.makeTextParagraph("usable " + t.usesPerTurn + " time(s) per turn"));
        }
        div.appendChild(UI.makeButton("Apply " + m.name, function (e) {
            m.apply(t);
            callback();
        }, false, 'apply'));
        return div;
    };
    UI.renderModifier = function (m, p, exitCallback, refusable) {
        if (refusable === void 0) { refusable = true; }
        var div = UI.makeDiv('modifier');
        div.appendChild(UI.makeTextParagraph(m.name, 'name'));
        div.appendChild(UI.makeTextParagraph(m.describe(), 'desc'));
        for (var i = 0; i < p.tools.length; i++) {
            div.appendChild(UI.renderOfferTool(p.tools[i], m, exitCallback));
        }
        if (refusable) {
            div.appendChild(UI.makeButton('No Thank You', function () {
                exitCallback();
            }));
        }
        else {
            div.appendChild(UI.makeButton("Can't Refuse!", function () { }, true));
        }
        return div;
    };
    UI.renderFloor = function (floor) {
        console.log(floor);
        var div = UI.makeDiv("map");
        div.innerHTML = '';
        for (var i = 0; i < floor.height; i++) {
            var row = UI.makeDiv("map-row");
            for (var j = 0; j < floor.width; j++) {
                var currentRoom = floor.rooms[i][j];
                var visible = false;
                if (currentRoom) {
                    row.appendChild(UI.renderRoom(currentRoom));
                }
                else {
                    row.appendChild(UI.makeDiv("room", ["none"]));
                }
            }
            div.appendChild(row);
        }
        return div;
    };
    UI.renderRoom = function (room, visible) {
        var div = UI.makeDiv("room");
        div.classList.add(room.type + "-room");
        var visible = room.hasPlayer;
        for (var i = 0; i < room.exits.length && !visible; i++) {
            if (room.exits[i].hasPlayer) {
                visible = true;
            }
        }
        if (visible) {
            div.classList.add("visible");
            if (room.hasPlayer) {
                div.appendChild(UI.makeRoomIcon('player'));
            }
            else if (room.type !== RoomType.Empty) {
                div.appendChild(UI.makeRoomIcon(room.type));
            }
            div.appendChild(UI.makeButton("Go!", function (e) {
                room.enter();
            }));
        }
        if (room.visited)
            div.classList.add("visited");
        else
            div.classList.add("unvisited");
        div.appendChild(document.createTextNode(room.distanceFromEntrance.toString()));
        return div;
    };
    UI.renderMainTitle = function () {
        return UI.makeImg('assets/temp_logo.png', 'logo');
    };
    UI.renderTitleScreen = function (options) {
        var div = UI.makeDiv('titlescreen');
        div.appendChild(UI.renderMainTitle());
        div.appendChild(UI.renderOptions(options));
        return div;
    };
    UI.renderOptions = function (options) {
        var buttons = UI.makeDiv('buttons');
        for (var i = 0; i < options.length; i++) {
            buttons.appendChild(UI.makeButton(options[i][0], options[i][1]));
        }
        return buttons;
    };
    UI.renderCreditsEntry = function (entry) {
        var div = UI.makeDiv('entry');
        if (entry.roles.length > 0) {
            div.appendChild(UI.makeHeader(entry.name, 'name', undefined, 2));
            div.appendChild(UI.makeTextParagraph(entry.roles.join(', '), 'roles'));
        }
        else {
            div.appendChild(UI.makeTextParagraph(entry.name, 'sololine'));
        }
        return div;
    };
    UI.renderCredits = function (credits, endfunc) {
        var div = UI.makeDiv('credits');
        div.appendChild(UI.renderMainTitle());
        credits.map(function (x) { return UI.renderCreditsEntry(x); }).forEach(function (val) {
            div.appendChild(val);
        });
        if (endfunc) {
            div.appendChild(UI.makeButton('Return to Title', endfunc));
        }
        return div;
    };
    UI.renderCharacterSelect = function (callback, exit) {
        var chars = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            chars[_i - 2] = arguments[_i];
        }
        var div = UI.makeDiv('charselect');
        div.appendChild(UI.makeHeader('Choose Your Character'));
        var tuples = chars.map(function (char) { return [char.name, function () { return callback(char); }]; });
        div.appendChild(UI.renderOptions(tuples.concat([['Back to Title', exit]])));
        return div;
    };
    UI.setRedrawFunction = function (f) {
        UI.redrawFunction = f;
    };
    UI.redraw = function () {
        if (UI.redrawFunction) {
            UI.redrawFunction();
        }
    };
    UI.fillScreen = function () {
        var elems = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            elems[_i] = arguments[_i];
        }
        document.body.innerHTML = '';
        elems.forEach(function (elem) { return document.body.appendChild(elem); });
    };
    return UI;
}());
var AbstractEffect = (function () {
    function AbstractEffect() {
    }
    AbstractEffect.prototype.activate = function (user, foe) {
        this.effect(user, foe);
    };
    return AbstractEffect;
}());
var NothingEffect = (function (_super) {
    __extends(NothingEffect, _super);
    function NothingEffect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NothingEffect.prototype.effect = function (user, foe) {
        return;
    };
    NothingEffect.prototype.toString = function () {
        return 'do nothing';
    };
    NothingEffect.prototype.clone = function () {
        return new NothingEffect();
    };
    return NothingEffect;
}(AbstractEffect));
var CombinationEffect = (function (_super) {
    __extends(CombinationEffect, _super);
    function CombinationEffect() {
        var effects = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            effects[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.effects = effects;
        return _this;
    }
    CombinationEffect.prototype.effect = function (user, foe) {
        for (var i = 0; i < this.effects.length; i++) {
            this.effects[i].activate(user, foe);
        }
    };
    CombinationEffect.prototype.toString = function () {
        var acc = [];
        for (var i = 0; i < this.effects.length; i++) {
            acc.push(this.effects[i].toString());
        }
        return acc.join(' ');
    };
    CombinationEffect.prototype.clone = function () {
        return new (CombinationEffect.bind.apply(CombinationEffect, [void 0].concat(this.effects.map(function (x) { return x.clone(); }))))();
    };
    return CombinationEffect;
}(AbstractEffect));
var RepeatingEffect = (function (_super) {
    __extends(RepeatingEffect, _super);
    function RepeatingEffect(next, times) {
        var _this = _super.call(this) || this;
        _this.next = next;
        _this.times = times;
        return _this;
    }
    RepeatingEffect.prototype.effect = function (user, foe) {
        for (var i = 0; i < this.times; i++) {
            this.next.activate(user, foe);
        }
    };
    RepeatingEffect.prototype.toString = function () {
        return this.next.toString() + " " + this.times + " times";
    };
    RepeatingEffect.prototype.clone = function () {
        return new RepeatingEffect(this.next.clone(), this.times);
    };
    return RepeatingEffect;
}(AbstractEffect));
var CounterEffect = (function (_super) {
    __extends(CounterEffect, _super);
    function CounterEffect(next, count) {
        var _this = _super.call(this) || this;
        _this.next = next;
        _this.maxCounter = count;
        _this.currentCounter = count;
        return _this;
    }
    CounterEffect.prototype.effect = function (user, foe) {
        this.currentCounter--;
        if (this.currentCounter <= 0) {
            this.next.activate(user, foe);
            this.currentCounter = this.maxCounter;
        }
    };
    CounterEffect.prototype.toString = function () {
        if (this.currentCounter === 1) {
            return "next use, " + this.next.toString();
        }
        else {
            return "in " + this.currentCounter + " uses, " + this.next.toString();
        }
    };
    CounterEffect.prototype.clone = function () {
        return new CounterEffect(this.next.clone(), this.maxCounter);
    };
    return CounterEffect;
}(AbstractEffect));
var CostTypes;
(function (CostTypes) {
    CostTypes[CostTypes["Health"] = 0] = "Health";
    CostTypes[CostTypes["Energy"] = 1] = "Energy";
})(CostTypes || (CostTypes = {}));
var Cost = (function () {
    function Cost() {
        var costs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            costs[_i] = arguments[_i];
        }
        this.energyCost = 0;
        this.healthCost = 0;
        for (var i = 0; i < costs.length; i++) {
            this.addTuple(costs[i]);
        }
    }
    Cost.prototype.magnitude = function () {
        return this.energyCost + this.healthCost;
    };
    Cost.prototype.addTuple = function (cost) {
        switch (cost[1]) {
            case CostTypes.Health:
                this.healthCost += cost[0];
                break;
            case CostTypes.Energy:
                this.energyCost += cost[0];
                break;
        }
    };
    Cost.prototype.toString = function () {
        var acc = [];
        if (this.energyCost > 0) {
            acc.push(this.energyCost + " Energy");
        }
        if (this.healthCost > 0) {
            acc.push(this.healthCost + " Health");
        }
        if (acc.length === 0) {
            return 'Free';
        }
        return acc.join(', ');
    };
    Cost.prototype.addString = function () {
        var acc = [];
        if (this.energyCost > 0) {
            acc.push("+" + this.energyCost + " Energy Cost");
        }
        if (this.healthCost > 0) {
            acc.push("+" + this.healthCost + " Health Cost");
        }
        return acc.join(', ');
    };
    Cost.prototype.scale = function (i) {
        this.healthCost *= i;
        this.energyCost *= i;
    };
    Cost.prototype.addCost = function (c) {
        this.healthCost += c.healthCost;
        this.energyCost += c.energyCost;
    };
    Cost.prototype.clone = function () {
        var c = new Cost();
        c.addCost(this);
        return c;
    };
    return Cost;
}());
var Strings = (function () {
    function Strings() {
    }
    Strings.capitalize = function (str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    };
    Strings.conjoin = function (strs) {
        return strs.map(function (x) { return Strings.capitalize(x) + "."; }).join(' ');
    };
    Strings.powerTuple = function (tuple) {
        if (tuple[1] <= 1) {
            return tuple[0];
        }
        return "" + tuple[0] + Strings.power(tuple[1]);
    };
    Strings.power = function (n) {
        var digits = ("" + n).split('').map(function (x) { return parseInt(x); });
        return digits.map(function (x) { return Strings.superscripts[x]; }).join('');
    };
    Strings.superscripts = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
    return Strings;
}());
var ToolMod = (function () {
    function ToolMod() {
    }
    return ToolMod;
}());
var UsesMod = (function (_super) {
    __extends(UsesMod, _super);
    function UsesMod(n) {
        var _this = _super.call(this) || this;
        _this.num = n;
        return _this;
    }
    UsesMod.prototype.apply = function (t) {
        t.usesPerTurn = this.num;
    };
    return UsesMod;
}(ToolMod));
var Tool = (function () {
    function Tool(name, cost) {
        var effects = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            effects[_i - 2] = arguments[_i];
        }
        this._name = name;
        this.cost = cost;
        this.effects = [];
        this.modifiers = [];
        this.multiplier = 1;
        this.usesPerTurn = Infinity;
        this.usesLeft = this.usesPerTurn;
        for (var i = 0; i < effects.length; i++) {
            var curr = effects[i];
            if (curr instanceof AbstractEffect) {
                this.effects.push(curr);
            }
            else if (curr instanceof ToolMod) {
                curr.apply(this);
            }
        }
    }
    Object.defineProperty(Tool.prototype, "name", {
        get: function () {
            var multString = '';
            if (this.modifiers.length === 0) {
                return "" + this._name + multString;
            }
            return this.modifiers.map(Strings.powerTuple).join(' ') + " " + this._name + multString;
        },
        enumerable: true,
        configurable: true
    });
    Tool.prototype.usableBy = function (user) {
        return user.canAfford(this.cost) && this.usesLeft > 0;
    };
    Tool.prototype.use = function (user, target) {
        if (!this.usableBy(user)) {
            return;
        }
        user.pay(this.cost);
        for (var i = 0; i < this.multiplier; i++) {
            for (var i_1 = 0; i_1 < this.effects.length; i_1++) {
                this.effects[i_1].activate(user, target);
            }
        }
        this.usesLeft--;
    };
    Tool.prototype.refresh = function () {
        this.usesLeft = this.usesPerTurn;
    };
    Tool.prototype.effectsString = function () {
        var acc = [];
        for (var i = 0; i < this.effects.length; i++) {
            acc.push(Strings.capitalize(this.effects[i].toString()) + '.');
        }
        return acc.join(' ');
    };
    Tool.prototype.addModifierString = function (str) {
        for (var i = 0; i < this.modifiers.length; i++) {
            if (this.modifiers[i][0] === str) {
                this.modifiers[i][1]++;
                return;
            }
        }
        this.modifiers.push([str, 1]);
    };
    Tool.prototype.clone = function () {
        var effectsClones = this.effects.map(function (x) { return x.clone(); });
        var t = new (Tool.bind.apply(Tool, [void 0, this.name, this.cost.clone()].concat(effectsClones)))();
        t.usesPerTurn = this.usesPerTurn;
        t.multiplier = this.multiplier;
        var modifiers = [];
        for (var i = 0; i < this.modifiers.length; i++) {
            modifiers[i] = [this.modifiers[i][0], this.modifiers[i][1]];
        }
        t.modifiers = modifiers;
        return t;
    };
    return Tool;
}());
var Combatant = (function () {
    function Combatant(name, health, energy) {
        var tools = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            tools[_i - 3] = arguments[_i];
        }
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.energy = energy;
        this.maxEnergy = energy;
        this.tools = tools;
        this.deathFunc = function () { };
    }
    ;
    Combatant.prototype.status = function () {
        return this.name + ": " + this.health + " / " + this.maxHealth;
    };
    ;
    Combatant.prototype.wound = function (damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
    };
    ;
    Combatant.prototype.heal = function (amount) {
        this.health += amount;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    };
    ;
    Combatant.prototype.refresh = function () {
        this.energy = this.maxEnergy;
        for (var i = 0; i < this.tools.length; i++) {
            this.tools[i].refresh();
        }
    };
    Combatant.prototype.canAfford = function (cost) {
        return this.health > cost.healthCost && this.energy >= cost.energyCost;
    };
    ;
    Combatant.prototype.pay = function (cost) {
        this.wound(cost.healthCost);
        this.energy -= cost.energyCost;
    };
    ;
    Combatant.prototype.validMoves = function () {
        var result = [];
        for (var i = 0; i < this.tools.length; i++) {
            if (this.tools[i].usableBy(this)) {
                result.push(i);
            }
        }
        return result;
    };
    Combatant.prototype.useTool = function (index, target) {
        if (index < 0 || index > this.tools.length) {
            return;
        }
        var tool = this.tools[index];
        tool.use(this, target);
    };
    ;
    Combatant.prototype.die = function () {
        this.deathFunc.call(this);
    };
    Combatant.prototype.setDeathFunc = function (f) {
        this.deathFunc = f;
    };
    return Combatant;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(name, health, energy) {
        var tools = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            tools[_i - 3] = arguments[_i];
        }
        return _super.apply(this, [name, health, energy].concat(tools)) || this;
    }
    Player.prototype.clone = function () {
        return new (Player.bind.apply(Player, [void 0, this.name, this.health, this.energy].concat(this.tools.map(function (x) { return x.clone(); }))))();
    };
    return Player;
}(Combatant));
var DamageEffect = (function (_super) {
    __extends(DamageEffect, _super);
    function DamageEffect(damage) {
        var _this = _super.call(this) || this;
        _this.damage = damage;
        return _this;
    }
    DamageEffect.prototype.effect = function (user, target) {
        target.wound(this.damage);
    };
    DamageEffect.prototype.toString = function () {
        return "do " + this.damage + " damage";
    };
    DamageEffect.prototype.clone = function () {
        return new DamageEffect(this.damage);
    };
    return DamageEffect;
}(AbstractEffect));
var HealingEffect = (function (_super) {
    __extends(HealingEffect, _super);
    function HealingEffect(amount) {
        var _this = _super.call(this) || this;
        _this.amount = amount;
        return _this;
    }
    HealingEffect.prototype.effect = function (user, target) {
        user.heal(this.amount);
    };
    HealingEffect.prototype.toString = function () {
        return "recover " + this.amount + " health";
    };
    HealingEffect.prototype.clone = function () {
        return new HealingEffect(this.amount);
    };
    return HealingEffect;
}(AbstractEffect));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(name, health, energy) {
        var tools = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            tools[_i - 3] = arguments[_i];
        }
        return _super.apply(this, [name, health, energy].concat(tools)) || this;
    }
    Enemy.prototype.clone = function () {
        var copy = new (Enemy.bind.apply(Enemy, [void 0, this.name, this.health, this.energy].concat(this.tools.map(function (x) { return x.clone(); }))))();
        copy.utilityFunction = this.utilityFunction;
        return copy;
    };
    Enemy.prototype.utilityFunction = function (simulatedBot, simulatedHuman) {
        if (simulatedBot.health == 0) {
            return Number.MIN_VALUE;
        }
        if (simulatedHuman.health == 0) {
            return Number.MAX_VALUE;
        }
        return simulatedBot.health - simulatedHuman.health;
    };
    return Enemy;
}(Combatant));
var Fight = (function () {
    function Fight(p, e, inRoom) {
        var _this = this;
        this.player = p;
        p.refresh();
        this.enemy = e;
        e.refresh();
        if (inRoom)
            this.inRoom = inRoom;
        this.endCallback = function () { };
        this.playersTurn = true;
        this.enemyButtons = [];
        UI.setRedrawFunction(function () { _this.redraw(); });
        this.enemy.setDeathFunc(function () { _this.end(); });
        this.div = document.createElement('div');
        this.draw();
    }
    Fight.prototype.setEndCallback = function (f) {
        this.endCallback = f;
    };
    Fight.prototype.endTurn = function () {
        this.playersTurn = !this.playersTurn;
        this.player.refresh();
        this.enemy.refresh();
        this.enemyButtons = [];
        UI.redraw();
        if (!this.playersTurn) {
            var enemyMoveSequence = AI.bestMoveSequence(this.enemy, this.player, 2000);
            this.makeNextEnemyMove(enemyMoveSequence);
        }
    };
    Fight.prototype.makeNextEnemyMove = function (moveSequence) {
        var _this = this;
        console.log(moveSequence);
        if (moveSequence.length <= 0) {
            UI.fakeClick(this.enemyButtons[this.enemyButtons.length - 1]);
            return;
        }
        else {
            var move = moveSequence.shift();
            if (move !== undefined) {
                console.log("Move: " + move);
                UI.fakeClick(this.enemyButtons[move]);
                window.setTimeout(function () {
                    _this.makeNextEnemyMove(moveSequence);
                }, 750);
            }
        }
    };
    Fight.prototype.endTurnButton = function () {
        var _this = this;
        return UI.makeButton('End Turn', function () { _this.endTurn(); }, !this.playersTurn, 'endturn');
    };
    Fight.prototype.draw = function () {
        this.div = UI.makeDiv('arena');
        UI.fillScreen(this.div);
        this.redraw();
    };
    Fight.prototype.redraw = function () {
        this.div.innerHTML = '';
        this.div.appendChild(UI.renderCombatant(this.player, this.enemy, this.playersTurn));
        this.div.appendChild(UI.renderCombatant(this.enemy, this.player, false, this.enemyButtons));
        var etb = this.endTurnButton();
        this.div.appendChild(etb);
        this.enemyButtons.push(etb);
    };
    Fight.prototype.end = function () {
        document.body.removeChild(this.div);
        if (this.inRoom)
            this.inRoom.continueFloor();
        else
            this.endCallback();
    };
    return Fight;
}());
var ModifierTypes;
(function (ModifierTypes) {
    ModifierTypes[ModifierTypes["CostMult"] = 0] = "CostMult";
    ModifierTypes[ModifierTypes["MultAdd"] = 1] = "MultAdd";
    ModifierTypes[ModifierTypes["AddEnergyCost"] = 2] = "AddEnergyCost";
    ModifierTypes[ModifierTypes["Effect"] = 3] = "Effect";
    ModifierTypes[ModifierTypes["UsesPerTurn"] = 4] = "UsesPerTurn";
})(ModifierTypes || (ModifierTypes = {}));
var Modifier = (function () {
    function Modifier(name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.name = name;
        this.effects = [];
        this.costMultiplier = 1;
        this.multiplierAdd = 0;
        this.usesPerTurn = Infinity;
        this.costAdd = new Cost();
        for (var i = 0; i < args.length; i++) {
            var curr = args[i];
            if (curr instanceof AbstractEffect) {
                this.effects.push(curr);
            }
            else if (curr instanceof Array && typeof curr[0] === 'number' && typeof curr[1] === 'number') {
                this.addTuple(curr);
            }
        }
    }
    Modifier.prototype.addTuple = function (t) {
        switch (t[0]) {
            case ModifierTypes.CostMult:
                this.costMultiplier = t[1];
                break;
            case ModifierTypes.MultAdd:
                this.multiplierAdd = t[1];
                break;
            case ModifierTypes.AddEnergyCost:
                this.costAdd.addTuple([t[1], CostTypes.Energy]);
                break;
            case ModifierTypes.UsesPerTurn:
                this.usesPerTurn = t[1];
                break;
        }
    };
    Modifier.prototype.apply = function (t) {
        t.addModifierString(this.name);
        t.cost.scale(this.costMultiplier);
        t.cost.addCost(this.costAdd);
        t.multiplier += this.multiplierAdd;
        t.usesPerTurn = Math.min(this.usesPerTurn, t.usesPerTurn);
        for (var i = 0; i < this.effects.length; i++) {
            t.effects.push(this.effects[i].clone());
        }
    };
    Modifier.prototype.describe = function () {
        var acc = [];
        if (this.costMultiplier !== 1) {
            acc.push("cost x" + this.costMultiplier);
        }
        if (this.multiplierAdd > 0) {
            acc.push("multiplier +" + this.multiplierAdd);
        }
        if (this.costAdd.magnitude() > 0) {
            acc.push(this.costAdd.addString());
        }
        if (this.usesPerTurn < Infinity) {
            acc.push("limited to " + this.usesPerTurn + " use(s) per turn");
        }
        if (this.effects.length > 0) {
            var effectStrings = this.effects.map(function (x) { return x.toString(); });
            acc.push("Add effect(s): " + effectStrings.map(function (x) { return Strings.capitalize(x); }).join(' '));
        }
        return Strings.conjoin(acc);
    };
    Modifier.prototype.clone = function () {
        return this;
    };
    return Modifier;
}());
var ItemPoolEntry = (function () {
    function ItemPoolEntry(key, value, num) {
        var tags = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            tags[_i - 3] = arguments[_i];
        }
        this.key = key;
        this.value = value;
        this.tags = tags;
        this.sortingNumber = num;
    }
    ItemPoolEntry.prototype.get = function () {
        return this.value.clone();
    };
    ItemPoolEntry.prototype.hasTags = function () {
        var tags = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tags[_i] = arguments[_i];
        }
        return tags.length === 0 || this.tags.some(function (x) { return tags.indexOf(x) !== -1; });
    };
    return ItemPoolEntry;
}());
var ItemPool = (function () {
    function ItemPool(sorted) {
        if (sorted === void 0) { sorted = false; }
        this.items = {};
        this.keys = [];
        this.sorted = sorted;
    }
    ItemPool.prototype.add = function (key, item) {
        var tags = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            tags[_i - 2] = arguments[_i];
        }
        this.items[key] = new (ItemPoolEntry.bind.apply(ItemPoolEntry, [void 0, key, item, 0].concat(tags)))();
        this.keys.push(key);
    };
    ItemPool.prototype.addSorted = function (key, item, position) {
        var tags = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            tags[_i - 3] = arguments[_i];
        }
        this.items[key] = new (ItemPoolEntry.bind.apply(ItemPoolEntry, [void 0, key, item, position].concat(tags)))();
        this.keys.push(key);
    };
    ItemPool.prototype.get = function (key) {
        if (this.items[key] === undefined) {
            return null;
        }
        return this.items[key].get();
    };
    ItemPool.prototype.getRandom = function () {
        var key = Random.fromArray(this.keys);
        return this.get(key);
    };
    ItemPool.prototype.selectUnseenTags = function (seen, tags) {
        var _this = this;
        if (tags === void 0) { tags = []; }
        var fallbacks = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fallbacks[_i - 2] = arguments[_i];
        }
        var unseen = function (k) { return seen.indexOf(k) < 0; };
        var unseenMatching = [];
        var tagsMatch = this.keys.filter(function (k) {
            var _a;
            return (_a = _this.items[k]).hasTags.apply(_a, tags);
        });
        var _loop_1 = function (ts) {
            var matching = this_1.keys.filter(function (k) {
                var _a;
                return unseen(k) && (_a = _this.items[k]).hasTags.apply(_a, ts);
            });
            if (matching.length > 0) {
                unseenMatching = matching;
                return "break";
            }
        };
        var this_1 = this;
        for (var _a = 0, _b = [tags].concat(fallbacks); _a < _b.length; _a++) {
            var ts = _b[_a];
            var state_1 = _loop_1(ts);
            if (state_1 === "break")
                break;
        }
        if (unseenMatching.length == 0) {
            filterInPlace(seen, function (k) {
                var _a;
                return (_a = _this.items[k]).hasTags.apply(_a, tags);
            });
            return tagsMatch;
        }
        return unseenMatching;
    };
    ItemPool.prototype.selectAllUnseen = function (seen, tags) {
        var _this = this;
        if (tags === void 0) { tags = []; }
        var fallbacks = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fallbacks[_i - 2] = arguments[_i];
        }
        var unseen = this.selectUnseenTags.apply(this, [seen, tags].concat(fallbacks));
        return unseen.map(function (k) { return _this.get(k); }).filter(function (x) { return x !== null; });
    };
    ItemPool.prototype.selectRandomUnseen = function (seen, tags) {
        if (tags === void 0) { tags = []; }
        var fallbacks = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            fallbacks[_i - 2] = arguments[_i];
        }
        var unseen = this.selectUnseenTags.apply(this, [seen, tags].concat(fallbacks));
        var key = Random.fromArray(unseen);
        seen.push(key);
        return this.get(key);
    };
    ItemPool.prototype.getAll = function () {
        var _this = this;
        if (this.sorted) {
            return this.keys.map(function (x) { return _this.items[x]; })
                .sort(function (a, b) { return a.sortingNumber - b.sortingNumber; })
                .map(function (x) { return x.get(); }).filter(function (x) { return x !== null; });
        }
        return this.keys.map(function (x) { return _this.get(x); }).filter(function (x) { return x !== null; });
    };
    return ItemPool;
}());
var tools = new ItemPool();
var modifiers = new ItemPool();
var characters = new ItemPool(true);
var enemies = new ItemPool();
tools.add('bandages', new Tool('Bandages', new Cost([1, CostTypes.Energy]), new HealingEffect(1)));
tools.add('singleton', new Tool('Singleton', new Cost([1, CostTypes.Energy]), new DamageEffect(5), new UsesMod(1)));
tools.add('sixshooter', new Tool('Six Shooter', new Cost([3, CostTypes.Energy]), new RepeatingEffect(new DamageEffect(1), 6), new UsesMod(1)));
tools.add('splash', new Tool('Splash', new Cost([1, CostTypes.Energy]), new NothingEffect()));
tools.add('windupraygun', new Tool('Wind-Up Ray Gun', new Cost([1, CostTypes.Energy]), new CounterEffect(new DamageEffect(10), 3), new UsesMod(1)));
tools.add('wrench', new Tool('Wrench', new Cost([1, CostTypes.Energy]), new DamageEffect(1)));
modifiers.add('hearty', new Modifier('Hearty', new CounterEffect(new HealingEffect(1), 5)));
modifiers.add('jittering', new Modifier('Jittering', [ModifierTypes.CostMult, 2], [ModifierTypes.MultAdd, 1]));
modifiers.add('lightweight', new Modifier('Lightweight', [ModifierTypes.CostMult, 0], [ModifierTypes.UsesPerTurn, 1]));
modifiers.add('spiky', new Modifier('Spiky', [ModifierTypes.AddEnergyCost, 1], new DamageEffect(1)));
characters.addSorted('clone', new Player('The Clone', 10, 10, tools.get('windupraygun')), 1);
characters.addSorted('kid', new Player('The Granddaughter', 15, 10, tools.get('wrench')), 0);
enemies.add('goldfish', new Enemy('Goldfish', 10, 10, tools.get('splash'), tools.get('wrench')));
enemies.add('goldfishwithagun', new Enemy('Goldfish With A Gun', 10, 5, tools.get('sixshooter')));
var CreditsEntry = (function () {
    function CreditsEntry(name) {
        var roles = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            roles[_i - 1] = arguments[_i];
        }
        this.name = name;
        this.roles = roles;
    }
    return CreditsEntry;
}());
var Game = (function () {
    function Game() {
    }
    Game.showTitle = function () {
        UI.fillScreen(UI.renderTitleScreen([
            ['New Game', function () { return Game.showCharSelect(); }],
            ['Settings', function () { }],
            ['Files', function () { }],
            ['Credits', function () { return Game.showCredits(); }],
        ]));
    };
    Game.showCharSelect = function () {
        UI.fillScreen(UI.renderCharacterSelect.apply(UI, [Game.newRun, Game.showTitle].concat(characters.getAll())));
        console.log(characters.getAll());
    };
    Game.newRun = function (character) {
        Game.currentRun = new Run(character);
        Game.currentRun.start();
    };
    Game.showCredits = function () {
        UI.fillScreen(UI.renderCredits([
            new CreditsEntry('May Lawver', 'Team Lead', 'Design', 'Programming'),
            new CreditsEntry('Pranay Rapolu', 'Programming', 'Music'),
            new CreditsEntry('Grace Rarer', 'Programming'),
            new CreditsEntry('Prindle', 'Programming'),
            new CreditsEntry('Mitchell Philipp', 'Programming'),
            new CreditsEntry('Seong Ryoo', 'Art'),
            new CreditsEntry('Logo is based on the font "This Boring Party" by Tom7.'),
            new CreditsEntry('Map icons use various Tombats fonts by Tom7.')
        ], function () { return Game.showTitle(); }));
    };
    Game.showGameOver = function (run) {
        UI.fillScreen(UI.makeHeader('Game Over'), UI.renderOptions([
            ['Back to Title Screen', function () { return Game.showTitle(); }]
        ]));
    };
    return Game;
}());
window.onload = function () {
    Game.showTitle();
};
if (window.innerHeight === 0) {
    window.console.log('tools', tools);
    window.console.log('modifiers', modifiers);
    window.console.log('enemies', enemies);
    window.console.log('characters', characters);
}
var AI = (function () {
    function AI(aiCombatant, humanCombatant) {
        this.botCopy = aiCombatant.clone();
        this.humanCopy = humanCombatant.clone();
        this.bestSequence = [];
        this.bestSequenceScore = this.botCopy.utilityFunction(this.botCopy, this.humanCopy);
    }
    AI.prototype.search = function (iterations) {
        var startTime = new Date();
        for (var i = 0; i < iterations; i++) {
            var movesList = [];
            var dummyBot = this.botCopy.clone();
            var dummyHuman = this.humanCopy.clone();
            dummyBot.refresh();
            dummyHuman.refresh();
            while (true) {
                var possibleMoves = dummyBot.validMoves();
                if (dummyBot.health == 0) {
                    break;
                }
                if (possibleMoves.length == 0) {
                    break;
                }
                possibleMoves.push(-1);
                var chosenMove = Random.fromArray(possibleMoves);
                if (chosenMove == -1) {
                    break;
                }
                dummyBot.useTool(chosenMove, dummyHuman);
                movesList.push(chosenMove);
            }
            var consequence = dummyBot.utilityFunction(dummyBot, dummyHuman);
            if (consequence >= this.bestSequenceScore) {
                this.bestSequenceScore = consequence;
                this.bestSequence = movesList;
            }
        }
        var finishTime = new Date();
        var duration = finishTime.getTime() - startTime.getTime();
        console.log("Sim time (milliseconds): " + duration);
    };
    AI.bestMoveSequence = function (aiCombatant, humanCombatant, simIterations) {
        var sim = new AI(aiCombatant, humanCombatant);
        sim.search(simIterations);
        return sim.bestSequence;
    };
    return AI;
}());
var Run = (function () {
    function Run(player) {
        var _this = this;
        this.player = player;
        this.player.setDeathFunc(function () { return Game.showGameOver(_this); });
        this.numEvents = 0;
        this.seenEnemies = [];
        this.seenModifiers = [];
    }
    Run.prototype.start = function () {
        this.nextEvent();
    };
    Run.prototype.nextEvent = function () {
        this.numEvents++;
        UI.fillScreen(UI.renderFloor(new Floor(0, this)));
    };
    Run.prototype.offerModifier = function () {
        var _this = this;
        var m = modifiers.selectRandomUnseen(this.seenModifiers);
        UI.fillScreen(UI.renderModifier(m, this.player, function () { return _this.nextEvent(); }));
    };
    Run.prototype.startFight = function () {
        var _this = this;
        var enemy = enemies.selectRandomUnseen(this.seenEnemies);
        var f = new Fight(this.player, enemy);
        f.setEndCallback(function () { return _this.nextEvent(); });
    };
    return Run;
}());
