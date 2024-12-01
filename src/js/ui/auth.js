import { Auth } from "../classes/auth.js";

export async function onRegister(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const successMessage = document.getElementById("success-message");

  try {
    await Auth.register(data);
    successMessage.classList.remove("hidden");
  } catch (error) {
    alert(error.message);
  }
}

export function onLogin() {}

export function onLogout() {}
