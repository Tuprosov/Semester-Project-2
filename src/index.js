import { initializeEvents } from "./js/events/initialize.js";
import { checkStatus } from "./js/utils/statusCheck.js";
import router from "./js/router.js";
import { displayUserDetails } from "./js/utils/displayUser.js";
import { User } from "./js/classes/user.js";

initializeEvents();
if (checkStatus()) {
  displayUserDetails(User.loggedUser);
}
await router();
