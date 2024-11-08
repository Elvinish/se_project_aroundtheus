export default class UserInfo {
  constructor({ profileName, jobElement, avatarElement }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, description, avatar }) {
    // console.log("Setting User Info: ", { name, description });
    this._profileName.textContent = name;
    this._jobElement.textContent = description;

    if (avatar) {
      this._avatarElement.src = avatar;
    }
    // console.log("Updated Name: ", this._profileName.textContent); // Debug log
    // console.log("Updated Description: ", this._jobElement.textContent);
  }
}
