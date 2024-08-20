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

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalOnEvent);
  document.addEventListener("click", closeModalOnEvent);
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
        this._handlePreviewPicture();
      });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  _handlePreviewPicture(name, link) {
    const imageElementModal = document.querySelector("#modal-image");
    const titleElementModal = document.querySelector("#modal-title-image");
    const previewImageModal = document.querySelector("#modal-picture-form");

    imageElementModal.src = link;
    imageElementModal.alt = name;
    titleElementModal.textContent = name;
    openModal(previewImageModal);
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__image")
      .cloneNode(true);

    this._setEventListeners();
  }
}
