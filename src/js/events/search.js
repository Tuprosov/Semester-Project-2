import { performSearch } from "../ui/home.js";

export function searchEvent() {
  const input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") performSearch();
    });
  }
}
