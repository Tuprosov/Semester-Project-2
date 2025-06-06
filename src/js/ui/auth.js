import { Auth } from "../classes/auth.js";
import { API } from "../classes/api.js";
import { API_PROFILE_BASE, GITHUB_BASE } from "../constants.js";
import { User } from "../classes/user.js";

export async function onRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  const successMessage = document.getElementById("success-message-reg");
  const failureMessage = document.getElementById("failure-message-reg");

  try {
    await Auth.register(data);
    failureMessage.classList.add("hidden");
    successMessage.classList.remove("hidden");
  } catch (error) {
    failureMessage.textContent = error.message;
    failureMessage.classList.remove("hidden");
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

    window.location.href = `${GITHUB_BASE}/index.html`;
  } catch (error) {
    failureMessage.textContent = error.message;
    failureMessage.classList.remove("hidden");
  }
}

export function onLogout(event) {
  event.preventDefault();
  Auth.logout();
  // redirect to homepage
  window.location.href = `${GITHUB_BASE}/index.html`;
}
