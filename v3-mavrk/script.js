/**
 * Interactive behaviors for Geza Horvath portfolio (Editorial Poster Style):
 * - Copy email / phone actions with toast notification
 */

document.addEventListener("DOMContentLoaded", () => {
  const toast = document.getElementById("toast");
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("visible");
    }, 2500);
  }
  window.showToast = showToast;

  window.copyText = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard!`);
    }).catch(() => {
      showToast(`${label}: ${text}`);
    });
  };
});
