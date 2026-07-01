(() => {
  "use strict";

  // 👉 Bei Bedarf anpassen:
  const START_DATE = new Date("2005-02-07T00:00:00+01:00");

  // Bilder für dynamischen Wechsel:
  // Wichtig: Diese Dateien müssen im Repo unter /images/ existieren.
  const SLIDESHOW_IMAGES = [
    "images/IMG_0653.jpg",
    "images/IMG_0654.jpg",
    "images/IMG_0655.jpg",
    "images/IMG_0656.jpg"
  ];

  const SLIDE_INTERVAL_MS = 6000;
  const FADE_DURATION_MS = 450;

  const counterEl = document.getElementById("counter");
  const yearEl = document.getElementById("year");
  const dialog = document.getElementById("giftDialog");
  const openBtn = document.getElementById("openGiftBtn");
  const photoEl = document.querySelector(".photo img");

  let slideIndex = 0;
  let slideTimer = null;

  function diffParts(from, to) {
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const ms = to - from;
    const totalDays = Math.floor(ms / (1000 * 60 * 60 * 24));

    return { years, months, days, totalDays };
  }

  function updateCounter() {
    if (!counterEl) return;
    const now = new Date();
    const { years, months, days, totalDays } = diffParts(START_DATE, now);

    counterEl.textContent =
      `${years} Jahre, ${months} Monate, ${days} Tage (${totalDays} Tage voller Liebe)`;
  }

  function setupDialog() {
    if (!dialog || !openBtn) return;

    openBtn.addEventListener("click", () => {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "open");
      }
    });

    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!inside && typeof dialog.close === "function") dialog.close();
    });
  }

  function initYear() {
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  function preloadImages(paths) {
    paths.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }

  function showSlide(nextIndex) {
    if (!photoEl || SLIDESHOW_IMAGES.length === 0) return;

    const safeIndex = (nextIndex + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length;
    const nextSrc = SLIDESHOW_IMAGES[safeIndex];

    photoEl.style.transition = `opacity ${FADE_DURATION_MS}ms ease`;
    photoEl.style.opacity = "0";

    window.setTimeout(() => {
      photoEl.src = nextSrc;
      photoEl.style.opacity = "1";
      slideIndex = safeIndex;
    }, FADE_DURATION_MS);
  }

  function startSlideshow() {
    if (!photoEl || SLIDESHOW_IMAGES.length < 2) return;

    // Startbild auf erstes Slideshow-Bild setzen
    photoEl.src = SLIDESHOW_IMAGES[0];
    photoEl.style.opacity = "1";

    preloadImages(SLIDESHOW_IMAGES.slice(1));

    slideTimer = window.setInterval(() => {
      showSlide(slideIndex + 1);
    }, SLIDE_INTERVAL_MS);
  }

  function stopSlideshow() {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  }

  function init() {
    updateCounter();
    initYear();
    setupDialog();
    startSlideshow();

    setInterval(updateCounter, 60 * 1000);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopSlideshow();
      } else {
        updateCounter();
        startSlideshow();
      }
    });
  }

  init();
})();
