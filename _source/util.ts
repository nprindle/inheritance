// Enforces that a method is overriden from the superclass
// Used as an annotation: @override(superclass)
const override = <S>(superclass: { prototype: S }) =>
    <K extends keyof S, C extends S[K]>(
        proto: Pick<S, K>,
        fields: K,
        descr: TypedPropertyDescriptor<C>,
    ) => { }

