export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._element = document.querySelector(selector);
  }

  renderItems(data) {
    this._items.forEach((item) => this._renderer(item));
  }

  addItem(item) {
    this._element.prepend(item);
  }
}
