import { API } from "../classes/api";
import { API_BASE } from "../constants";
import { displayListings } from "../utils/render";

const api = new API(API_BASE);
const listings = api.getListings();
displayListings(listings);
