(() => {
  "use strict";

  const START_DATE = new Date("2005-02-07T00:00:00+01:00");

  // Bilder für 3x3-Slideshow (deine Liste)
  const IMAGE_FILES = [
    "IMG_0653.jpg",
    "MAMA (1).JPG",
    "MAMA (10).jpg",
    "MAMA (11).jpg",
    "MAMA (12).jpg",
    "MAMA (13).jpg",
    "MAMA (14).jpg",
    "MAMA (15).jpg",
    "MAMA (16).jpg",
    "MAMA (17).jpg",
    "MAMA (18).jpg",
    "MAMA (19).jpg",
    "MAMA (2).JPG",
    "MAMA (20).jpg",
    "MAMA (21).jpg",
    "MAMA (22).jpg",
    "MAMA (23).jpg",
    "MAMA (3).jpg",
    "MAMA (4).jpg",
    "MAMA (5).jpg",
    "MAMA (6).jpg",
    "MAMA (7).jpg",
    "MAMA (8).jpg",
    "MAMA (9).jpg",
    "akse0083.jpg",
    "akse0202.jpg",
    "akse0288sw.jpg",
    "akse0303sw.jpg",
    "akse0314sw.jpg",
    "akse0318sw.jpg",
    "akse0562.jpg",
    "akse0579.jpg",
    "akse0580.jpg",
    "akse0583.jpg",
    "akse0601.jpg",
    "akse0646.jpg",
    "akse0762.jpg",
    "akse0867.jpg",
    "akse0913.jpg",
    "akse1025.jpg",
    "akse1085.jpg",
    "akse1227.jpg",
    "akse1637.jpg",
    "akse1939.jpg",
    "akse1947.jpg",
    "akse1975.jpg",
    "akse2160.jpg",
    "akse2198.jpg",
    "akse2624.jpg",
    "akse2635.jpg",
    "akse2700.jpg",
    "akse2705.jpg"
  ];

  // explizit ausgeschlossen
  const EXCLUDED = new Set([
    "bg.jpg",
    "carolinKebekus.jpg",
    "dean-lewis.jpg",
    "gift-01.png"
  ]);

  const GRID_SIZE = 9;           // 3x3
  const SLIDE_INTERVAL_MS = 2600;
  const FADE_MS = 420;

  const counterEl = document.getElementById("counter");
  const yearEl = document.getElementById("year");
  const dialog = document.getElementById("giftDialog");
  const openBtn = document.getElementById("openGiftBtn");
  const grid = document.getElementById("photoGrid");
  const gridImgs = grid ? Array.from(grid.querySelectorAll("img")) : [];

  let slideshowTimer = null;
  let allImages = [];
  let currentGrid = []; // aktuell sichtbare 9 Bildpfade

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalizeImages() {
    const unique = Array.from(new Set(IMAGE_FILES.map((f) => f.trim()).filter(Boolean)));
    return unique
      .filter((f) => !EXCLUDED.has(f))
      .map((f) => `images/${f}`);
  }

  function pickInitialSet() {
    // 9 unterschiedliche Bilder für Startansicht
    const shuffled = shuffle(allImages);
    return shuffled.slice(0, Math.min(GRID_SIZE, shuffled.length));
  }

  function renderInitialGrid() {
    if (!gridImgs.length || !allImages.length) return;
    currentGrid = pickInitialSet();

    for (let i = 0; i < gridImgs.length; i++) {
      const src = currentGrid[i] || currentGrid[currentGrid.length - 1];
      if (src) gridImgs[i].src = src;
    }
  }

  function pickReplacementImage() {
    // Nur Bilder wählen, die gerade NICHT sichtbar sind
    const visible = new Set(currentGrid);
    const candidates = allImages.filter((src) => !visible.has(src));
    if (!candidates.length) return null; // falls insgesamt zu wenige Bilder
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function rotateOneTile() {
    if (!gridImgs.length || !currentGrid.length) return;

    const tileIndex = Math.floor(Math.random() * Math.min(gridImgs.length, currentGrid.length));
    const imgEl = gridImgs[tileIndex];
    const replacement = pickReplacementImage();
    if (!replacement) return;

    imgEl.style.opacity = "0";
    window.setTimeout(() => {
      imgEl.src = replacement;
      currentGrid[tileIndex] = replacement; // Zustand aktualisieren => weiter eindeutig
      imgEl.style.opacity = "1";
    }, FADE_MS);
  }

  function startSlideshow() {
    if (!gridImgs.length) return;

    allImages = normalizeImages();

    if (allImages.length < GRID_SIZE) {
      console.warn(`Zu wenige Bilder für 3x3 ohne Duplikate. Gefunden: ${allImages.length}`);
    }

    renderInitialGrid();

    if (slideshowTimer) clearInterval(slideshowTimer);
    slideshowTimer = window.setInterval(() => {
      // 2 Kacheln pro Intervall austauschen, weiterhin ohne doppelte Gleichzeitigkeit
      rotateOneTile();
      rotateOneTile();
    }, SLIDE_INTERVAL_MS);
  }

  function stopSlideshow() {
    if (slideshowTimer) {
      clearInterval(slideshowTimer);
      slideshowTimer = null;
    }
  }

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

    const totalDays = Math.floor((to - from) / (1000 * 60 * 60 * 24));
    return { years, months, days, totalDays };
  }

  function updateCounter() {
    if (!counterEl) return;
    const now = new Date();
    const { years, months, days, totalDays } = diffParts(START_DATE, now);
    counterEl.textContent = `${years} Jahre, ${months} Monate, ${days} Tage (${totalDays} Tage voller Liebe)`;
  }

  function setupDialog() {
    if (!dialog || !openBtn) return;

    openBtn.addEventListener("click", () => {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "open");
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

  function init() {
    updateCounter();
    initYear();
    setupDialog();
    startSlideshow();

    setInterval(updateCounter, 60 * 1000);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopSlideshow();
      else {
        updateCounter();
        startSlideshow();
      }
    });
  }

  init();
})();
