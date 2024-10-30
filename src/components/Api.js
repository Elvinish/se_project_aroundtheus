export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // Handle server responses

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Get the current user's info
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  // Update user's profile information
  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleResponse);
  }

  // Update user's avatar
  updateUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers, // Token is included here
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._handleResponse);
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this.headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }
}
