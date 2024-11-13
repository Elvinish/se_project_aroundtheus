import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleDeleteConfirm) {
    super(popupSelector);
    this._handleDeleteConfirm = null;
  }

  setHandleConfirm(handleConfirm) {
    this._handleDeleteConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();

    // Add an event listener for the delete confirmation button
    this._confirmButton = this._popupElement.querySelector(
      ".modal__button_confirm"
    );
    this._confirmButton.addEventListener("click", () => {
      this._handleDeleteConfirm();
    });
  }
}
