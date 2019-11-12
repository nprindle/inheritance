function appendText(text: string, node: HTMLElement = document.body): void {
    const textnode = document.createTextNode(text);
    node.appendChild(textnode);
}

// Filter an array in-place
function filterInPlace<T>(arr: T[], pred: (x: T) => boolean): void {
    let i = 0;
    let j = 0;
    while(i < arr.length) {
        const x = arr[i];
        if (pred(x)) {
            arr[j++] = x;
        }
        i++;
    }
    arr.length = j;
}

// Enforces that a method is overriden from the superclass
// Used as an annotation: @override(superclass)
const override = <S>(superclass: { prototype: S }) =>
    <K extends keyof S, P extends Pick<S, K>>(
        proto: P,
        fields: K,
        descr: TypedPropertyDescriptor<S[K]>,
    ) => { }
