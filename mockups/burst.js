/* Subject-chip "paint grenade" burst, built on tsParticles.
   Two full-viewport canvases: one for gooey paint, one for crisp symbols.
   Prototype: Mathematics, Physics, Chemistry, Biology, Economics, History, English, Geography and Art. */
(function () {
  if (!window.tsParticles || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var SETS = {
    math: {
      glyphs: ["+", "−", "×", "÷", "=", "π", "∫", "√", "Σ", "∞", "θ", "Δ",
               "x²", "sin", "cos", "dy/dx", "lim", "≠", "≤", "7", "3", "9"],
      ink: ["#1e40af", "#1d4ed8", "#2563eb", "#3b82f6", "#0284c7"],
      paint: ["#2563eb", "#3b82f6", "#1d4ed8", "#60a5fa"]
    },
    chem: {
      glyphs: ["H\u2082O", "CO\u2082", "NaCl", "H\u207a", "pH", "mol", "O\u2082", "CH\u2084", "NH\u2083", "e\u207b",
               "\u21cc", "\u2192", "\u0394H", "Fe", "Au", "C\u2086H\u2086", "[ ]", "Mg", "Cl\u207b"],
      ink: ["#713f12", "#854d0e", "#a16207", "#8a7d00", "#5f5a05"],
      paint: ["#fde047", "#facc15", "#f0e130", "#e5d300"]
    },
    bio: {
      glyphs: ["DNA", "RNA", "mRNA", "ATP", "cell", "mitosis", "enzyme", "C\u2086H\u2081\u2082O\u2086", "O\u2082", "CO\u2082", "nucleus",
               "gene", "protein", "osmosis", "ecosystem", "Darwin", "\u2640", "\u2642"],
      imageChance: 0.5, imageSize: { min: 34, max: 58 },
      ink: ["#14532d", "#166534", "#15803d", "#16a34a", "#365314"],
      paint: ["#22c55e", "#16a34a", "#4ade80", "#15803d"]
    },
    econ: {
      glyphs: ["GDP", "GNI", "CPI", "S", "D", "AD", "AS", "PPC", "Q*", "P\u2191", "P\u2193", "%", "$", "\u20ac", "\u00a3", "\u00a5",
               "inflation", "supply", "demand", "tax", "trade", "growth"],
      imageChance: 0.5, imageSize: { min: 34, max: 58 },
      ink: ["#7c2d12", "#9a3412", "#c2410c", "#ea580c", "#b45309"],
      paint: ["#fb923c", "#f97316", "#ea580c", "#fdba74"]
    },
    hist: {
      glyphs: ["Meiji Restoration", "1868", "Emperor Meiji", "samurai", "Iwakura Mission", "Japan",
               "Gorbachev", "glasnost", "perestroika", "1991", "USSR collapse", "Yeltsin", "Russian Federation",
               "French Revolution", "1789", "Bastille", "Indian independence", "Gandhi", "Salt March", "1947",
               "women\u2019s suffrage", "19th Amendment", "1920", "Seneca Falls",
               "Opium Wars", "Taiping", "Boxer Rebellion", "1911", "Qing", "Sun Yat-sen"],
      textSize: { min: 16, max: 28 }, longSize: { min: 13, max: 21 },
      ink: ["#111827", "#1f2937", "#374151", "#4b5563", "#6b7280"],
      paint: ["#9ca3af", "#6b7280", "#4b5563", "#cbd5e1"]
    },
    eng: {
      glyphs: ["Shakespeare", "Dostoevsky", "Austen", "Dickens", "Orwell", "Tolstoy", "Bront\u00eb", "Woolf", "Hardy", "Wilde", "Keats",
               "Byron", "Chekhov", "Hemingway", "Fitzgerald", "Homer", "Dante", "Joyce", "Kafka", "Twain"],
      font: "Pinyon Script", weight: "400",
      textSize: { min: 34, max: 56 }, longSize: { min: 28, max: 46 },
      imageChance: 0.25, imageSize: { min: 34, max: 56 },
      ink: ["#2b1d0e", "#3b2a14", "#5a3d1a", "#7a5230", "#4a3219"],
      paint: ["#c9a66b", "#a67c3d", "#8b5e2b", "#d9bf8c"]
    },
    geog: {
      glyphs: ["N", "S", "E", "W", "latitude", "longitude", "delta", "tectonic", "monsoon", "glacier", "erosion", "equator",
               "contour", "\u00b0N", "\u00b0E", "plateau", "river", "tundra", "biome", "atlas", "urban", "migration"],
      imageChance: 0.5, imageSize: { min: 34, max: 58 },
      ink: ["#1a2e05", "#365314", "#3f6212", "#57534e", "#78350f"],
      paint: ["#4d7c0f", "#65a30d", "#3f6212", "#8a6f3e"]
    },
    art: {
      glyphs: ["colour", "hue", "tint", "shade", "canvas", "oil", "sketch", "mural"],
      imageChance: 0.55, imageSize: { min: 34, max: 60 },
      textSize: { min: 20, max: 36 }, longSize: { min: 18, max: 30 },
      ink: ["#dc2626", "#ea580c", "#ca8a04", "#16a34a", "#2563eb", "#7c3aed", "#db2777"],
      paint: ["#ef4444", "#f97316", "#facc15", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"]
    },
    phys: {
      glyphs: ["dx/dt", "\u2202", "\u2207", "\u222b", "\u0394", "d\u00b2x", "lim",
               "F=ma", "\u03a3F", "v", "a", "g", "N", "J", "W", "\u03c9", "\u03bb", "\u03bc", "\u03a6", "\u0127", "c\u00b2", "E=mc\u00b2"],
      /* force vectors: they point along their line of flight, like arrows on a free-body diagram */
      arrows: ["\u2192", "\u27f6"],
      ink: ["#92400e", "#b45309", "#d97706", "#ca8a04", "#f59e0b"],
      paint: ["#facc15", "#fbbf24", "#f59e0b", "#eab308"]
    }
  };

  /* ball-and-stick molecule icons, drawn as inline SVG so the image shape can scatter them.
     atoms: [x, y, radius, fill]; bonds: [from, to, count] (index into atoms) */
  var BOND = "#854d0e", LEMON = "#fde047", AMBER = "#f59e0b";
  function molecule(atoms, bonds, ring) {
    var g = "";
    if (ring) g += '<circle cx="50" cy="50" r="' + ring + '" fill="none" stroke="' + BOND + '" stroke-width="4"/>';
    bonds.forEach(function (b) {
      var a = atoms[b[0]], c = atoms[b[1]], n = b[2] || 1;
      var dx = c[0] - a[0], dy = c[1] - a[1], len = Math.sqrt(dx * dx + dy * dy) || 1;
      var nx = -dy / len * 4, ny = dx / len * 4;
      for (var k = 0; k < n; k++) {
        var off = n === 1 ? 0 : (k - (n - 1) / 2) * 2;
        g += '<line x1="' + (a[0] + nx * off) + '" y1="' + (a[1] + ny * off) + '" x2="' + (c[0] + nx * off) + '" y2="' + (c[1] + ny * off) +
             '" stroke="' + BOND + '" stroke-width="5" stroke-linecap="round"/>';
      }
    });
    atoms.forEach(function (a) {
      g += '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="' + a[2] + '" fill="' + a[3] + '" stroke="' + BOND + '" stroke-width="4"/>';
    });
    return "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' + g + "</svg>");
  }
  var hex = [0, 1, 2, 3, 4, 5].map(function (i) {
    var t = (Math.PI / 3) * i - Math.PI / 2;
    return [50 + Math.cos(t) * 32, 50 + Math.sin(t) * 32, 8, i % 2 ? LEMON : AMBER];
  });
  var MOLECULES = [
    molecule([[50, 36, 16, AMBER], [22, 70, 10, LEMON], [78, 70, 10, LEMON]], [[0, 1], [0, 2]]),                   /* H2O */
    molecule([[50, 50, 14, AMBER], [16, 50, 13, LEMON], [84, 50, 13, LEMON]], [[0, 1, 2], [0, 2, 2]]),             /* CO2 */
    molecule([[50, 50, 14, AMBER], [24, 24, 9, LEMON], [76, 24, 9, LEMON], [24, 76, 9, LEMON], [76, 76, 9, LEMON]],
             [[0, 1], [0, 2], [0, 3], [0, 4]]),                                                                     /* CH4 */
    molecule([[50, 30, 14, AMBER], [22, 70, 10, LEMON], [50, 78, 10, LEMON], [78, 70, 10, LEMON]], [[0, 1], [0, 2], [0, 3]]), /* NH3 */
    molecule(hex, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]], 18),                                           /* benzene */
    molecule([[30, 50, 17, AMBER], [72, 50, 17, AMBER]], [[0, 1, 2]])                                               /* O2 */
  ];


  /* simple one-off SVG icons (cells, economics diagrams) as data URIs */
  function icon(inner) {
    return "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' + inner + "</svg>");
  }
  var G = "#166534", O = "#9a3412";
  var CELLS = [
    /* animal cell */
    icon('<ellipse cx="50" cy="50" rx="43" ry="38" fill="#bbf7d0" stroke="' + G + '" stroke-width="5"/>' +
         '<circle cx="45" cy="48" r="15" fill="#4ade80" stroke="' + G + '" stroke-width="4"/><circle cx="45" cy="48" r="5" fill="' + G + '"/>' +
         '<ellipse cx="74" cy="38" rx="8" ry="5" fill="#86efac" stroke="' + G + '" stroke-width="3" transform="rotate(-25 74 38)"/>' +
         '<ellipse cx="70" cy="68" rx="8" ry="5" fill="#86efac" stroke="' + G + '" stroke-width="3" transform="rotate(20 70 68)"/>' +
         '<ellipse cx="24" cy="66" rx="7" ry="5" fill="#86efac" stroke="' + G + '" stroke-width="3"/>'),
    /* plant cell */
    icon('<rect x="8" y="12" width="84" height="76" rx="14" fill="#dcfce7" stroke="#14532d" stroke-width="5"/>' +
         '<rect x="30" y="28" width="40" height="44" rx="10" fill="#f0fdf4" stroke="' + G + '" stroke-width="3"/>' +
         '<ellipse cx="20" cy="28" rx="7" ry="5" fill="#16a34a" stroke="#14532d" stroke-width="3"/><ellipse cx="80" cy="30" rx="7" ry="5" fill="#16a34a" stroke="#14532d" stroke-width="3"/>' +
         '<ellipse cx="22" cy="72" rx="7" ry="5" fill="#16a34a" stroke="#14532d" stroke-width="3"/><ellipse cx="78" cy="72" rx="7" ry="5" fill="#16a34a" stroke="#14532d" stroke-width="3"/>' +
         '<circle cx="50" cy="50" r="7" fill="#4ade80" stroke="' + G + '" stroke-width="3"/>'),
    /* bacterium with flagellum */
    icon('<path d="M64 50 q10 -16 18 0 t16 0" fill="none" stroke="' + G + '" stroke-width="4" stroke-linecap="round"/>' +
         '<rect x="6" y="34" width="62" height="32" rx="16" fill="#86efac" stroke="' + G + '" stroke-width="5"/>' +
         '<circle cx="26" cy="50" r="4" fill="' + G + '"/><circle cx="40" cy="44" r="3" fill="' + G + '"/><circle cx="46" cy="56" r="3.5" fill="' + G + '"/>'),
    /* dividing cell */
    icon('<circle cx="32" cy="50" r="26" fill="#bbf7d0" stroke="' + G + '" stroke-width="5"/><circle cx="68" cy="50" r="26" fill="#bbf7d0" stroke="' + G + '" stroke-width="5"/>' +
         '<circle cx="30" cy="50" r="9" fill="#4ade80" stroke="' + G + '" stroke-width="3"/><circle cx="70" cy="50" r="9" fill="#4ade80" stroke="' + G + '" stroke-width="3"/>'),
    /* DNA helix */
    icon('<path d="M30 6 C82 26 82 40 50 50 C18 60 18 74 70 94" fill="none" stroke="' + G + '" stroke-width="6" stroke-linecap="round"/>' +
         '<path d="M70 6 C18 26 18 40 50 50 C82 60 82 74 30 94" fill="none" stroke="#22c55e" stroke-width="6" stroke-linecap="round"/>' +
         '<line x1="40" y1="14" x2="60" y2="14" stroke="#4ade80" stroke-width="4"/><line x1="36" y1="28" x2="64" y2="28" stroke="#4ade80" stroke-width="4"/>' +
         '<line x1="36" y1="72" x2="64" y2="72" stroke="#4ade80" stroke-width="4"/><line x1="40" y1="86" x2="60" y2="86" stroke="#4ade80" stroke-width="4"/>')
  ];
  var ECON = [
    /* supply and demand */
    icon('<path d="M14 8 V86 H92" fill="none" stroke="#7c2d12" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
         '<line x1="24" y1="20" x2="86" y2="76" stroke="#ea580c" stroke-width="6" stroke-linecap="round"/><line x1="24" y1="76" x2="86" y2="20" stroke="' + O + '" stroke-width="6" stroke-linecap="round"/>' +
         '<circle cx="55" cy="48" r="8" fill="#fdba74" stroke="#7c2d12" stroke-width="3"/>'),
    /* rising bar chart */
    icon('<rect x="12" y="58" width="18" height="28" fill="#fb923c" stroke="' + O + '" stroke-width="4"/><rect x="38" y="40" width="18" height="46" fill="#f97316" stroke="' + O + '" stroke-width="4"/>' +
         '<rect x="64" y="18" width="18" height="68" fill="#ea580c" stroke="' + O + '" stroke-width="4"/><line x1="8" y1="88" x2="92" y2="88" stroke="#7c2d12" stroke-width="5" stroke-linecap="round"/>'),
    /* coin */
    icon('<circle cx="50" cy="50" r="38" fill="#fdba74" stroke="' + O + '" stroke-width="5"/><circle cx="50" cy="50" r="28" fill="none" stroke="' + O + '" stroke-width="3"/>' +
         '<text x="50" y="65" text-anchor="middle" font-family="Georgia,serif" font-size="42" font-weight="bold" fill="' + O + '">$</text>'),
    /* production possibility curve */
    icon('<path d="M14 8 V86 H92" fill="none" stroke="#7c2d12" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>' +
         '<path d="M20 22 Q70 24 86 78" fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round"/><circle cx="58" cy="35" r="7" fill="#fdba74" stroke="#7c2d12" stroke-width="3"/>')
  ];
  var BR = "#4a3219", PA = "#e7d5a8";
  var LIT = [
    /* quill */
    icon('<path d="M84 8 C58 12 28 38 20 76 L16 92 L28 82 C62 72 88 44 84 8 Z" fill="' + PA + '" stroke="' + BR + '" stroke-width="4" stroke-linejoin="round"/>' +
         '<path d="M84 8 C60 30 36 56 18 90" fill="none" stroke="' + BR + '" stroke-width="3" stroke-linecap="round"/>'),
    /* open book */
    icon('<path d="M8 22 Q30 14 50 24 V84 Q30 74 8 82 Z" fill="' + PA + '" stroke="' + BR + '" stroke-width="4" stroke-linejoin="round"/>' +
         '<path d="M92 22 Q70 14 50 24 V84 Q70 74 92 82 Z" fill="#f3e8c8" stroke="' + BR + '" stroke-width="4" stroke-linejoin="round"/>' +
         '<path d="M16 38 Q30 33 42 40 M16 52 Q30 47 42 54 M58 40 Q70 33 84 38 M58 54 Q70 47 84 52" fill="none" stroke="' + BR + '" stroke-width="2.5" stroke-linecap="round"/>'),
    /* ink pot with quill */
    icon('<path d="M30 46 H70 V82 Q70 90 62 90 H38 Q30 90 30 82 Z" fill="#6b4a2a" stroke="' + BR + '" stroke-width="4" stroke-linejoin="round"/>' +
         '<rect x="38" y="36" width="24" height="12" fill="#8b6a3e" stroke="' + BR + '" stroke-width="4"/>' +
         '<path d="M78 6 C66 12 54 22 48 34 L52 36 C64 30 76 20 78 6 Z" fill="' + PA + '" stroke="' + BR + '" stroke-width="3" stroke-linejoin="round"/>')
  ];
  var GT = "#365314";
  var GEO = [
    /* compass rose */
    icon('<circle cx="50" cy="50" r="42" fill="#ecfccb" stroke="' + GT + '" stroke-width="4"/>' +
         '<path d="M50 8 L58 42 L92 50 L58 58 L50 92 L42 58 L8 50 L42 42 Z" fill="#84cc16" stroke="' + GT + '" stroke-width="3" stroke-linejoin="round"/>' +
         '<path d="M50 8 L58 42 L42 42 Z" fill="#3f6212"/><circle cx="50" cy="50" r="5" fill="#fff" stroke="' + GT + '" stroke-width="2"/>'),
    /* mountains */
    icon('<path d="M4 84 L34 26 L52 58 L66 38 L96 84 Z" fill="#78716c" stroke="#44403c" stroke-width="4" stroke-linejoin="round"/>' +
         '<path d="M34 26 L25 43 L33 40 L38 45 L43 40 Z" fill="#fff"/><path d="M66 38 L59 50 L65 48 L69 52 L74 47 Z" fill="#fff"/>'),
    /* globe */
    icon('<circle cx="50" cy="50" r="40" fill="#d9f99d" stroke="' + GT + '" stroke-width="4"/>' +
         '<path d="M26 34 Q38 24 48 32 Q44 44 34 46 Q24 44 26 34 Z M54 52 Q70 46 76 58 Q72 74 58 72 Q50 62 54 52 Z" fill="#65a30d" stroke="' + GT + '" stroke-width="2"/>' +
         '<ellipse cx="50" cy="50" rx="18" ry="40" fill="none" stroke="' + GT + '" stroke-width="2"/><line x1="10" y1="50" x2="90" y2="50" stroke="' + GT + '" stroke-width="2"/>'),
    /* contour map */
    icon('<path d="M12 56 Q10 24 44 18 Q86 14 90 52 Q92 86 54 88 Q16 90 12 56 Z" fill="#f7fee7" stroke="#78350f" stroke-width="3.5"/>' +
         '<path d="M26 54 Q26 34 46 32 Q72 30 74 52 Q74 72 52 74 Q28 74 26 54 Z" fill="none" stroke="#78350f" stroke-width="3.5"/>' +
         '<path d="M40 52 Q40 44 50 44 Q60 44 60 52 Q60 60 50 60 Q40 60 40 52 Z" fill="#a3e635" stroke="#78350f" stroke-width="3.5"/>')
  ];
  var ART = [
    /* palette */
    icon('<path d="M50 10 C20 10 6 34 10 58 C14 82 36 92 52 88 C62 85 56 72 66 70 C84 68 94 56 92 40 C88 20 70 10 50 10 Z" fill="#fde68a" stroke="#78350f" stroke-width="4"/>' +
         '<circle cx="30" cy="36" r="8" fill="#ef4444"/><circle cx="52" cy="26" r="8" fill="#3b82f6"/><circle cx="74" cy="38" r="8" fill="#22c55e"/><circle cx="26" cy="62" r="8" fill="#a855f7"/>' +
         '<ellipse cx="62" cy="62" rx="9" ry="7" fill="#fff" stroke="#78350f" stroke-width="3"/>'),
    /* paintbrush */
    icon('<line x1="88" y1="12" x2="40" y2="60" stroke="#92400e" stroke-width="9" stroke-linecap="round"/>' +
         '<path d="M44 52 L50 58 C40 78 24 90 10 90 C14 76 26 60 44 52 Z" fill="#ec4899" stroke="#831843" stroke-width="3.5" stroke-linejoin="round"/>' +
         '<rect x="36" y="44" width="14" height="10" transform="rotate(45 43 49)" fill="#d4d4d8" stroke="#52525b" stroke-width="3"/>'),
    /* paint tube */
    icon('<path d="M24 28 H66 L74 72 H16 Z" fill="#3b82f6" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="round"/>' +
         '<rect x="28" y="12" width="34" height="16" rx="3" fill="#e5e7eb" stroke="#52525b" stroke-width="4"/>' +
         '<path d="M16 72 H74 L76 86 H14 Z" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="4" stroke-linejoin="round"/>'),
    /* splat */
    icon('<path d="M50 8 L58 30 L82 18 L72 42 L94 50 L72 58 L84 82 L58 70 L50 92 L42 70 L16 82 L28 58 L6 50 L28 42 L18 18 L42 30 Z" fill="#facc15" stroke="#a16207" stroke-width="3.5" stroke-linejoin="round"/>' +
         '<circle cx="50" cy="50" r="12" fill="#ef4444"/>')
  ];
  SETS.eng.images = LIT;
  SETS.geog.images = GEO;
  SETS.art.images = ART;
  SETS.bio.images = CELLS;
  SETS.econ.images = ECON;
  SETS.chem.images = MOLECULES; /* defined after SETS, so attach here */
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };

  function layer(id, cls) {
    var el = document.createElement("div");
    el.id = id;
    el.className = "burst-canvas " + cls;
    el.setAttribute("aria-hidden", "true");
    document.body.appendChild(el);
    return el;
  }

  function baseOptions() {
    return {
      fullScreen: { enable: false },
      detectRetina: true,
      fpsLimit: 60,
      background: { color: "transparent" },
      particles: { number: { value: 0 } },
      interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } }
    };
  }

  /* image shapes must be preloaded or the particles are silently skipped */
  function preloadImages(o) {
    o.preload = [];
    Object.keys(SETS).forEach(function (k) {
      (SETS[k].images || []).forEach(function (src) { o.preload.push({ src: src, width: 100, height: 100, replaceColor: false }); });
    });
    return o;
  }

  /* a point on the chip's outline plus the outward angle there, so the chip itself
     seems to blow apart and its label is never covered */
  function edgePoint(r) {
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var a = rand(0, Math.PI * 2);
    var rx = r.width / 2, ry = r.height / 2;
    return { x: cx + Math.cos(a) * rx * 1.05, y: cy + Math.sin(a) * ry * 1.15, deg: (a * 180) / Math.PI };
  }

  var ready = null;
  function init() {
    if (ready) return ready;
    var tsp = window.tsParticles;
    var fontReady = document.fonts && document.fonts.load
      ? document.fonts.load('40px "Pinyon Script"', "Aa").catch(function () {}) : Promise.resolve();
    ready = fontReady.then(function () { return window.loadSlim(tsp); }).then(function () {
      return window.loadTextShape(tsp);
    }).then(function () {
      return Promise.all([
        tsp.load({ id: "pc-paint", element: layer("pc-paint", "burst-canvas--paint"), options: baseOptions() }),
        tsp.load({ id: "pc-ink", element: layer("pc-ink", "burst-canvas--ink"), options: preloadImages(baseOptions()) })
      ]);
    }).then(function (c) { return { paint: c[0], ink: c[1] }; });
    return ready;
  }

  function spawn(containers, set, rect) {
    var i, p;
    /* addParticle positions are in canvas pixels, which are scaled by devicePixelRatio
       on retina screens; without this the burst lands up and to the left of the chip */
    var at = function (c, p) {
      var k = c.retina.pixelRatio || 1;
      return { x: p.x * k, y: p.y * k };
    };

    /* paint: fat drops that fly out, shrink and fall; the goo filter fuses them */
    for (i = 0; i < 70; i++) {
      p = edgePoint(rect);
      containers.paint.particles.addParticle(at(containers.paint, p), {
        shape: { type: "circle" },
        color: { value: pick(set.paint) },
        opacity: { value: 1 },
        life: { duration: { sync: false, value: { min: 0.95, max: 1.4 } }, count: 1 },
        size: {
          value: { min: 4, max: 13 },
          animation: { enable: true, speed: rand(14, 24), startValue: "max", destroy: "min", sync: false, minimumValue: 0 }
        },
        move: {
          enable: true, direction: p.deg + rand(-18, 18), straight: true, random: false,
          speed: { min: 10, max: 28 }, decay: 0.045,
          gravity: { enable: true, acceleration: 9, maxSpeed: 60 },
          outModes: { default: "destroy" }
        }
      });
    }

    /* ink: the subject's symbols */
    for (i = 0; i < 36; i++) {
      p = edgePoint(rect);
      var arrow = set.arrows && Math.random() < 0.22;
      var label = pick(arrow ? set.arrows : set.glyphs);
      var img = !arrow && set.images && Math.random() < (set.imageChance || 0.4);
      var spin = arrow
        ? { value: p.deg, animation: { enable: false } }
        : { value: { min: 0, max: 360 }, animation: { enable: true, speed: rand(-25, 25), sync: false } };
      containers.ink.particles.addParticle(at(containers.ink, p), {
        shape: img
          ? { type: "image", options: { image: { src: pick(set.images), width: 100, height: 100, replaceColor: false } } }
          : { type: "text", options: { text: { value: label, font: set.font || "Newsreader, Georgia, serif", weight: set.weight || "600", fill: true } } },
        color: { value: pick(set.ink) },
        life: { duration: { sync: false, value: { min: 1.1, max: 1.55 } }, count: 1 },
        size: { value: arrow ? { min: 34, max: 56 } : img ? (set.imageSize || { min: 24, max: 40 }) : label.length > 8 ? (set.longSize || { min: 14, max: 24 }) : (set.textSize || { min: 22, max: 46 }) },
        opacity: {
          value: { min: 0.9, max: 1 },
          animation: { enable: true, speed: rand(0.4, 0.65), startValue: "max", destroy: "min", sync: false, minimumValue: 0 }
        },
        rotate: spin,
        move: {
          enable: true, direction: p.deg + rand(-22, 22), straight: true, random: false,
          speed: { min: 9, max: 24 }, decay: 0.035,
          gravity: { enable: true, acceleration: 2.5, maxSpeed: 40 },
          outModes: { default: "destroy" }
        }
      });
    }
  }

  document.querySelectorAll(".chips li[data-burst]").forEach(function (chip) {
    var set = SETS[chip.dataset.burst], busy = false;
    if (!set) return;
    init(); /* warm up on page load so the first hover is instant */
    chip.addEventListener("pointerenter", function () {
      if (busy) return;
      busy = true;
      init().then(function (containers) {
        /* chip colours first (CSS), then the grenade goes off */
        setTimeout(function () { spawn(containers, set, chip.getBoundingClientRect()); }, 110);
      });
      setTimeout(function () { busy = false; }, 1700);
    });
  });
})();
