import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import PopupWithForm from "../Scripts/PopupWithForm.js";
import Section from "../Scripts/Section.js";
import PopupWithImage from "../Scripts/PopupwithImage.js";
import UserInfo from "../Scripts/UserInfo.js";
import {
  initialCards,
  validationSettings,
  selectors,
} from "../utils/constants.js";
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
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

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

// Access each validator by form name
const addCardFormValidator = formValidators["add-card-form"];
const editProfileFormValidator = formValidators["edit-profile-form"];

/* -------------------------------------------------------------------------- */
/*                       create instances of the classes                      */
/* -------------------------------------------------------------------------- */

//popupwithform

const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  editProfileFormValidator
);

const addCardModal = new PopupWithForm(
  "#profile-add-modal",
  handleAddCardSubmit,
  addCardFormValidator
);

//popupwithimage

const cardPreviewPopup = new PopupWithImage(selectors.previewPopup);

//section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      cardSection.addItem(createdCard(cardData));
    },
  },
  selectors.cardList
);

// userinfo

const userInfo = new UserInfo({
  profileName: ".profile__title",
  jobElement: ".profile__description",
});

//initialize all my instances
cardSection.renderItems();
cardPreviewPopup.setEventListeners();
profileModal.setEventListeners();
addCardModal.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function handlePreviewPicture(cardData) {
  cardPreviewPopup.open(cardData);
}

// function closeModal(modal) {
//   modal.classList.remove("modal_opened");
//   document.removeEventListener("keydown", closeModalOnEvent);
//   document.removeEventListener("click", closeModalOnEvent);
// }

// function openModal(modal) {
//   modal.classList.add("modal_opened");
//   document.addEventListener("keydown", closeModalOnEvent);
//   document.addEventListener("click", closeModalOnEvent);
// }

function createdCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewPicture);
  return card.getView();
}

// function handlePreviewPicture(cardData) {
//   imageElementModal.src = cardData.link;
//   imageElementModal.alt = cardData.name;
//   titleElementModal.textContent = cardData.name;
//   cardPreviewPopup.open();
// }

function handleProfileEditSubmit(inputData) {
  // Update the profile using the UserInfo instance

  userInfo.setUserInfo({
    name: inputData.name,
    description: inputData.description,
  });
  editProfileFormValidator.resetValidation();
  profileModal.close();
  // Close the popup (if you have a function for that)
  // closeModal(userInfo);
}

function handleAddCardSubmit({ inputData, form }) {
  // Logic to create and add a new card

  // console.log("Form Submitted: ", inputData); // Debug log to check inputData
  const newCard = createdCard({
    name: inputData.name,
    link: inputData.link,
  });
  cardSection.addItem(newCard);
  addCardFormValidator.toggleButtonState();
  form.reset();
}

// Event listener for form submission
// profileEditForm.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const inputData = {
//     name: profileTitleInput.value,
//     description: profileDescriptionInput.value,
//   };

//   handleProfileEditSubmit(inputData);
// });

profileEditButton.addEventListener("click", () => {
  // profileTitleInput.value = profileTitle.textContent;
  // profileDescriptionInput.value = profileDescription.textContent;
  // formValidators["edit-card-form"].resetValidation();
  // // editFormValidator.resetValidation();
  profileModal.open();
});

// add new card button
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});
