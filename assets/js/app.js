(function () {
  "use strict";
  var C = window.CONFIG, P = window.PRODUCTS, CATS = window.CATEGORIES;
  var bySlug = {};
  P.forEach(function (p) { bySlug[p.slug] = p; });

  /* ---------- helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function fmt(n) { return "₹" + Number(n).toLocaleString("en-IN"); }
  function off(p) { return Math.round((1 - p.price / p.mrp) * 100); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function waUrl(text) {
    var n = (C.whatsapp || "").replace(/\D/g, "");
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(text);
  }
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || "null");
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  var ICON = {
    wa: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.2-1.4A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z"/></svg>',
    plus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    minus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'
  };

  /* ---------- config text + WhatsApp links ---------- */
  $$("[data-cfg]").forEach(function (el) { el.textContent = C[el.getAttribute("data-cfg")]; });
  $$("[data-cfg-href]").forEach(function (el) { el.href = C[el.getAttribute("data-cfg-href")]; });
  $$("[data-wa]").forEach(function (el) {
    el.href = waUrl(el.getAttribute("data-wa") || "Hi JMPYR! I found you online and have a question.");
    el.target = "_blank"; el.rel = "noopener";
  });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- concept ribbon ---------- */
  var ribbon = $(".concept");
  if (ribbon) {
    var rb = $(".concept button", ribbon);
    if (store("jmpyr-ribbon") === "hidden") ribbon.hidden = true;
    if (rb) rb.addEventListener("click", function () { ribbon.hidden = true; store("jmpyr-ribbon", "hidden"); });
  }

  /* ---------- mobile menu ---------- */
  var menuBtn = $(".menu-btn"), nav = $(".site-nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* ---------- bag ---------- */
  var bag = store("jmpyr-bag") || {};
  function bagCount() { return Object.keys(bag).reduce(function (s, k) { return s + bag[k]; }, 0); }
  function bagTotal() { return Object.keys(bag).reduce(function (s, k) { return s + (bySlug[k] ? bySlug[k].price * bag[k] : 0); }, 0); }
  function saveBag() { store("jmpyr-bag", bag); paintBag(); }
  function addToBag(slug) { bag[slug] = (bag[slug] || 0) + 1; saveBag(); toast(bySlug[slug].name + " added to your bag"); }
  function setQty(slug, q) { if (q <= 0) delete bag[slug]; else bag[slug] = q; saveBag(); }

  var drawer = $("#bag");
  function paintBag() {
    var n = bagCount();
    $$(".js-bag-count").forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
    if (!drawer) return;
    var list = $(".bag-list", drawer), empty = $(".bag-empty", drawer), foot = $(".bag-foot", drawer);
    var keys = Object.keys(bag).filter(function (k) { return bySlug[k]; });
    empty.hidden = keys.length > 0; foot.hidden = keys.length === 0;
    list.innerHTML = keys.map(function (k) {
      var p = bySlug[k];
      return '<li class="bag-item"><img src="' + p.img + '" alt="" width="72" height="72">' +
        '<div><p class="bag-name">' + esc(p.name) + '</p><p class="bag-price">' + fmt(p.price) + '</p>' +
        '<div class="qty" role="group" aria-label="Quantity for ' + esc(p.name) + '">' +
        '<button type="button" data-q="-1" data-s="' + k + '" aria-label="Remove one">' + ICON.minus + '</button>' +
        '<span>' + bag[k] + '</span>' +
        '<button type="button" data-q="1" data-s="' + k + '" aria-label="Add one">' + ICON.plus + '</button></div></div>' +
        '<p class="bag-line">' + fmt(p.price * bag[k]) + '</p></li>';
    }).join("");
    $(".js-bag-total", drawer).textContent = fmt(bagTotal());
  }
  function bagMessage() {
    var keys = Object.keys(bag).filter(function (k) { return bySlug[k]; });
    var lines = keys.map(function (k, i) { var p = bySlug[k]; return (i + 1) + ". " + p.name + " x" + bag[k] + " = " + fmt(p.price * bag[k]); });
    var name = ($("#bag-name") || {}).value || "";
    var where = ($("#bag-where") || {}).value || "";
    var how = ($("input[name=bag-how]:checked") || {}).value || "";
    return "Hi JMPYR! I'd like to order:\n" + lines.join("\n") + "\n\nTotal: " + fmt(bagTotal()) +
      (how ? "\nDelivery: " + how : "") + (name ? "\nName: " + name : "") + (where ? "\nCity / pincode: " + where : "") +
      "\n\nPlease confirm availability and payment details.";
  }
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      var b = e.target.closest("[data-q]");
      if (b) setQty(b.getAttribute("data-s"), (bag[b.getAttribute("data-s")] || 0) + Number(b.getAttribute("data-q")));
      if (e.target === drawer || e.target.closest(".js-close")) drawer.close();
    });
    $(".js-send-bag", drawer).addEventListener("click", function () {
      window.open(waUrl(bagMessage()), "_blank", "noopener");
    });
  }
  $$(".js-open-bag").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); if (drawer) drawer.showModal(); }); });

  /* ---------- toast ---------- */
  var toastEl = $(".toast"), toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    $(".toast-msg", toastEl).textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 3200);
  }

  /* ---------- product cards ---------- */
  function card(p) {
    var msg = "Hi JMPYR! I'd like to order the " + p.name + " (" + fmt(p.price) + "). Is it available?";
    return '<article class="card">' +
      '<button type="button" class="card-media js-quick" data-slug="' + p.slug + '" aria-label="View ' + esc(p.name) + '">' +
      '<img src="' + p.img + '" alt="' + esc(p.name) + '" width="563" height="563" loading="lazy">' +
      '<span class="badge">' + off(p) + '% off</span></button>' +
      '<h3 class="card-name">' + esc(p.name) + '</h3>' +
      '<p class="price"><span class="now">' + fmt(p.price) + '</span> <s aria-label="was ' + fmt(p.mrp) + '">' + fmt(p.mrp) + '</s></p>' +
      '<div class="card-actions">' +
      '<button type="button" class="btn btn-small btn-line js-add" data-slug="' + p.slug + '">Add to bag</button>' +
      '<a class="btn btn-small btn-ink btn-square" href="' + waUrl(msg) + '" target="_blank" rel="noopener" aria-label="Order ' + esc(p.name) + ' on WhatsApp">' + ICON.wa + '</a>' +
      '</div></article>';
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest(".js-add");
    if (a) { addToBag(a.getAttribute("data-slug")); return; }
    var q = e.target.closest(".js-quick");
    if (q) openQuick(q.getAttribute("data-slug"));
  });

  /* ---------- quick view ---------- */
  var quick = $("#quick");
  function openQuick(slug) {
    var p = bySlug[slug]; if (!quick || !p) return;
    $(".q-img", quick).src = p.img; $(".q-img", quick).alt = p.name;
    $(".q-cat", quick).textContent = CATS[p.cat];
    $(".q-name", quick).textContent = p.name;
    $(".q-now", quick).textContent = fmt(p.price);
    $(".q-was", quick).textContent = fmt(p.mrp);
    $(".q-off", quick).textContent = "You save " + fmt(p.mrp - p.price) + " (" + off(p) + "% off)";
    $(".q-add", quick).setAttribute("data-slug", p.slug);
    $(".q-order", quick).href = waUrl("Hi JMPYR! I'd like to order the " + p.name + " (" + fmt(p.price) + "). Is it available?");
    $(".q-video", quick).href = waUrl("Hi JMPYR! Could you send me a short video of the " + p.name + "?");
    quick.showModal();
  }
  if (quick) quick.addEventListener("click", function (e) {
    if (e.target === quick || e.target.closest(".js-close")) quick.close();
    if (e.target.closest(".q-add")) quick.close();
  });

  /* ---------- home: picks ---------- */
  var picks = $("#picks");
  if (picks) picks.innerHTML = P.slice(0, 8).map(card).join("");

  /* ---------- home: halo ---------- */
  var halo = $(".halo");
  if (halo) {
    var slides = $$(".halo-photo img", halo), cap = $(".halo-caption"), i = 0;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function show(n) {
      slides.forEach(function (s, k) { s.classList.toggle("on", k === n); });
      var p = bySlug[slides[n].getAttribute("data-slug")];
      if (cap && p) { $(".js-halo-name", cap).textContent = p.name; $(".js-halo-price", cap).textContent = fmt(p.price); cap.setAttribute("data-slug", p.slug); }
    }
    show(0);
    if (!reduce && slides.length > 1) setInterval(function () { i = (i + 1) % slides.length; show(i); }, 4000);
  }

  /* ---------- home: gift finder ---------- */
  var finder = $("#finder");
  if (finder) {
    var occ = "birthday", budget = "0-700";
    var labels = { "0-700": "under ₹700", "700-1200": "₹700 to ₹1,200", "1200-2000": "₹1,200 to ₹2,000", "2000-99999": "above ₹2,000" };
    function paintFinder() {
      var r = budget.split("-").map(Number);
      var hits = P.filter(function (p) { return p.price >= r[0] && p.price < r[1]; });
      $(".finder-results", finder).innerHTML = hits.map(card).join("");
      $(".js-finder-count", finder).textContent = hits.length + (hits.length === 1 ? " gift" : " gifts") + " " + labels[budget];
      $(".js-finder-ask", finder).href = waUrl("Hi JMPYR! I'm looking for a " + occ + " gift " + labels[budget] + ". Can you suggest something?");
    }
    finder.addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return;
      var g = c.parentElement;
      $$(".chip", g).forEach(function (x) { x.setAttribute("aria-pressed", x === c ? "true" : "false"); });
      if (g.getAttribute("data-group") === "occasion") occ = c.getAttribute("data-v"); else budget = c.getAttribute("data-v");
      paintFinder();
    });
    paintFinder();
  }

  /* ---------- jewellery page: catalogue ---------- */
  var cat = $("#catalog");
  if (cat) {
    var state = { cat: "all", sort: "featured" };
    var fromHash = (location.hash || "").replace("#", "");
    if (CATS[fromHash]) state.cat = fromHash;
    var chips = $(".cat-chips");
    chips.innerHTML = '<button type="button" class="chip" data-v="all">All</button>' +
      Object.keys(CATS).map(function (k) { return '<button type="button" class="chip" data-v="' + k + '">' + CATS[k] + "</button>"; }).join("");
    function paintCat() {
      $$(".chip", chips).forEach(function (x) { x.setAttribute("aria-pressed", x.getAttribute("data-v") === state.cat ? "true" : "false"); });
      var list = P.filter(function (p) { return state.cat === "all" || p.cat === state.cat; });
      if (state.sort === "low") list = list.slice().sort(function (a, b) { return a.price - b.price; });
      if (state.sort === "high") list = list.slice().sort(function (a, b) { return b.price - a.price; });
      if (state.sort === "off") list = list.slice().sort(function (a, b) { return off(b) - off(a); });
      cat.innerHTML = list.map(card).join("");
      $(".js-cat-count").textContent = list.length + (list.length === 1 ? " design" : " designs");
    }
    chips.addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return;
      state.cat = c.getAttribute("data-v");
      history.replaceState(null, "", state.cat === "all" ? location.pathname : "#" + state.cat);
      paintCat();
    });
    $("#sort").addEventListener("change", function (e) { state.sort = e.target.value; paintCat(); });
    paintCat();
  }

  /* ---------- gifts page: hamper builder ---------- */
  var hamper = $("#hamper");
  if (hamper) {
    var H = { box: null, max: 0, items: {}, extras: {} };
    var pickList = $(".h-pick", hamper), extraList = $(".h-extras", hamper);
    pickList.innerHTML = P.filter(function (p) { return p.price <= 1700; }).map(function (p) {
      return '<label class="h-opt"><input type="checkbox" value="' + p.slug + '"><img src="' + p.img + '" alt="" width="64" height="64" loading="lazy"><span><span class="h-opt-name">' + esc(p.name) + '</span><span class="h-opt-price">' + fmt(p.price) + "</span></span></label>";
    }).join("");
    extraList.innerHTML = window.EXTRAS.map(function (x) {
      return '<label class="h-opt h-opt-text"><input type="checkbox" value="' + esc(x) + '"><span><span class="h-opt-name">' + esc(x) + '</span><span class="h-opt-price">Price on WhatsApp</span></span></label>';
    }).join("");
    function chosen() { return Object.keys(H.items).length + Object.keys(H.extras).length; }
    function paintHamper() {
      var n = chosen(), sum = Object.keys(H.items).reduce(function (s, k) { return s + bySlug[k].price; }, 0);
      $(".js-h-box", hamper).textContent = H.box ? H.box + " box (up to " + H.max + " items)" : "Choose a box";
      $(".js-h-count", hamper).textContent = H.box ? n + " of " + H.max + " items" : n + " items";
      $(".js-h-sum", hamper).textContent = fmt(sum);
      $(".js-h-list", hamper).innerHTML = Object.keys(H.items).map(function (k) { return "<li>" + esc(bySlug[k].name) + " <span>" + fmt(bySlug[k].price) + "</span></li>"; }).join("") +
        Object.keys(H.extras).map(function (k) { return "<li>" + esc(k) + " <span>on WhatsApp</span></li>"; }).join("");
      var full = H.box && n >= H.max;
      $$('.h-pick input, .h-extras input', hamper).forEach(function (inp) { inp.disabled = full && !inp.checked; });
      $(".js-h-warn", hamper).hidden = !full;
      var send = $(".js-h-send", hamper);
      send.disabled = !H.box || n === 0;
      $(".js-h-hint", hamper).textContent = !H.box ? "Choose a box to start." : (n === 0 ? "Add at least one item." : "Ready to send. We'll reply with the final price.");
    }
    hamper.addEventListener("change", function (e) {
      var t = e.target;
      if (t.name === "box") { H.box = t.value; H.max = Number(t.getAttribute("data-max")); }
      if (t.closest(".h-pick")) { if (t.checked) H.items[t.value] = 1; else delete H.items[t.value]; }
      if (t.closest(".h-extras")) { if (t.checked) H.extras[t.value] = 1; else delete H.extras[t.value]; }
      paintHamper();
    });
    $(".js-h-send", hamper).addEventListener("click", function () {
      var lines = Object.keys(H.items).map(function (k) { return "- " + bySlug[k].name + " (" + fmt(bySlug[k].price) + ")"; })
        .concat(Object.keys(H.extras).map(function (k) { return "- " + k; }));
      var f = function (id) { var el = $("#" + id); return el && el.value.trim(); };
      var msg = "Hi JMPYR! I'd like a custom hamper.\n\nBox: " + H.box + "\nItems:\n" + lines.join("\n") +
        (f("h-occasion") ? "\nOccasion: " + f("h-occasion") : "") +
        (f("h-date") ? "\nNeeded by: " + new Date(f("h-date") + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "") +
        (f("h-note") ? "\nCard message: " + f("h-note") : "") +
        (f("h-name") ? "\nMy name: " + f("h-name") : "") +
        "\n\nPlease share the final price.";
      window.open(waUrl(msg), "_blank", "noopener");
    });
    paintHamper();
  }

  paintBag();
})();
