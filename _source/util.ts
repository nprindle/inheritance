function appendText(text: string, node: HTMLElement = document.body) {
  const textnode = document.createTextNode(text);
  node.appendChild(textnode);
}
