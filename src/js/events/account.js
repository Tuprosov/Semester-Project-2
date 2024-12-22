import { onUpdateAccount } from "../ui/account.js";

export async function updateAccountEvent() {
  const updateAvatarBtn = document.getElementById("updateAvatarBtn");
  if (updateAvatarBtn) {
    updateAvatarBtn.addEventListener("click", onUpdateAccount);
  }
}
