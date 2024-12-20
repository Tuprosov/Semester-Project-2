import { API } from "../classes/api.js";
import { API_BASE } from "../constants.js";
import { displaySingleListing } from "../utils/render.js";
import { checkStatus } from "../utils/statusCheck.js";

export async function getClickedListing() {
  const api = new API(API_BASE);
  const container = document.getElementById("container");
  // Extract ID from URL and fetch listing
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  //   if true, fetch listing
  if (listingId) {
    const data = await api.getListingById(listingId);
    displaySingleListing(data.data);
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
  }
}

export async function placeBid() {}
