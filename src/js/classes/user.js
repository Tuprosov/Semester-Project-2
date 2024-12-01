export class User {
  constructor(username, email, avatar = null, credits = 1000) {
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.credits = credits;
    this.bids = []; // An array to store bids made by the user
    this.watchlist = []; // An array to store the listings the user is watching
  }
}
