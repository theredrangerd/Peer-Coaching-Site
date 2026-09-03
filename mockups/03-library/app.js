/* Library mockup — vanilla JS.
   1. Sidebar drawer toggle (mobile).
   2. Scroll-spy: mark the sidebar link for the section in view.
   3. FAQ text filter.
   Native <details> handles expand/collapse. */

(function () {
  "use strict";

  /* --- sidebar drawer --- */
  var toggle = document.querySelector(".sidebar-toggle");
  var sidebar = document.getElementById("sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", function () {
      var open = sidebar.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a") && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- scroll-spy --- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.sidebar a[href^="#"]'));
  var map = links
    .map(function (a) {
      var el = document.getElementById(a.getAttribute("href").slice(1));
      return el ? { link: a, el: el } : null;
    })
    .filter(Boolean);

  if (map.length && "IntersectionObserver" in window) {
    var currentLink = null;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var hit = map.find(function (m) { return m.el === entry.target; });
          if (!hit) return;
          if (currentLink) currentLink.removeAttribute("aria-current");
          hit.link.setAttribute("aria-current", "true");
          currentLink = hit.link;
        });
      },
      { rootMargin: "-10% 0px -75% 0px", threshold: 0 }
    );
    map.forEach(function (m) { io.observe(m.el); });
  }

  /* --- FAQ filter --- */
  var input = document.getElementById("faq-filter");
  var listEl = document.getElementById("faq-list");
  var countEl = document.getElementById("faq-count");
  if (input && listEl) {
    var items = Array.prototype.slice.call(listEl.querySelectorAll("details"));
    var total = items.length;

    var render = function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      items.forEach(function (d) {
        var match = q === "" || d.textContent.toLowerCase().indexOf(q) !== -1;
        d.hidden = !match;
        if (match) shown++;
      });
      var empty = listEl.querySelector(".faq-empty");
      if (shown === 0) {
        if (!empty) {
          empty = document.createElement("p");
          empty.className = "faq-empty";
          empty.textContent = "No questions match that. Try a different word, or contact a coordinator.";
          listEl.appendChild(empty);
        }
      } else if (empty) {
        empty.remove();
      }
      if (countEl) {
        countEl.textContent = q === ""
          ? total + " questions"
          : shown + " of " + total + " shown";
      }
    };

    input.addEventListener("input", render);
    render();
  }
})();
