import { onLogin, onRegister, onLogout } from "../ui/auth.js";

export function registerEvent() {
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", onRegister);
  }
}

export function loginEvent() {
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", onLogin);
  }
}

export function logoutEvent() {
  const logout = document.getElementById("logoutBtn");
  if (logout) {
    logout.addEventListener("click", onLogout);
  }
}
