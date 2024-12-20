import { makeBid } from "../ui/listing.js";

export function placeBidEvent() {
  const bidBtn = document.getElementById("placeBidBtn");
  if (bidBtn) {
    bidBtn.addEventListener("click", makeBid);
  }
}
