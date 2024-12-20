import { API } from "../classes/api.js";
import { API_BASE } from "../constants.js";
import { displayListings, pagination } from "../utils/render.js";

export async function loadListings(page = 1) {
  const api = new API(API_BASE);
  const limit = 12;
  const listings = await api.getListings(limit, page);
  displayListings(listings.data);
  pagination(listings.meta);
}

export async function performSearch() {
  const query = document.getElementById("searchInput").value.trim();

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const api = new API(API_BASE);
  const wrapper = document.getElementById("contentWrapper");
  const h1 = document.getElementById("h1");
  try {
    // loading
    wrapper.innerHTML = `
      <div class="flex items-center justify-center h-screen">
        <p class="text-xl font-bold text-gray-600 animate-pulse">Loading...</p>
      </div>
    `;
    h1.textContent = "Search results";
    // Fetch search results
    const searchResults = await api.searchListings(query);
    if (searchResults.meta.totalCount == 0) {
      wrapper.innerHTML = `
          <div class="flex items-center justify-center h-screen">
            <p class="text-xl font-bold text-gray-600 animate-pulse">No result found for your search query</p>
          </div>
        `;
    } else {
      // Display search results
      displayListings(searchResults.data);
    }
  } catch (error) {
    alert("Something went wrong while searching. Please try again.", error);
  }
}
