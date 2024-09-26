import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithForm from "../Scripts/PopupWithForm.js";
import Section from "../Scripts/Section.js";
import PopupWithImage from "../Scripts/PopupwithImage.js";
import { initialCards, validationSettings } from "../utils/constants.js";
import {
  profileEditButton,
  profileEditModal,
  profileAddCardModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  addCardFormElement,
  cardTitleInput,
  cardUrlInput,
  profileEditForm,
  cardsWrap,
  cardTemplate,
  addNewCardButton,
  previewImageModal,
  imageElementModal,
  titleElementModal,
  closeButtons,
} from "../utils/constants.js";

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

/* -------------------------------------------------------------------------- */
/*                               Create instances of classes                               */
/* -------------------------------------------------------------------------- */

// const addCardModal = new PopupWithForm({
//   popupSelector: "#profile-add-modal",
//   handleFormSubmit: (data) => {
//     cardList;
//   },
// });

// newCardPopup.setEventListeners();

// // Event listener to open the popup when the "Add" button is clicked
// document
//   .querySelector(".add-button")
//   .addEventListener("click", () => newCardPopup.open());

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */
// const validationSettings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };
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

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationSettings);

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
  formValidators["add-card-form"].toggleButtonState();
  // formValidators["add-card-form"].resetValidation();
  // cardFormValidator.resetValidation();
  renderCard({ name, link }, cardsWrap);
  closeModal(profileAddCardModal);
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
  openModal(profileAddCardModal);
});

// close button for all
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));
