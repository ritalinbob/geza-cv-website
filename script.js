/**
 * Interactive behaviors for Geza Horvath portfolio:
 * - Radial cursor spotlight tracking
 * - Scroll spy for active sidebar navigation links
 * - Copy email / phone toast interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mouse Spotlight Tracker
  const spotlight = document.getElementById("spotlight");
  if (spotlight) {
    window.addEventListener("pointermove", (e) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    });
  }

  // 2. Scroll Spy with IntersectionObserver for in-page navigation links
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          if (link.getAttribute("href") === `#${currentId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // 3. Toast Helper for Quick Copy Actions
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
