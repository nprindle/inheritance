// Enforces that a method is overriden from the superclass
// Used as an annotation: @override(superclass)
const override = <S>(superclass: { prototype: S }) =>
    <K extends keyof S, P extends Pick<S, K>>(
        proto: P,
        fields: K,
        descr: TypedPropertyDescriptor<S[K]>,
    ) => { }
