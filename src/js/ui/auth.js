import { Auth } from "../classes/auth.js";

export async function onRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const successMessage = document.getElementById("success-message");

  try {
    const newUser = await Auth.register(data);
    console.log("User registered:", newUser);
    successMessage.classList.remove("hidden");
  } catch (error) {
    alert(error.message);
  }
}

export async function onLogin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const loggedUser = await Auth.login(data);
    loggedUser.saveToLocalStorage();
    console.log(loggedUser);
    // redirect to homepage
    window.location.pathname = "/index.html";
  } catch (error) {
    alert(error.message);
  }
}

export function onLogout(event) {
  event.preventDefault();
  Auth.logout();
  // redirect to homepage
  window.location.pathname = "/index.html";
}
