/* Apply the saved theme before first paint so the page never flashes the wrong one. */
(function () {
  var root = document.documentElement;
  root.classList.add("js");

  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.setAttribute("data-theme", saved);
  } catch (e) {}

  function initThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function isDark() {
      return root.getAttribute("data-theme") !== "light";
    }
    function sync() {
      var label = isDark() ? "Switch to light mode" : "Switch to dark mode";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    }

    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      sync();
    });

    sync();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeToggle);
  } else {
    initThemeToggle();
  }
})();

/* ---------- Remembered scroll position ----------
   The homepage is a long shelf of links, so it remembers where you were.
   Follow a link into the library, then come back — with the browser's back
   button or a page's "back to the library" link — and the homepage returns
   you to the section you left, ready to keep browsing.

   The spot lives in sessionStorage: scoped to this tab and this visit, so a
   new tab or a fresh session always opens at the top. The browser's own
   scroll restoration is switched off for the homepage and replaced with an
   instant jump, which never animates up from the top under html { scroll-
   behavior: smooth } and never fights the load-time anchor scroll on hash
   URLs. An explicit #section in the URL still wins: that is a direct
   request for that section. */
(function () {
  if (!/\/(index\.html)?$/.test(location.pathname)) return; // homepage only

  var KEY = "scroll:" + location.pathname.replace(/index\.html$/, "");
  var userMoved = false;

  function readSaved() {
    try {
      var y = parseInt(sessionStorage.getItem(KEY), 10);
      return isNaN(y) ? null : y;
    } catch (err) { return null; }
  }

  function save() {
    try { sessionStorage.setItem(KEY, String(Math.round(window.scrollY))); } catch (err) {}
  }

  // Remember the position while scrolling (light 200ms throttle) ...
  var last = 0;
  window.addEventListener("scroll", function () {
    var now = Date.now();
    if (now - last < 200) return;
    last = now;
    save();
  }, { passive: true });
  // ... and for certain at the moment the page is left.
  window.addEventListener("pagehide", save);

  // Real scroll intent before the load pass cancels that pass — never yank
  // the page away from someone who has already started reading.
  ["wheel", "touchstart", "keydown", "mousedown"].forEach(function (type) {
    window.addEventListener(type, function () { userMoved = true; }, { passive: true });
  });

  // Jump straight to the remembered spot — instantly, never a glide.
  function restore() {
    if (location.hash) return; // an explicit #section in the URL wins
    var y = readSaved();
    if (y === null) return;
    var html = document.documentElement;
    var previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto"; // scroll-behavior: smooth would animate the jump
    window.scrollTo(0, y);
    html.style.scrollBehavior = previous;
  }

  // Take over from the browser's own restoration, which would animate under
  // the site's smooth scrolling and land after ours anyway.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", restore);
  } else {
    restore();
  }
  // One more pass at full load, in case a late re-anchor or layout shift
  // moved the page after the first jump.
  window.addEventListener("load", function () { if (!userMoved) restore(); });
})();

/* ---------- Back to top ----------
   The floating corner button (markup lives in index.html, styles in
   css/styles.css). It stays hidden until the "Browse by week" shelf has
   fully scrolled away, and fades back out on the way up. The scroll check
   is rAF-throttled, and clicking scrolls to the very top without touching
   the URL: no behaviour is passed, so the browser uses the CSS scroll-
   behavior — a smooth glide normally, an instant jump for reduced motion. */
(function () {
  function init() {
    var btn = document.getElementById("to-top");
    var browse = document.querySelector(".browse");
    if (!btn || !browse) return;

    var ticking = false;
    function update() {
      ticking = false;
      var past = browse.getBoundingClientRect().bottom < 0;
      btn.classList.toggle("is-visible", past);
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0 });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    update(); // right state at once, e.g. on a page restored to a scrolled spot
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
