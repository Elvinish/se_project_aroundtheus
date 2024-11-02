export default class Card {
  constructor(
    cardData,
    cardSelector,
    handlePreviewPicture,
    handleDeleteCardClick,
    handleLikeClick
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData.id;
    this._isLiked = cardData.isLiked;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon(this._id, this);
    });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCardClick(this._id, this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handlePreviewPicture({ name: this._name, link: this._link });
    });
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this.cardElement = null;
  }

  setCardLike(isLiked) {
    this._isLiked = isLiked;
    this._handleLikeIcon();
  }

  _handleLikeIcon() {
    if (!this._isLiked) {
      this._likeButton.classList.remove("card__like-button_active");
    } else {
      this._likeButton.classList.add("card__like-button_active");
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._trashButton = this._cardElement.querySelector(".card__trash-button");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardElement.querySelector(".card__title").textContent = this._name;
    this.setCardLike(this._isLiked);
    this._setEventListeners();

    return this._cardElement;
  }
}
