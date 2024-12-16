import { User } from "../classes/user.js";
import { displayUserDetails } from "./render.js";

export function checkStatus() {
  if (!User.isLoggedIn()) {
    return;
  }
  displayUserDetails(User.loggedUser);
}
