/* Editorial mockup — mobile nav drawer only.
   Native <details> handles the FAQ. No scroll-spy (multi-page). */

(function () {
  "use strict";
  var toggle = document.querySelector(".nav-toggle");
  var list = document.getElementById("nav");
  if (!toggle || !list) return;

  toggle.addEventListener("click", function () {
    var open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
})();
