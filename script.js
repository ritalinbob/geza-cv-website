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

  // Instant active state update on navigation link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

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

  // 4. Contact Form Handler with Candidate Fallback Endpoints
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const CANDIDATE_CONTACT_ENDPOINTS = [
      'http://Gezas-Mac-mini.local:5678/webhook/contact-submit',
      'http://192.168.1.248:5678/webhook/contact-submit',
      '/api/contact',
      'http://192.168.1.128:5678/webhook/contact-submit',
      'http://localhost:5678/webhook/contact-submit'
    ];

    const submitBtn = document.getElementById("contact-submit-btn");
    const btnText = submitBtn ? submitBtn.querySelector(".btn-text") : null;
    const btnIcon = submitBtn ? submitBtn.querySelector(".btn-icon") : null;
    const btnSpinner = submitBtn ? submitBtn.querySelector(".btn-spinner") : null;
    const statusBanner = document.getElementById("contact-status");

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const companyInput = document.getElementById("contact-company");
    const roleInput = document.getElementById("contact-role");
    const phoneInput = document.getElementById("contact-phone");
    const messageInput = document.getElementById("contact-message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    function clearErrors() {
      [nameInput, emailInput, messageInput].forEach(inp => inp && inp.classList.remove("is-invalid"));
      [nameError, emailError, messageError].forEach(err => {
        if (err) {
          err.textContent = "";
          err.classList.remove("visible");
        }
      });
      if (statusBanner) {
        statusBanner.style.display = "none";
        statusBanner.className = "contact-status-banner";
        statusBanner.innerHTML = "";
      }
    }

    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function setSubmitting(isSubmitting) {
      if (!submitBtn) return;
      submitBtn.disabled = isSubmitting;
      if (btnText) btnText.textContent = isSubmitting ? "Sending..." : "Send Message";
      if (btnIcon) btnIcon.style.display = isSubmitting ? "none" : "inline-flex";
      if (btnSpinner) btnSpinner.style.display = isSubmitting ? "inline-block" : "none";
    }

    // Try candidate endpoints sequentially
    function submitToEndpoints(payload, endpoints, index) {
      if (index >= endpoints.length) {
        return Promise.reject(new Error("All contact endpoints unreachable"));
      }

      const targetUrl = endpoints[index];
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000);

      return fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      })
      .then(res => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(data => ({ data, endpoint: targetUrl }))
      .catch(err => {
        clearTimeout(timeoutId);
        console.warn("[ContactForm] Endpoint failed: " + targetUrl + " (" + err.message + ")");
        return submitToEndpoints(payload, endpoints, index + 1);
      });
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();

      let hasError = false;
      const nameVal = nameInput ? nameInput.value.trim() : "";
      const emailVal = emailInput ? emailInput.value.trim() : "";
      const messageVal = messageInput ? messageInput.value.trim() : "";

      if (!nameVal) {
        if (nameInput) nameInput.classList.add("is-invalid");
        if (nameError) {
          nameError.textContent = "Please enter your name.";
          nameError.classList.add("visible");
        }
        hasError = true;
      }

      if (!emailVal || !validateEmail(emailVal)) {
        if (emailInput) emailInput.classList.add("is-invalid");
        if (emailError) {
          emailError.textContent = "Please provide a valid email address.";
          emailError.classList.add("visible");
        }
        hasError = true;
      }

      if (!messageVal || messageVal.length < 5) {
        if (messageInput) messageInput.classList.add("is-invalid");
        if (messageError) {
          messageError.textContent = "Please include a brief message or project details (at least 5 characters).";
          messageError.classList.add("visible");
        }
        hasError = true;
      }

      if (hasError) return;

      const payload = {
        name: nameVal,
        email: emailVal,
        company: companyInput ? companyInput.value.trim() : "",
        roleOrInterest: roleInput ? roleInput.value : "Full-time ServiceNow Architecture",
        phone: phoneInput ? phoneInput.value.trim() : "",
        message: messageVal,
        source: window.location.href,
        timestamp: new Date().toISOString()
      };

      setSubmitting(true);

      submitToEndpoints(payload, CANDIDATE_CONTACT_ENDPOINTS, 0)
        .then(({ data }) => {
          setSubmitting(false);
          contactForm.reset();

          if (statusBanner) {
            statusBanner.className = "contact-status-banner status-success";
            statusBanner.style.display = "block";
            const subId = (data && data.submissionId) ? data.submissionId : "";
            statusBanner.innerHTML = `
              <div class="status-content-title">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span>Message Received!</span>
              </div>
              <p style="margin: 0;">Thank you, <strong>${escapeHtml(payload.name)}</strong>. Your details have been securely logged to the database and sent directly to Géza's inbox. He will follow up with you shortly.</p>
              ${subId ? `<span class="submission-ref-badge">Ref: ${escapeHtml(subId)}</span>` : ""}
            `;
          }
        })
        .catch(err => {
          setSubmitting(false);
          console.error("[ContactForm] Submission failed:", err);
          if (statusBanner) {
            statusBanner.className = "contact-status-banner status-error";
            statusBanner.style.display = "block";
            const mailtoSubject = encodeURIComponent("ServiceNow Opportunity Inquiry — " + payload.name);
            const mailtoBody = encodeURIComponent("Hi Géza,\n\n" + payload.message + "\n\nFrom: " + payload.name + "\nCompany: " + payload.company + "\nEmail: " + payload.email + "\nPhone: " + payload.phone);
            statusBanner.innerHTML = `
              <div class="status-content-title">
                <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                <span>Unable to reach contact server</span>
              </div>
              <p style="margin: 4px 0 10px 0;">The automation endpoint is temporarily unreachable. You can immediately send your message directly via your email client:</p>
              <a href="mailto:ghorvath@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}" class="contact-submit-btn" style="text-decoration: none; padding: 8px 18px; font-size: 12px; display: inline-flex;">
                Open Mail Client (Pre-filled) &rarr;
              </a>
            `;
          }
        });
    });

    function escapeHtml(str) {
      if (!str) return "";
      return str.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
    }
  }
});
