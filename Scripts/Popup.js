export default class Popup {
  constructor(popupSelector) {
    console.log(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    //open
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    //close
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    //listen for esc button
    if (event.key === "Escape" && event.type === "keydown") {
      this.close();
    }
    close(this._popupElement);
  };

  setEventListeners() {
    //sets event listeners
    this.closeButton = this._popupElement.querySelector(".modal__close");
    this.closeButton.addEventListener("click", () => {
      this.close();
    });

    const modalList = document.querySelectorAll(".modal");
    modalList.forEach((modal) => {
      modal.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("modal")) {
          this.close();
        }
      });
    });
  }
}
