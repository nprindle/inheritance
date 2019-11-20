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

// Enforces that a method is overriden from the superclass
// Used as an annotation: @override(superclass)
const override = <S>(superclass: { prototype: S }) =>
    <K extends keyof S, C extends S[K]>(
        proto: Pick<S, K>,
        fields: K,
        descr: TypedPropertyDescriptor<C>,
    ) => { }

