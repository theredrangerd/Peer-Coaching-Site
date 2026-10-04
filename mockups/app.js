/* Site script — minimal vanilla JS, shared by the home and resources pages.
   1. Mobile nav toggle.
   2. Scroll-spy: highlight the nav link for the home-page section in view.
   Native <details> handles the FAQ accordion; no JS needed there. */

(function () {
  "use strict";

  /* --- mobile nav toggle --- */
  var toggle = document.querySelector(".nav-toggle");
  var list = document.getElementById("navlist");

  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // close after choosing a section on mobile
    list.addEventListener("click", function (e) {
      if (e.target.closest("a") && list.classList.contains("open")) {
        list.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- scroll-spy (home page only: nav links are same-page #hashes) --- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.mainnav a[href^="#"]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll("main > section[id]"));

  if (links.length && sections.length && "IntersectionObserver" in window) {
    var current = null;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          if (current) current.removeAttribute("aria-current");
          // sections without a nav link (e.g. the hero) clear the highlight
          current = links.find(function (a) {
            return a.getAttribute("href") === "#" + entry.target.id;
          }) || null;
          if (current) current.setAttribute("aria-current", "true");
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { io.observe(s); });
  }
})();
