import { loadListings } from "./ui/home.js";
import { getClickedListing, toggleBidSection } from "./ui/listing.js";
import { initializeSlider } from "./utils/carousel.js";
import {
  displayProfile,
  displayBidders,
  displayAccount,
} from "./utils/render.js";
import { fetchProfile } from "./ui/account.js";

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    // case base:
    // case `${base}/index.html`:
    case "/index.html":
      await loadListings();
      break;
    case "/listing/index.html":
      await getClickedListing();
      initializeSlider();
      toggleBidSection();
      displayBidders();
      break;
    case "/profile/index.html":
      await displayProfile();
    case "/account/index.html":
      displayAccount();
      fetchProfile();
    default:
      break;
  }
}
