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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
function appendText(text, node) {
    if (node === void 0) { node = document.body; }
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
}
var UI = (function () {
    function UI() {
    }
    UI.makeDiv = function (c, id) {
        var div = document.createElement('div');
        if (c) {
            div.classList.add(c);
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
        b.addEventListener('click', function (ev) {
            func.call(this, ev);
        });
        return b;
    };
    UI.renderCombatant = function (c, target, isTurn) {
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
            var currentDiv = UI.renderCombatTool(c.tools[i], c, i, target, isTurn);
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
    UI.renderCombatTool = function (t, c, i, target, isTurn) {
        var div = UI.renderTool(t);
        if (t.usesPerTurn < Infinity) {
            div.appendChild(UI.makeTextParagraph("(" + t.usesLeft + " use(s) left this turn)"));
        }
        if (p && i !== undefined) {
            div.appendChild(UI.makeButton('Use', function (e) {
                c.useTool(i, target);
                UI.redraw();
            }, !c.canAfford(t.cost) || !isTurn || t.usesLeft <= 0, 'use'));
        }
        return div;
    };
    UI.renderOfferTool = function (t, m) {
        var div = UI.renderTool(t);
        div.appendChild(UI.makeButton("Apply " + m.name, function (e) {
            m.apply(t);
            moveOn();
        }, false, 'apply'));
        return div;
    };
    UI.renderModifier = function (m, p, refusable) {
        if (refusable === void 0) { refusable = true; }
        var div = UI.makeDiv('modifier');
        div.appendChild(UI.makeTextParagraph(m.name, 'name'));
        div.appendChild(UI.makeTextParagraph(m.describe(), 'desc'));
        for (var i = 0; i < p.tools.length; i++) {
            div.appendChild(UI.renderOfferTool(p.tools[i], m));
        }
        if (refusable) {
            div.appendChild(UI.makeButton('No Thank You', function () {
                moveOn();
            }));
        }
        else {
            div.appendChild(UI.makeButton("Can't Refuse!", function () {
                moveOn();
            }, true));
        }
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
        return new (CombinationEffect.bind.apply(CombinationEffect, __spreadArrays([void 0], this.effects.map(function (x) { return x.clone(); }))))();
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
            return this.modifiers.join(' ') + " " + this._name + multString;
        },
        enumerable: true,
        configurable: true
    });
    Tool.prototype.use = function (user, target) {
        if (!user.canAfford(this.cost) || this.usesLeft <= 0) {
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
    Tool.prototype.clone = function () {
        var effectsClones = this.effects.map(function (x) { return x.clone(); });
        var t = new (Tool.bind.apply(Tool, __spreadArrays([void 0, this.name, this.cost.clone()], effectsClones)))();
        t.usesPerTurn = this.usesPerTurn;
        t.multiplier = this.multiplier;
        t.modifiers = this.modifiers;
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
        return _super.apply(this, __spreadArrays([name, health, energy], tools)) || this;
    }
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
        return _super.apply(this, __spreadArrays([name, health, energy], tools)) || this;
    }
    return Enemy;
}(Combatant));
var Fight = (function () {
    function Fight(p, e) {
        this.player = p;
        p.refresh();
        this.enemy = e;
        e.refresh();
        this.playersTurn = true;
        var closure = this;
        UI.setRedrawFunction(function () { closure.redraw(); });
        this.player.setDeathFunc(function () {
            closure.end();
        });
        this.enemy.setDeathFunc(function () {
            closure.end();
        });
        this.draw();
    }
    Fight.prototype.endTurn = function () {
        this.playersTurn = !this.playersTurn;
        this.player.refresh();
        this.enemy.refresh();
        console.log('turn ended :)');
        UI.redraw();
    };
    Fight.prototype.endTurnButton = function () {
        var closure = this;
        return UI.makeButton('End Turn', function () { closure.endTurn(); }, false, 'endturn');
    };
    Fight.prototype.draw = function () {
        this.div = UI.makeDiv('arena');
        document.body.appendChild(this.div);
        this.redraw();
    };
    Fight.prototype.redraw = function () {
        this.div.innerHTML = '';
        this.div.appendChild(UI.renderCombatant(this.player, this.enemy, this.playersTurn));
        this.div.appendChild(UI.renderCombatant(this.enemy, this.player, !this.playersTurn));
        this.div.appendChild(this.endTurnButton());
    };
    Fight.prototype.end = function () {
        document.body.removeChild(this.div);
        moveOn();
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
        t.modifiers.push(this.name);
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
        console.log(acc);
        return Strings.conjoin(acc);
    };
    return Modifier;
}());
var ItemPool = (function () {
    function ItemPool() {
        this.items = {};
        this.keys = [];
    }
    ItemPool.prototype.add = function (key, item) {
        this.items[key] = item;
        this.keys.push(key);
    };
    ItemPool.prototype.get = function (key) {
        if (this.items[key].clone) {
            return this.items[key].clone();
        }
        else {
            return this.items[key];
        }
    };
    ItemPool.prototype.getRandom = function () {
        var key = this.keys[Math.floor(Math.random() * this.keys.length)];
        return this.get(key);
    };
    return ItemPool;
}());
var tools = new ItemPool();
var modifiers = new ItemPool();
tools.add('bandages', new Tool('Bandages', new Cost([1, CostTypes.Energy]), new HealingEffect(1)));
tools.add('singleton', new Tool('Singleton', new Cost([1, CostTypes.Energy]), new DamageEffect(5), new UsesMod(1)));
tools.add('sixshooter', new Tool('Six Shooter', new Cost([1, CostTypes.Energy]), new RepeatingEffect(new DamageEffect(1), 6), new UsesMod(1)));
tools.add('wrench', new Tool('Wrench', new Cost([1, CostTypes.Energy]), new DamageEffect(1)));
modifiers.add('jittering', new Modifier('Jittering', [ModifierTypes.CostMult, 2], [ModifierTypes.MultAdd, 1]));
modifiers.add('lightweight', new Modifier('Lightweight', [ModifierTypes.CostMult, 0], [ModifierTypes.UsesPerTurn, 1]));
modifiers.add('spiky', new Modifier('Spiky', [ModifierTypes.AddEnergyCost, 1], new DamageEffect(1)));
var p = new Player('The Kid', 10, 10);
var numEvents = 0;
p.tools = [
    tools.get('wrench'),
    tools.get('bandages'),
    tools.get('singleton')
];
function setUpFight(i) {
    var e = new Enemy('Goldfish', 10 + i * 5, 10);
    e.tools = [
        new Tool('Splish Splash', new Cost([1, CostTypes.Energy]), new NothingEffect()),
        new Tool('Violent Splash', new Cost([1, CostTypes.Energy]), new DamageEffect(1 + i))
    ];
    var f = new Fight(p, e);
}
function offerModifier() {
    var div = UI.makeDiv('offer');
    div.appendChild(UI.makeTextParagraph('You wanna modifier?'));
    var offer = modifiers.getRandom();
    div.appendChild(UI.renderModifier(offer, p));
    document.body.appendChild(div);
}
function moveOn() {
    numEvents++;
    document.body.innerHTML = '';
    switch (numEvents % 2) {
        case 0:
            setUpFight(Math.floor(numEvents / 2));
            break;
        case 1:
            offerModifier();
            break;
    }
}
window.onload = function () {
    setUpFight(0);
};
if (window.innerHeight === 0) {
    window.console.log('tools', tools);
    window.console.log('modifiers', modifiers);
}
