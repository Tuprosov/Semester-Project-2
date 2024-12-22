export function initializeModalWindow() {
  // Select Elements
  const changeAvatarBtn = document.getElementById("changeAvatarBtn");
  const avatarModal = document.getElementById("avatarModal");
  const cancelBtn = document.getElementById("cancelBtn");
  const updateAvatarBtn = document.getElementById("updateAvatarBtn");
  const avatarUrlInput = document.getElementById("avatarUrl");
  const overlay = document.getElementById("overlay");
  const body = document.body;

  changeAvatarBtn.addEventListener("click", () => {
    if (avatarModal) {
      avatarModal.classList.add("active");
      overlay.classList.add("active");
      body.classList.add("modal-open");
    }
  });

  cancelBtn.addEventListener("click", () => {
    if (avatarModal) {
      avatarModal.classList.remove("active");
      overlay.classList.remove("active");
      body.classList.remove("modal-open");
    }
  });
}
