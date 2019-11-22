// Polyfills

interface Array<T> {
    includes(elem: T): boolean;
}

if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function(e) {
            return this.indexOf(e) !== -1;
        }
    });
}

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

