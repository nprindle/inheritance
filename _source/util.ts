// Debug-specific stuff

const DEBUG: boolean = false;

// Given a callback, only call it if in debug mode
const debug = function(f: () => void) {
    if (DEBUG) {
        f();
    }
}

// console.log, but only when in debug mode
const debugLog = function(...a: any[]) {
    if (DEBUG) {
        console.log(a);
    }
}

const ondebug = (target: Object, propertyKey: string, descr: TypedPropertyDescriptor<(...args: any[]) => void>) => {
    const original = descr.value;
    descr.value = (...args: any[]) => {
        if (DEBUG) {
            original(args);
        }
    }
}

// Enforces that a method is overriden from the superclass
// Used as an annotation: @override(superclass)
const override = <S>(superclass: { prototype: S }) =>
    <K extends keyof S, C extends S[K]>(
        proto: Pick<S, K>,
        fields: K,
        descr: TypedPropertyDescriptor<C>,
    ) => { };

// Polyfills

interface Array<T> {
    includes(elem: T): boolean;
    find(pred: (elem: T, ix?: number, thisArg?: Object) => boolean, thisArg?: Object | undefined): T | undefined;
    findIndex(pred: (elem: T, ix?: number, thisArg?: Object) => boolean, thisArg?: Object | undefined): number;
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function<T>(elem: T) {
            return this.indexOf(elem) !== -1;
        }
    });
}

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function<T>(predicate: (elem: T) => boolean, thisArg?: Object) {
            let len = this.length >>> 0;
            let k = 0;
            while (k < len) {
                let val = this[k];
                if (predicate.call(thisArg, val, k, this)) {
                    return val;
                }
                k++;
            }
            return undefined;
        }
    });
}

if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function<T>(predicate: (elem: T) => boolean, thisArg?: Object) {
            let len = this.length >>> 0;
            let k = 0;
            while (k < len) {
                let val = this[k];
                if (predicate.call(thisArg, val, k, this)) {
                    return k;
                }
                k++;
            }
            return -1;
        },
    });
}

