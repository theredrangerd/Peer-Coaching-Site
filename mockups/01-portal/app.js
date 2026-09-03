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

  /* --- timetable subject filter (custom dropdown) --- */
  var cs = document.getElementById("tt-cselect");
  var ttBody = document.getElementById("tt-body");
  var ttCount = document.getElementById("tt-count");
  var ttEmpty = document.getElementById("tt-empty");

  if (cs && ttBody) {
    var btn = cs.querySelector(".cselect-btn");
    var valueEl = cs.querySelector(".cselect-value");
    var panel = cs.querySelector(".cselect-panel");
    var options = Array.prototype.slice.call(panel.querySelectorAll(".cselect-option"));
    var rows = Array.prototype.slice.call(ttBody.querySelectorAll("tr"));

    var currentValue = "all";
    var activeIndex = 0;

    var setActive = function (i) {
      activeIndex = (i + options.length) % options.length;
      options.forEach(function (o, idx) {
        o.classList.toggle("is-active", idx === activeIndex);
      });
      options[activeIndex].scrollIntoView({ block: "nearest" });
    };

    var isOpen = function () { return !panel.hidden; };

    var openPanel = function () {
      panel.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      var selIdx = options.findIndex(function (o) { return o.dataset.value === currentValue; });
      setActive(selIdx < 0 ? 0 : selIdx);
      document.addEventListener("click", onDocClick, true);
      document.addEventListener("keydown", onKeydown, true);
    };

    var closePanel = function (focusBtn) {
      if (panel.hidden) return;
      panel.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      document.removeEventListener("click", onDocClick, true);
      document.removeEventListener("keydown", onKeydown, true);
      if (focusBtn) btn.focus();
    };

    var choose = function (i) {
      var opt = options[i];
      currentValue = opt.dataset.value;
      valueEl.textContent = opt.textContent;
      options.forEach(function (o) { o.setAttribute("aria-selected", String(o === opt)); });
      closePanel(true);
      applyFilter(true);
    };

    function onDocClick(e) { if (!cs.contains(e.target)) closePanel(false); }

    function onKeydown(e) {
      if (!isOpen()) return;
      switch (e.key) {
        case "Escape": e.preventDefault(); closePanel(true); break;
        case "ArrowDown": e.preventDefault(); setActive(activeIndex + 1); break;
        case "ArrowUp": e.preventDefault(); setActive(activeIndex - 1); break;
        case "Home": e.preventDefault(); setActive(0); break;
        case "End": e.preventDefault(); setActive(options.length - 1); break;
        case "Enter":
        case " ": e.preventDefault(); choose(activeIndex); break;
      }
    }

    btn.addEventListener("click", function () {
      isOpen() ? closePanel(true) : openPanel();
    });
    btn.addEventListener("keydown", function (e) {
      if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !isOpen()) {
        e.preventDefault();
        openPanel();
      }
    });
    options.forEach(function (o, i) {
      o.addEventListener("click", function () { choose(i); });
      o.addEventListener("mousemove", function () { if (i !== activeIndex) setActive(i); });
    });

    var applyFilter = function (animate) {
      var all = currentValue === "all";
      var shown = 0;
      var visible = [];

      rows.forEach(function (row) {
        var subject = row.getAttribute("data-subject");
        var isOff = subject === "none";
        var match = all ? true : subject === currentValue;
        row.hidden = !match;
        row.classList.remove("is-in");
        if (match) visible.push(row);
        if (match && !isOff) shown++;
      });

      if (animate) {
        void ttBody.offsetWidth; // force reflow so the stagger re-triggers
        visible.forEach(function (row, i) {
          row.style.setProperty("--i", Math.min(i, 8));
          row.classList.add("is-in");
        });
      }

      if (ttEmpty) ttEmpty.hidden = all || shown > 0;
      if (ttCount) {
        ttCount.textContent = all
          ? ""
          : shown + (shown === 1 ? " session" : " sessions") + " a week for " + currentValue;
      }
    };

    applyFilter(false);
  }
})();
