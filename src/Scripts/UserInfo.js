export default class UserInfo {
  constructor({ profileName, jobElement }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, description }) {
    // console.log("Setting User Info: ", { name, description });
    this._profileName.textContent = name;
    this._jobElement.textContent = description;
    // console.log("Updated Name: ", this._profileName.textContent); // Debug log
    // console.log("Updated Description: ", this._jobElement.textContent);
  }
}
