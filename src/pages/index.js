import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { validationSettings, selectors } from "../utils/utils.js";
import { profileEditButton, addNewCardButton } from "../utils/utils.js";
import Api from "../components/Api.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import { avatarImage } from "../utils/utils.js";
import { avatarEditIcon } from "../utils/utils.js";

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
const avatarFormValidator = formValidators["edit-avatar-form"];

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

const avatarPopup = new PopupWithForm(
  "#avatar-edit-modal",
  handleAvatarSubmit,
  avatarFormValidator
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
  avatarElement: ".profile__image",
});

// delete
export const deletePopup = new PopupWithDelete("#modal-delete-card");

//initialize api class

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "49047f75-cbce-49b8-982b-1a6a5af2c35f",
    "Content-Type": "application/json",
  },
});

//initialize all my instances
// cardSection.renderItems();
cardPreviewPopup.setEventListeners();
profileModal.setEventListeners();
addCardModal.setEventListeners();
deletePopup.setEventListeners();
avatarPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                       initiate the actual API request                      */
/* -------------------------------------------------------------------------- */

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

api
  .getInitialCards()
  .then((cards) => {
    // Render the initial set of cards using the Section instance
    cardSection.renderItems(cards);
  })
  .catch((error) => {
    console.error("Error fetching cards:", error);
  });

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
      isLiked: cardData.isLiked,
    },
    "#card-template",
    handlePreviewPicture,
    handleDeleteCardClick,
    handleLikeClick
  );
  return card.getView();
}

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
  deletePopup.setHandleConfirm(() => {
    api
      .deleteCard(cardId)
      .then((data) => {
        console.log(data.message); // Expected to log "This post has been deleted"
        cardInstance.handleDeleteCard(); // Remove card from DOM
      })
      .catch((error) => console.error("Error deleting card:", error));
  });

  deletePopup.open();
}

function handleLikeClick(cardId, cardInstance) {
  console.log("Card ID:", cardId, "isLiked:", cardInstance._isLiked);
  if (cardInstance._isLiked) {
    api
      .removeLike(cardId)
      .then((updatedData) => {
        cardInstance.setCardLike(updatedData.isLiked);
      })
      .catch((error) => console.error("Error removing like:", error));
  } else {
    api
      .addLike(cardId)
      .then((updatedData) => {
        cardInstance.setCardLike(updatedData.isLiked);
      })
      .catch((error) => console.error("Error adding like:", error));
  }
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

// Define the handleAvatarSubmit function
// function handleAvatarSubmit({ inputData, form }) {
//   const avatarUrl = inputData.avatar; // Get the URL from the form

//   api
//     .updateAvatar(avatarUrl)
//     .then((data) => {
//       // Update the avatar image src on the page
//       avatarImage.src = data.avatar;
//       form.reset();
//     })
//     .catch((error) => {
//       console.error("Failed to update avatar:", error);
//     });
// }

function handleAvatarSubmit({ inputData, form }) {
  const avatarUrl = inputData.avatar; // Get the URL from the form

  api
    .updateAvatar(avatarUrl)
    .then((data) => {
      userInfo.setUserInfo({ avatar: data.avatar });
      form.reset();
    })
    .catch((error) => {
      console.error("Failed to update avatar:", error);
    });
}

// add new card button
addNewCardButton.addEventListener("click", () => {
  addCardModal.open();
});

avatarEditIcon.addEventListener("click", () => {
  avatarPopup.open();
});
