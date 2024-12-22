import { Auth } from "../classes/auth.js";
import { API } from "../classes/api.js";
import { API_PROFILE_BASE } from "../constants.js";
import { User } from "../classes/user.js";

export async function onRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  const successMessage = document.getElementById("success-message-reg");
  const failureMessage = document.getElementById("failure-message-reg");

  try {
    const newUser = await Auth.register(data);
    console.log("User registered:", newUser);
    successMessage.classList.remove("hidden");
  } catch (error) {
    failureMessage.classList.remove("hidden");
    console.error(error.message);
  }
}

export async function onLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const loginData = Object.fromEntries(formData.entries());
  const failureMessage = document.getElementById("failure-message-login");

  try {
    const user = await Auth.login(loginData);
    localStorage.setItem("token", JSON.stringify(user.token));
    const api = new API(API_PROFILE_BASE);
    const profile = await api.getProfile(user.username);

    // create on loggeduser object from 2 objects
    const loggedUser = new User(
      user.username,
      user.email,
      user.avatar,
      user.alt,
      user.token,
      profile.credits,
      profile.bio,
      profile.listings,
      profile.wins,
      user.bids,
      user.watchlist
    );
    loggedUser.saveToLocalStorage();

    // redirect to homepage
    console.log(window.location.href);
    window.location.href = "/index.html";
  } catch (error) {
    failureMessage.classList.remove("hidden");
    console.error(error.message);
  }
}

export function onLogout(event) {
  event.preventDefault();
  Auth.logout();
  // redirect to homepage
  window.location.href = "/index.html";
}
