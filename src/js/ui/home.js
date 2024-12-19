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
