// import all event handlers here
import { loginEvent, registerEvent, logoutEvent } from "./auth.js";

export function initializeEvents() {
  registerEvent();
  loginEvent();
  logoutEvent();
}
