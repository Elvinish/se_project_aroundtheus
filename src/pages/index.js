import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings, selectors } from "../utils/utils.js";
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
} from "../utils/utils.js";

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
const editProfileFormValidator = formValidators["edit-card-form"];

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
    renderer: renderCard,
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
function renderCard(item, method = "addItem") {
  const cardElement = createdCard(item);
  cardSection[method](cardElement);
}

function handlePreviewPicture(cardData) {
  cardPreviewPopup.open(cardData);
}

function createdCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewPicture);
  return card.getView();
}

function handleProfileEditSubmit({ inputData }) {
  // Update the profile using the UserInfo instance

  userInfo.setUserInfo({
    name: inputData.name,
    description: inputData.description,
  });

  profileModal.close();
}

function handleAddCardSubmit({ inputData, form }) {
  // Logic to create and add a new card

  // console.log("Form Submitted: ", inputData); // Debug log to check inputData
  const newCard = createdCard({
    name: inputData.name,
    link: inputData.link,
  });
  form.reset();
  cardSection.addItem(newCard);
  addCardFormValidator.toggleButtonState();
}

profileEditButton.addEventListener("click", () => {
  editProfileFormValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  profileModal.setInputValues({
    name: userData.name,
    description: userData.description,
  });

  profileModal.open();
});

// add new card button
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});
