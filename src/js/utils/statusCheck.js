import { User } from "../classes/user.js";

export function checkStatus() {
  if (!User.isLoggedIn()) {
    return false;
  }
  return true;
}
