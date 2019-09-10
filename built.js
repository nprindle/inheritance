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
    UI.makeTextParagraph = function (str, id) {
        var p = document.createElement('p');
        p.innerText = str;
        if (id) {
            p.id = id;
        }
        return p;
    };
    UI.renderPlayer = function (p) {
        var div = document.createElement('div');
        div.appendChild(UI.makeTextParagraph(p.name));
        div.appendChild(UI.makeTextParagraph("Health: " + p.health + " / " + p.maxHealth));
        div.appendChild(UI.makeTextParagraph("Energy: " + p.energy + " / " + p.maxEnergy));
        return div;
    };
    return UI;
}());
var AbstractEffect = (function () {
    function AbstractEffect() {
        this.next = null;
    }
    AbstractEffect.prototype.activate = function (user, foe) {
        this.effect(user, foe);
        if (this.next instanceof AbstractEffect) {
            this.next.activate(user, foe);
        }
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
    return CombinationEffect;
}(AbstractEffect));
var RepeatingEffect = (function (_super) {
    __extends(RepeatingEffect, _super);
    function RepeatingEffect(times) {
        var _this = _super.call(this) || this;
        _this.times = times;
        return _this;
    }
    RepeatingEffect.prototype.effect = function (user, foe) {
        if (this.next instanceof AbstractEffect) {
            for (var i = 0; i < this.times - 1; i++) {
                this.next.activate(user, foe);
            }
        }
    };
    return RepeatingEffect;
}(AbstractEffect));
var AppendingEffect = (function (_super) {
    __extends(AppendingEffect, _super);
    function AppendingEffect(text) {
        var _this = _super.call(this) || this;
        _this.text = text;
        return _this;
    }
    AppendingEffect.prototype.effect = function (user, foe) {
        document.body.appendChild(document.createTextNode(this.text));
    };
    return AppendingEffect;
}(AbstractEffect));
var CostTypes;
(function (CostTypes) {
    CostTypes["Health"] = "Health";
    CostTypes["Energy"] = "Energy";
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
    return Cost;
}());
var Tool = (function () {
    function Tool(name, effect, cost) {
        this.name = name;
        this.effect = effect;
        this.cost = cost;
    }
    Tool.prototype.addModifier = function (modifier) {
        modifier.next = this.effect;
        this.effect = modifier;
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
    }
    ;
    Combatant.prototype.status = function () {
        return this.name + ": " + this.health + " / " + this.maxHealth;
    };
    ;
    Combatant.prototype.wound = function (damage) {
        this.health -= damage;
        if (this.health <= 0) {
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
        if (!this.canAfford(tool.cost)) {
            return;
        }
        else {
            this.pay(tool.cost);
            tool.effect.activate(this, target);
        }
    };
    ;
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
    Player.prototype.die = function () {
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
    return DamageEffect;
}(AbstractEffect));
var p = new Player('The Kid', 10, 10);
document.body.appendChild(UI.renderPlayer(p));
var effect = new RepeatingEffect(10);
effect.next = new DamageEffect(1);
effect.activate(p, p);
