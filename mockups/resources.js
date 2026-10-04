/* Revision resources page — vanilla JS.
   1. "On this page" sidebar drawer toggle (mobile).
   2. Scroll-spy: mark the sidebar link for the section in view.
   3. Table row filter. */

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

  /* --- table filter: hides non-matching rows across every [data-filterable] table --- */
  var input = document.getElementById("res-filter");
  var countEl = document.getElementById("res-count");
  var tables = Array.prototype.slice.call(document.querySelectorAll("table[data-filterable]"));
  if (input && tables.length) {
    var rows = [];
    tables.forEach(function (t) {
      Array.prototype.forEach.call(t.tBodies[0].rows, function (r) { rows.push({ table: t, row: r }); });
    });
    var total = rows.length;

    var render = function () {
      var q = input.value.trim().toLowerCase();
      var shown = 0;
      var perTable = new Map();
      rows.forEach(function (x) {
        var match = q === "" || x.row.textContent.toLowerCase().indexOf(q) !== -1;
        x.row.hidden = !match;
        if (match) { shown++; perTable.set(x.table, (perTable.get(x.table) || 0) + 1); }
      });
      tables.forEach(function (t) {
        var wrap = t.closest(".table-scroll");
        var empty = wrap.nextElementSibling && wrap.nextElementSibling.classList.contains("filter-empty")
          ? wrap.nextElementSibling : null;
        if (q !== "" && !perTable.get(t)) {
          if (!empty) {
            empty = document.createElement("p");
            empty.className = "filter-empty";
            empty.textContent = "Nothing in this table matches.";
            wrap.after(empty);
          }
        } else if (empty) {
          empty.remove();
        }
      });
      if (countEl) {
        countEl.textContent = q === "" ? "" : shown + " of " + total + " rows shown";
      }
    };

    input.addEventListener("input", render);
    render();
  }
})();
