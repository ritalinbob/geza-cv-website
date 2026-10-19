/**
 * Interactive behaviors for Geza Horvath portfolio (21st.dev Sidebar Template):
 * - Dark & Light mode theme toggle
 * - Copy email / phone actions with toast notification
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Theme Toggle
  const themeToggle = document.getElementById("themeToggle");
  const htmlEl = document.documentElement;

  // Read persisted theme or system preference
  const savedTheme = localStorage.getItem("theme-v5");
  if (savedTheme) {
    htmlEl.setAttribute("data-theme", savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) {
    htmlEl.setAttribute("data-theme", "light");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme");
      const nextTheme = current === "light" ? "dark" : "light";
      htmlEl.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme-v5", nextTheme);
      showToast(`Switched to ${nextTheme} mode`);
    });
  }

  // 2. Toast Helper
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
