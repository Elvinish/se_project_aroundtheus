import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
  }

  getForm() {
    return this._popupForm;
  }

  // Collects data from all input fields
  _getInputValues() {
    // Create an object to hold the input values
    this._inputValues = {};

    // Iterate over every input and add to the inputValues object
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // Here you insert the `value` by the `name` of the input
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit({
        inputData: this._getInputValues(),
        form: this.getForm(),
      });
      this.close();
    });
  }

  close() {
    super.close();
  }
}

// const newCardPopup = new PopupWithForm("#profile-add-modal", () => {
//   // handleform
// });

// newCardPopup.open();

// newCardPopup.close();
