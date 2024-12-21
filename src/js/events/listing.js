import { makeBid } from "../ui/listing.js";
import { onCreate } from "../ui/create.js";

export function placeBidEvent() {
  const bidBtn = document.getElementById("placeBidBtn");
  if (bidBtn) {
    bidBtn.addEventListener("click", makeBid);
  }
}

export function createListingEvent() {
  const createListing = document.getElementById("createListing");
  if (createListing) {
    createListing.addEventListener("submit", onCreate);
  }
}

export function AddMediaUrlEvent() {
  const addUrl = document.getElementById("add-url");
  if (addUrl) {
    addUrl.addEventListener("click", () => {
      const mediaUrlsContainer = document.getElementById("media");

      // Clone the first input field
      const firstInput = mediaUrlsContainer.querySelector("div");
      const newInput = firstInput.cloneNode(true); // This copies the first input and its "Remove" button

      // Reset the value of the cloned input
      newInput.querySelector("input").value = "";

      // Append the cloned input to the container
      mediaUrlsContainer.appendChild(newInput);

      // Attach event listener to the remove button of the cloned input
      newInput.querySelector(".remove-url").addEventListener("click", () => {
        mediaUrlsContainer.removeChild(newInput);
      });
    });
  }
}
