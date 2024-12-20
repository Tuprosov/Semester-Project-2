// import all event handlers here
import { loginEvent, registerEvent, logoutEvent } from "./auth.js";
import { searchEvent } from "./search.js";
import { placeBidEvent } from "./listing.js";

export function initializeEvents() {
  registerEvent();
  loginEvent();
  logoutEvent();
  searchEvent();
  placeBidEvent();
}
