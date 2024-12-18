import { User } from "../classes/user.js";
import { displayUserDetails } from "./displayUser.js";

export function checkStatus() {
  if (!User.isLoggedIn()) {
    return;
  }
  displayUserDetails(User.loggedUser);
}
