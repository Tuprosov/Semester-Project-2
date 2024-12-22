import { API } from "../classes/api.js";
import { API_BASE } from "../constants.js";
import { GITHUB_BASE } from "../constants.js";

export async function onCreate(event) {
  event.preventDefault();
  const api = new API(API_BASE);
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  const tagsInput = data.tags || "";
  const tagsArray = tagsInput.split(",").map((tag) => tag.trim());
  data.tags = tagsArray;
  const mediaUrls = formData.getAll("media");
  const validMedia = [];
  const invalidMedia = [];
  const message = document.getElementById("message");

  mediaUrls.forEach((url, index) => {
    if (url.length > 300) {
      invalidMedia.push(index + 1);
    } else {
      validMedia.push({
        url: url,
        alt: "",
      });
    }
  });

  data.media = validMedia;
  //   invalidMedia.push(...mediaUrls.filter((url) => url.length > 300));
  //   const validMedia = mediaUrls.filter((url) => url.length < 300);
  //   data.media = validMedia.map((url) => ({ url: url, alt: "" }));

  if (invalidMedia.length > 0) {
    message.textContent = `Too long URL in input fields ${invalidMedia.join(
      ","
    )}`;
    message.classList.remove("hidden");
  } else {
    try {
      const newListing = await api.createListing(data);
      message.textContent = "Your listing is published";
      message.classList.remove("hidden");
      // redirect to listing
      if (newListing.data.id) {
        window.location.href = `../listing/index.html?id=${newListing.data.id}`;
      }
    } catch (error) {
      message.textContent = "Something went wrong, please try again";
      message.classList.remove("hidden");
      console.log(error.message);
    }
  }
}
