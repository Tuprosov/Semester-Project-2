// import all event handlers here
import { loginEvent, registerEvent, logoutEvent } from "./auth.js";
import { searchEvent } from "./search.js";
import {
  placeBidEvent,
  createListingEvent,
  AddMediaUrlEvent,
} from "./listing.js";
import { updateAccountEvent } from "./account.js";

export function initializeEvents() {
  registerEvent();
  loginEvent();
  logoutEvent();
  searchEvent();
  placeBidEvent();
  createListingEvent();
  AddMediaUrlEvent();
  updateAccountEvent();
}
