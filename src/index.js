import { initializeEvents } from "./js/events/initialize.js";
import { checkStatus } from "./js/utils/statusCheck.js";
import router from "./js/router.js";
import { displayHeaderDetails } from "./js/utils/render.js";
import { User } from "./js/classes/user.js";

initializeEvents();
if (checkStatus()) {
  displayHeaderDetails(User.loggedUser);
}
await router();
