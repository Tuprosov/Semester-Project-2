export class User {
  constructor(
    username,
    email,
    avatar = null,
    alt = null,
    token,
    credits = 0,
    listings = [],
    wins = [],
    bids = [],
    watchlist = []
  ) {
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.alt = alt;
    this.credits = credits;
    this.token = token;
    this.bids = bids; // An array to store bids made by the user
    this.watchlist = watchlist; // An array to store the listings the user is watching
    this.listings = listings;
    this.wins = wins;
  }

  static get loggedUser() {
    const userData = localStorage.getItem("loggedUser");
    return userData ? JSON.parse(userData) : null;
  }

  static isLoggedIn() {
    const loggedUser = this.loggedUser;
    return loggedUser && loggedUser.token; // Returns true if loggedUser exists and has a token
  }

  saveToLocalStorage() {
    localStorage.setItem("loggedUser", JSON.stringify(this));
  }
}
