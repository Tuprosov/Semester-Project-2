import { API } from "../classes/api.js";
import { API_BASE } from "../constants.js";

export async function onCreate(event) {
  event.preventDefault();
  const api = new API(API_BASE);
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  const tagsInput = data.tags || "";
  const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
  data.tags = tagsArray;
  const mediaUrls = formData.getAll("media");
  const mediaItems = [];
  const message = document.getElementById("message");

  mediaUrls.forEach((url) => {
    if (url.length > 300) {
      message.textContent = "Url character is too long!";
      message.classList.remove("hidden");
    } else {
      mediaItems.push({
        url: url,
        alt: "",
      });
    }
  });
  data.media = mediaItems;

  try {
    const newListing = await api.createListing(data);
    console.log("Listing created:", newListing);
    message.textContent = "Your listing is published";
    message.classList.remove("hidden");
    // redirect to listing
    if (newListing.data.id) {
      window.location.href = `/listing/index.html?id=${newListing.data.id}`;
    }
  } catch (error) {
    message.textContent = "Something went wrong, please try again";
    message.classList.remove("hidden");
    console.log(error.message);
  }
}
