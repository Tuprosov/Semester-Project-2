import { initializeEvents } from "./js/events/initialize.js";
import { checkStatus } from "./js/utils/statusCheck.js";
import router from "./js/router.js";

initializeEvents();
checkStatus();
await router();
