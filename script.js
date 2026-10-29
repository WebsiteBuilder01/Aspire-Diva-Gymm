
/* ==========================================
   ASPIRE DIVA GYM — WEBSITE INTERACTIONS
========================================== */

"use strict";

// Gym WhatsApp contact
const GYM_WHATSAPP_NUMBER = "918136078937";

const WHATSAPP_MESSAGE =
  "Hi ASPIRE DIVA GYM! 💗 I'm interested in your gym membership. Please share the membership prices, timings and available facilities.";

const WHATSAPP_URL =
  "https://wa.me/" +
  GYM_WHATSAPP_NUMBER +
  "?text=" +
  encodeURIComponent(WHATSAPP_MESSAGE);

// Open WhatsApp from all enquiry buttons
document.querySelectorAll(".whatsapp-link").forEach((link) => {
  link.href = WHATSAPP_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer");
  });
});

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

function closeMenu() {
  if (!menuToggle || !siteNav) return;

  menuToggle.classList.remove("active");
  siteNav.classList.remove("open");
  document.body.classList.remove("menu-open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

// Gentle reveal animations when sections enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -25px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  // Fallback for browsers without IntersectionObserver
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

// Automatically update the copyright year
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Allow reduced-motion preferences to remain respected
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}
