// import all event handlers here
import { loginEvent, registerEvent, logoutEvent } from "./auth.js";
import { performSearch } from "../ui/search.js";

export function initializeEvents() {
  registerEvent();
  loginEvent();
  logoutEvent();

  const input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") performSearch();
    });
  }
}
