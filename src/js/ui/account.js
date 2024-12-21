import { API } from "../classes/api.js";
import { User } from "../classes/user.js";
import { API_PROFILE_BASE } from "../constants.js";

export async function fetchProfile() {
  const api = new API(API_PROFILE_BASE);
  const name = User.loggedUser.username;
  const token = JSON.parse(localStorage.getItem("token"));
  const profile = await api.getProfile(name);

  // create on loggeduser object from 2 objects
  const loggedUser = new User(
    profile.name,
    profile.email,
    profile.avatar.url,
    profile.avatar.alt,
    token,
    profile.credits,
    profile.bio,
    profile.listings,
    profile.wins,
    profile.bids,
    profile.watchlist
  );
  loggedUser.saveToLocalStorage();
}
