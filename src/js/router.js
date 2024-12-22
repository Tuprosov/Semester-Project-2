import { loadListings } from "./ui/home.js";
import { getClickedListing, toggleBidSection } from "./ui/listing.js";
import { initializeSlider } from "./utils/carousel.js";
import {
  displayProfile,
  displayBidders,
  displayAccount,
} from "./utils/render.js";
import { fetchProfile } from "./ui/account.js";
import { initializeModalWindow } from "./utils/modalview.js";
import { GITHUB_BASE } from "./constants.js";

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case GITHUB_BASE:
    case `${GITHUB_BASE}/index.html`:
    case "/index.html":
      await loadListings();
      break;
    case `${GITHUB_BASE}/listing/index.html`:
    case "/listing/index.html":
      await getClickedListing();
      initializeSlider();
      toggleBidSection();
      displayBidders();
      break;
    case `${GITHUB_BASE}/profile/index.html`:
    case "/profile/index.html":
      await displayProfile();
    case `${GITHUB_BASE}/account/index.html`:
    case "/account/index.html":
      fetchProfile();
      displayAccount();
      initializeModalWindow();
    default:
      break;
  }
}
