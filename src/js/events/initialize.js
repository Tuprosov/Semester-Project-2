// import all event handlers here
import { loginEvent, registerEvent, logoutEvent } from "./auth.js";
import { searchEvent } from "./search.js";

export function initializeEvents() {
  registerEvent();
  loginEvent();
  logoutEvent();
  searchEvent();
}
