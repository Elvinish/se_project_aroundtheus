class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formEl;
  }

  _showInputError(inputEl, validationMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  _toggleButtonState() {
    if (hasInvalidInput(inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
  }

  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return showInputError(inputEl);
    }
    hideInputError(inputEl);
  }

  _setEventListeners() {
    this._inputlist = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputlist.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(this._form, inputEl, rest);
        this._toggleButtonState(
          this._inputList,
          this._submitButton,
          this._inactiveButtonClass
        );
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this._setEventListeners(formEl, rest);
  }
}

const editFormValidator = new FormValidator();
editFormValidator.enableValidation();

export default FormValidator;
