import { base } from "./constants.js";

export default async function router(pathname = window.location.pathname) {
  switch (pathname) {
    case base:
    case `${base}/index.html`:
    case "/index.html":
      await import("./ui/home.js");
      break;

    default:
      break;
  }
}
