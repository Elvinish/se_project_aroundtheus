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
  deleteModal,
  deleteButton,
  closeButton,
  confirmDeleteButton,
} from "../utils/utils.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";

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
    items: [],
    renderer: renderCard,
  },
  selectors.cardList
);

// userinfo
//comment

const userInfo = new UserInfo({
  profileName: ".profile__title",
  jobElement: ".profile__description",
});

// delete
export const deletePopup = new PopupWithDelete("#modal-delete-card");

//initialize all my instances
// cardSection.renderItems();
cardPreviewPopup.setEventListeners();
profileModal.setEventListeners();
addCardModal.setEventListeners();
deletePopup.setEventListeners();

//initialize api class

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "49047f75-cbce-49b8-982b-1a6a5af2c35f",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------------------------------- */
/*                       initiate the actual API request                      */
/* -------------------------------------------------------------------------- */

// api
//   .getUserInfo()
//   .then((result) => {
//     console.log("it's ok", result); // This should log the user info to the console
//   })
//   .catch((error) => {
//     console.error("Error fetching user info:", error);
//   });

api
  .getUserInfo()
  .then((userInfoData) => {
    // Set the user's info in the UserInfo instance
    userInfo.setUserInfo({
      name: userInfoData.name,
      description: userInfoData.about,
    });
  })
  .catch((error) => {
    console.error("Error fetching user info:", error);
  });

// api
//   .getInitialCards()
//   .then((cards) => {
//     console.log(cards); // This will log the array of cards fetched from the server
//   })
//   .catch((error) => {
//     console.error("Error fetching cards:", error);
//   });

api
  .getInitialCards()
  .then((cards) => {
    // Render the initial set of cards using the Section instance
    cardSection.renderItems(cards);
  })
  .catch((error) => {
    console.error("Error fetching cards:", error);
  });

// api
//   .updateUserInfo({ name: "Marie Curie", about: "Famous Scientist" })
//   .then((updatedInfo) => {
//     console.log("User info updated successfully:", updatedInfo);
//   })
//   .catch((error) => {
//     console.error("Error updating user info:", error);
//   });

// const newCardData = {
//   name: "Bald Mountains",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
// };

// api
//   .addCard(newCardData)
//   .then((newCard) => {
//     console.log("New card added:", newCard);
//   })
//   .catch((error) => {
//     console.error("Error adding card:", error);
//   });

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
  const card = new Card(
    {
      name: cardData.name,
      link: cardData.link,
      id: cardData._id,
    },
    "#card-template",
    handlePreviewPicture,
    handleDeleteCardClick
  );
  return card.getView();
}

// function handleProfileEditSubmit({ inputData }) {
//   // Update the profile using the UserInfo instance

//   userInfo.setUserInfo({
//     name: inputData.name,
//     description: inputData.description,
//   });

//   profileModal.close();
// }

function handleProfileEditSubmit({ inputData }) {
  // Send the profile data to the server
  api
    .updateUserInfo({
      name: inputData.name,
      about: inputData.description,
    })
    .then((updatedUserInfo) => {
      // Update the profile in the UI only after receiving a successful response
      userInfo.setUserInfo({
        name: updatedUserInfo.name,
        description: updatedUserInfo.about,
      });
      profileModal.close();
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
    });
}

// function handleAddCardSubmit({ inputData, form }) {
//   renderCard(inputData);
//   form.reset();
//   addCardFormValidator.toggleButtonState();
// }

function handleAddCardSubmit({ inputData, form }) {
  // Send the new card data to the server
  api
    .addCard({
      name: inputData.name,
      link: inputData.link,
    })
    .then((newCardData) => {
      console.log("New card added:", newCardData);
      // Render the card only after receiving a successful response from the server
      renderCard(newCardData);
      form.reset();
      addCardFormValidator.toggleButtonState();
      addCardModal.close(); // Close the add card modal
    })
    .catch((error) => {
      console.error("Error adding card:", error);
    });
}

function handleDeleteCardClick(cardId, cardInstance) {
  console.log("Deleting card with ID:", cardId);
  api
    .deleteCard(cardId)
    .then((data) => {
      console.log(data.message); // Expected to log "This post has been deleted"
      cardInstance.handleDeleteCard(); // Remove card from DOM
    })
    .catch((error) => console.error("Error deleting card:", error));
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
