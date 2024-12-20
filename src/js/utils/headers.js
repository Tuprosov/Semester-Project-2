import { API_KEY } from "../constants.js";
import { User } from "../classes/user.js";

export function headers() {
  const headers = new Headers();
  const currentUser = User.loggedUser;
  console.log(currentUser.token);

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (currentUser.token) {
    headers.append("Authorization", `Bearer ${currentUser.token}`);
  }

  headers.append("Content-type", "application/json");

  return headers;
}
