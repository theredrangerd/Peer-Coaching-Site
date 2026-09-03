/* Portal mockup — minimal vanilla JS.
   1. Mobile nav toggle.
   2. Scroll-spy: highlight the nav link for the section in view.
   3. Timetable subject filter.
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

  /* --- timetable subject filter --- */
  var ttSelect = document.getElementById("tt-subject");
  var ttBody = document.getElementById("tt-body");
  var ttCount = document.getElementById("tt-count");
  var ttEmpty = document.getElementById("tt-empty");

  if (ttSelect && ttBody) {
    var rows = Array.prototype.slice.call(ttBody.querySelectorAll("tr"));

    var applyFilter = function () {
      var value = ttSelect.value;
      var all = value === "all";
      var shown = 0;

      rows.forEach(function (row) {
        var subject = row.getAttribute("data-subject");
        var isOff = subject === "none";
        var match = all ? true : subject === value;
        row.hidden = !match;
        if (match && !isOff) shown++;
      });

      if (ttEmpty) ttEmpty.hidden = all || shown > 0;

      if (ttCount) {
        if (all) {
          ttCount.textContent = "";
        } else {
          ttCount.textContent =
            shown + (shown === 1 ? " session" : " sessions") + " a week for " + value;
        }
      }
    };

    ttSelect.addEventListener("change", applyFilter);
    applyFilter();
  }
})();
