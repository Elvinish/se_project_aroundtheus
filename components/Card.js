function closeModalOnEvent(event) {
  if (event.key === "Escape" && event.type === "keydown") {
    const openedPopup = document.querySelector(".modal_opened");
    closeModal(openedPopup);
  }
  if (event.type === "click") {
    if (event.target.classList.contains("modal")) {
      closeModal(event.target);
    }
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOnEvent);
  document.removeEventListener("click", closeModalOnEvent);
}

export default class Card {
  constructor({ name, link }, cardSelector, handlePreviewPicture) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handlePreviewPicture({ name: this._name, link: this._link });
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this.cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  getView() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this._setEventListeners();

    return this._cardElement;
  }
}
