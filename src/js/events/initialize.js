// import all event handlers here
import { loginEvent, registerEvent, logoutEvent } from "./auth.js";
import { performSearch } from "../ui/search.js";

export function initializeEvents() {
  registerEvent();
  loginEvent();
  logoutEvent();
  document
    .getElementById("searchInput")
    .addEventListener("keypress", (event) => {
      if (event.key === "Enter") performSearch();
    });
}
