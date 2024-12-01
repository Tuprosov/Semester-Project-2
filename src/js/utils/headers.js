import { API_KEY } from "../constants.js";

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (localStorage.token) {
    headers.append("Authorization", `Bearer ${localStorage.token}`);
  }

  headers.append("Content-type", "application/json");

  return headers;
}
