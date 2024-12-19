import { loadListings } from "./ui/home.js";

export default async function router(pathname = window.location.pathname) {
  console.log("router running");
  switch (pathname) {
    // case base:
    // case `${base}/index.html`:
    case "/index.html":
      await loadListings();
      break;

    default:
      break;
  }
}
