function appendText(text: string, node: HTMLElement = document.body) {
  const textnode = document.createTextNode(text);
  node.appendChild(textnode);
}

// Filter an array in-place
function filterInPlace<T>(arr: T[], pred: (T) => boolean): void {
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
