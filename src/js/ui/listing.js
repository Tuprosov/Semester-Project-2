import { API } from "../classes/api.js";
import { API_BASE } from "../constants.js";
import { displaySingleListing } from "../utils/render.js";
import { checkStatus } from "../utils/statusCheck.js";
import { User } from "../classes/user.js";

export async function getClickedListing() {
  const api = new API(API_BASE);
  const container = document.getElementById("container");
  // Extract ID from URL and fetch listing
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  //   if true, fetch listing
  if (listingId) {
    try {
      const data = await api.getListingById(listingId);
      localStorage.setItem("current listing", JSON.stringify(data.data));
      displaySingleListing(data.data);
    } catch (error) {
      container.innerHTML = `
        <div class="flex items-center justify-center h-screen">
          <p class="text-xl font-bold text-gray-600 animate-pulse">${error.message}. Try again later</p>
        </div>
      `;
    }
  } else {
    container.innerHTML = `
        <div class="flex items-center justify-center h-screen">
          <p class="text-xl font-bold text-gray-600 animate-pulse">Listing was not found</p>
        </div>
      `;
  }
}

export function toggleBidSection() {
  // DOM Elements
  const bidInput = document.getElementById("bidInput");
  const placeBidBtn = document.getElementById("placeBidBtn");
  const bidMessage = document.getElementById("bidMessage");
  const deadlineDate = document.getElementById("listingDeadline");
  if (!checkStatus()) {
    // Disable input and button
    bidInput.disabled = true;
    placeBidBtn.disabled = true;

    // Show message
    bidMessage.classList.remove("hidden");

    // Style updates for a disabled appearance
    bidInput.classList.add(
      "bg-gray-100",
      "text-gray-500",
      "cursor-not-allowed"
    );
    placeBidBtn.classList.add(
      "bg-gray-300",
      "cursor-not-allowed",
      "hover:bg-gray-300"
    );
    placeBidBtn.classList.remove("hover:bg-blue-600");
  } else {
    const deadline = new Date(deadlineDate.textContent); // Convert text content to a Date object
    const now = new Date();
    if (deadline < now) {
      bidMessage.textContent = "The listing has already ended!";
      bidMessage.classList.remove("hidden");
      bidInput.disabled = true;
      placeBidBtn.disabled = true;
      bidInput.classList.add(
        "bg-gray-100",
        "text-gray-500",
        "cursor-not-allowed"
      );
      placeBidBtn.classList.add(
        "bg-gray-300",
        "cursor-not-allowed",
        "hover:bg-gray-300"
      );
    }
  }
}

export async function makeBid() {
  const amount = parseFloat(document.getElementById("bidInput").value.trim());
  const maxBid = Math.max(
    ...JSON.parse(localStorage.getItem("current listing")).bids.map(
      (bid) => bid.amount
    )
  );
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");
  const api = new API(API_BASE);

  try {
    const bidMessage = document.getElementById("bidMessage");
    // Validate the bid amount before making the API call
    if (!amount || isNaN(amount) || amount <= maxBid) {
      bidMessage.textContent =
        "Your bid must be higher than the current max bid!";
      bidMessage.classList.remove("hidden");
      bidMessage.classList.add("text-red-500");
    } else {
      // Call the API to place the bid
      try {
        const result = await api.placeBid(listingId, amount);
        if (result) {
          const updatedUser = Object.assign(new User(), User.loggedUser);
          updatedUser.credits -= amount;
          updatedUser.saveToLocalStorage();
        }
      } catch (error) {
        bidMessage.textContent = error.message;
        bidMessage.classList.remove("hidden");
        bidMessage.classList.add("text-red-500");
      }

      // Update the UI with a success message
      bidMessage.textContent = "Your bid was placed successfully!";
      bidMessage.classList.remove("hidden");
      bidMessage.classList.add("text-green-500");
    }
  } catch (error) {
    console.error("Error placing bid:", error.message);
  }
}
