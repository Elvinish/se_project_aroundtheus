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

/* -------------------------------------------------------------------------- */
/*                       create instances of the classes                      */
/* -------------------------------------------------------------------------- */

//popupwithform

const profileModal = new PopupWithForm({
  popupSelector: "profile-edit-modal",
  handleFormSubmit: (formData) => {
    console.log("Form data received in handleFormSubmit:", formData); // Debug line
    // Pass formData directly to setUserInfo
    userInfo.setUserInfo({
      name: formData.title,
      description: formData.description,
    });
    profileModal.close();
  },
});

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
cardSection.renderItems(initialCards);
cardPreviewPopup.setEventListeners();
profileModal.setEventListeners();

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

function createdCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewPicture);
  return card.getView();
}

function handlePreviewPicture(cardData) {
  imageElementModal.src = cardData.link;
  imageElementModal.alt = cardData.name;
  titleElementModal.textContent = cardData.name;
  openModal(previewImageModal);
}

function handleProfileEditSubmit(inputData) {
  // console.log(inputData);

  // Update the profile using the UserInfo instance
  userInfo.setUserInfo({
    title: inputData.name,
    description: inputData.description,
  });

  // Close the popup (if you have a function for that)
  closeModal(userInfo);
}

// Event listener for form submission
profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputData = {
    name: profileTitleInput.value,
    description: profileDescriptionInput.value,
  };

  handleProfileEditSubmit(inputData);
});
