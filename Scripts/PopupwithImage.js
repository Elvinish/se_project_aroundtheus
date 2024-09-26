import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._imageCaption = this._popupElement.querySelector("#modal-title-image");
  }
  open(cardData) {
    this._imageElement.src = cardData.link;
    this._imageElement.alt = cardData.name;
    this._imageCaption.textContent = cardData.name;
    super.open();
  }
}
