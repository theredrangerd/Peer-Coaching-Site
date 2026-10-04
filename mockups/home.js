/* Home page motion — scroll reveals, count-up numbers, header that turns solid.
   All of it is skipped when the visitor prefers reduced motion. */

(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- light / dark toggle (choice is remembered; dark is the default) --- */
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  function syncThemeBtn() {
    var light = root.getAttribute("data-theme") === "light";
    themeBtn.setAttribute("aria-pressed", String(light));
    themeBtn.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
  }
  if (themeBtn) {
    syncThemeBtn();
    themeBtn.addEventListener("click", function () {
      var light = root.getAttribute("data-theme") !== "light";
      if (light) root.setAttribute("data-theme", "light"); else root.removeAttribute("data-theme");
      try { localStorage.setItem("pc-theme", light ? "light" : "dark"); } catch (e) {}
      syncThemeBtn();
    });
  }

  /* --- header: transparent over the hero, solid once you scroll --- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("is-solid", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- scroll reveals: tag the below-the-fold blocks, stagger siblings --- */
  var groups = [
    ".section-head", ".split > *", ".aside-card",
    ".why-row", ".steps li", ".path", ".trust h2", ".trust-grid > div",
    ".accordion", ".contact-card", ".feedback-card"
  ];
  groups.forEach(function (sel) {
    document.querySelectorAll("main " + sel).forEach(function (el, i) {
      if (el.closest(".hero") || el.classList.contains("rise")) return;
      el.classList.add("rise");
      if (sel === ".steps li" || sel === ".path" || sel === ".trust-grid > div" || sel === ".contact-card") {
        el.style.setProperty("--d", (i % 4) * 0.1 + "s");
      }
    });
  });

  var els = document.querySelectorAll(".rise");
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* --- count-up numbers in the hero facts --- */
  if (!reduce) {
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = +el.dataset.count, start = null;
      el.textContent = "0";
      setTimeout(function () {
        requestAnimationFrame(function step(t) {
          start = start || t;
          var p = Math.min((t - start) / 900, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        });
      }, 700);
    });
  }
})();
