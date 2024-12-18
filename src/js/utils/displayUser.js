export function displayUserDetails(user) {
  const avatar = document.getElementById("userAvatar");
  const credits = document.getElementById("userCredits");
  const cta = document.getElementById("ctaBtn");
  const auth = document.getElementById("authBtns");
  const name = document.getElementById("userName");

  avatar.firstElementChild.src =
    user.avatar || "https://via.placeholder.com/40";
  avatar.firstElementChild.alt = user.alt;
  credits.firstElementChild.textContent = `Credits:${user.credits}`;
  name.firstElementChild.textContent = user.username;
  cta.classList.remove("hidden");
  auth.classList.add("hidden");
  name.classList.remove("hidden");
  credits.classList.remove("hidden");
  avatar.classList.remove("hidden");
}
