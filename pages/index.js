import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddCardModal = document.querySelector("#profile-add-modal");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardFormElement = document.forms["add-card-form"];
const cardTitleInput = addCardFormElement.querySelector(".modal__input_title");
const cardUrlInput = addCardFormElement.querySelector(".modal__input_url");
const profileEditForm = document.forms["modal-form"];

const cardsWrap = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const previewImageModal = document.querySelector("#modal-picture-form");
const imageElementModal = document.querySelector("#modal-image");
const titleElementModal = document.querySelector("#modal-title-image");
const closeButtons = document.querySelectorAll(".modal__close");

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
// const editFormValidator = new FormValidator(
//   validationSettings,
//   profileEditForm
// );
// const cardFormValidator = new FormValidator(
//   validationSettings,
//   addCardFormElement
// );

// editFormValidator.enableValidation();
// cardFormValidator.enableValidation();

const formValidators = {};

const enableValidation = (validationSettings) => {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );

  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    // Here you get the name of the form (if you don’t have it then you need to add it into each form in `index.html` first)
    const formName = formElement.getAttribute("name");
    console.log(formName);
    // Here you store the validator using the `name` of the form
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

formValidators["edit-card-form"].resetValidation();
formValidators["add-card-form"].resetValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

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

// function renderCard(cardData, cardsWrap) {
//   const card = new Card(cardData, "#card-template", handlePreviewPicture);
//   cardsWrap.prepend(card.getView());
// }

function createdCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewPicture);
  return card.getView();
}

function renderCard(cardData, cardsWrap) {
  const cardElement = createdCard(cardData);
  cardsWrap.prepend(cardElement);
}

function handlePreviewPicture(cardData) {
  imageElementModal.src = cardData.link;
  imageElementModal.alt = cardData.name;
  titleElementModal.textContent = cardData.name;
  openModal(previewImageModal);
}

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__title");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const trashButton = cardElement.querySelector(".card__trash-button");

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   trashButton.addEventListener("click", () => {
//     cardElement.remove(".card");
//   });

//   cardImageEl.src = cardData.link;
//   cardImageEl.alt = cardData.name;
//   cardTitleEl.textContent = cardData.name;

//   cardImageEl.addEventListener("click", () => {
//     imageElementModal.src = cardData.link;
//     imageElementModal.alt = cardData.name;
//     titleElementModal.textContent = cardData.name;
//     openModal(previewImageModal);
//   });

//   return cardElement;
// }
/* -------------------------------------------------------------------------- */
/*                     close modal with escape and overlay                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardformSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  e.target.reset();
  formValidators["add-card-form"].resetValidation();
  // cardFormValidator.resetValidation();
  renderCard({ name, link }, cardsWrap);
  closeModal(profileAddCardModal);
  // submitButtonSelector.disabled = true;
  // submitButtonSelector.classList.add("modal__button_disabled");
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  formValidators["edit-card-form"].resetValidation();
  // editFormValidator.resetValidation();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardformSubmit);

// add new card button
addNewCardButton.addEventListener("click", () => {
  formValidators["add-card-form"].resetValidation();
  openModal(profileAddCardModal);
});

// close button for all
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
