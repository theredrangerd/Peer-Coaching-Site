/* Portal mockup — minimal vanilla JS.
   1. Mobile nav toggle.
   2. Scroll-spy: highlight the nav link for the section in view.
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

  /* --- scroll-spy --- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.mainnav a[href^="#"]'));
  var sections = links
    .map(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var current = null;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (current) current.removeAttribute("aria-current");
            var match = sections.find(function (s) { return s.el === entry.target; });
            if (match) {
              match.link.setAttribute("aria-current", "true");
              current = match.link;
            }
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { io.observe(s.el); });
  }
})();
