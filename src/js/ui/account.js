import { API } from "../classes/api.js";
import { User } from "../classes/user.js";
import { API_PROFILE_BASE } from "../constants.js";

export async function fetchProfile() {
  const api = new API(API_PROFILE_BASE);
  const name = User.loggedUser.username;
  const token = JSON.parse(localStorage.getItem("token"));
  const heading = document.getElementById("h1");
  try {
    const profile = await api.getProfile(name);
    // update loggeduser object with updated credits
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
  } catch (error) {
    heading.textContent = error.message;
  }
}

export async function onUpdateAccount() {
  const api = new API(API_PROFILE_BASE);
  const name = User.loggedUser.username;
  const token = JSON.parse(localStorage.getItem("token"));
  const avatarUrl = document.getElementById("avatarUrl").value;
  const bio = document.getElementById("bio");
  const bannerUrl = document.getElementById("banner");
  const message = document.getElementById("errorMessage");
  const body = {};

  // form body object
  if (avatarUrl) {
    avatarUrl.trim();
    body.avatar = { url: avatarUrl, alt: "" };
  }
  if (bio) {
    body.bio = bio.value;
  }
  if (bannerUrl) {
    bannerUrl.value.trim();
    body.banner = { url: bannerUrl, alt: "" };
  }

  try {
    const profile = await api.updateAccount(name, body);
    message.textContent = "Avatar updated";
    message.classList.remove("hidden");

    //   update loggeduser object with updated avatar
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

    // Refresh the page after the update
    location.reload();
  } catch (error) {
    message.textContent = error;
    message.classList.remove("hidden");
  }
}
