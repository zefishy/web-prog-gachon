/* ---------- demo.js (Week 5 live demos) ----------
   The interactive halves of the four Week 5 pages: the counter, the grade
   evaluator's slider + evaluation trace, the two loop visualizers, and the
   colour palette with its localStorage persistence. Each demo wires itself
   up only when its frame is present in the page, so this one file serves
   all four pages. Loaded with defer, after js/main.js. */

(() => {
  "use strict";

  const $ = (sel, root) => (root || document).querySelector(sel);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mock DevTools console: append one "> line" */
  const logLine = (panel, text, isNote) => {
    const line = document.createElement("span");
    line.className = "line" + (isNote ? " is-note" : "");
    line.textContent = text;
    panel.appendChild(line);
    panel.scrollTop = panel.scrollHeight;
  };

  /* Copy buttons: [data-copy="#id-of-code"] */
  const initCopyButtons = () => {
    document.querySelectorAll(".copy-btn[data-copy]").forEach((btn) => {
      const source = $(btn.getAttribute("data-copy"));
      if (!source) return;
      btn.addEventListener("click", () => {
        const text = source.textContent;
        const done = () => {
          btn.classList.add("is-copied");
          btn.textContent = "Copied \u2713";
          setTimeout(() => {
            btn.classList.remove("is-copied");
            btn.textContent = "Copy";
          }, 1200);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
        } else {
          fallbackCopy(text, done);
        }
      });
    });
  };

  const fallbackCopy = (text, done) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* no clipboard available */ }
    ta.remove();
  };

  /* ---------- Counter mini-app ---------- */
  const initCounter = () => {
    const frame = $("#demo-counter");
    if (!frame) return;
    let count = 0;
    const num = $(".count-num", frame);
    frame.querySelectorAll("[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        if (action === "add") count += 1;
        else if (action === "subtract") count -= 1;
        else count = 0;
        num.textContent = count;
      });
    });
  };

  /* ---------- Grade evaluator: slider + trace + console ---------- */
  const initGrade = () => {
    const frame = $("#demo-grade");
    if (!frame) return;
    const slider = $("#grade-slider", frame);
    const scoreOut = $("#grade-score", frame);
    const letter = $(".grade-num", frame);
    const rows = Array.from(frame.querySelectorAll(".trace-row"));
    const panel = $("#grade-console", frame);

    const gradeFor = (score) => {
      if (score >= 90) return "A";
      if (score >= 80) return "B";
      if (score >= 70) return "C";
      return "F";
    };

    const evaluate = () => {
      const score = Number(slider.value);
      const grade = gradeFor(score);
      scoreOut.textContent = "score = " + score;
      letter.textContent = grade;

      /* Walk the else-if chain: rows before the fired one show their
         boolean, the fired row is highlighted, later rows are skipped. */
      const firedIndex = { A: 0, B: 1, C: 2, F: 3 }[grade];
      rows.forEach((row, i) => {
        const verdict = $(".verdict", row);
        if (i < firedIndex) {
          row.classList.remove("is-fired");
          verdict.textContent = "false";
        } else if (i === firedIndex) {
          row.classList.add("is-fired");
          verdict.textContent = row.hasAttribute("data-else") ? "\u2192 '" + grade + "'" : "true \u2192 '" + grade + "'";
        } else {
          row.classList.remove("is-fired");
          verdict.textContent = "skipped";
        }
      });

      panel.textContent = "";
      logLine(panel, "'" + grade + "'");
    };

    slider.addEventListener("input", evaluate);
    evaluate();
  };

  /* ---------- Step loop: for (let i = 1; i <= N; i++) ---------- */
  const initStepLoop = () => {
    const frame = $("#demo-step");
    if (!frame) return;
    const input = $("#step-n", frame);
    const grid = $("#step-grid", frame);
    const panel = $("#step-console", frame);
    const status = $(".demo-status", frame);
    let timer = null;

    const clear = () => {
      if (timer) { clearTimeout(timer); timer = null; }
      grid.textContent = "";
      panel.textContent = "";
      logLine(panel, "Ready", true);
      status.textContent = "";
    };

    const run = () => {
      clear();
      panel.textContent = "";
      const n = Math.min(20, Math.max(1, parseInt(input.value, 10) || 0));
      input.value = n;
      if (reducedMotion) {
        for (let i = 1; i <= n; i += 1) {
          const chip = document.createElement("span");
          chip.className = "step-chip";
          chip.innerHTML = "Step <strong></strong>";
          chip.querySelector("strong").textContent = i;
          grid.appendChild(chip);
          logLine(panel, "Step " + i);
        }
        status.textContent = "Ran the loop " + n + " times.";
        return;
      }
      let i = 1;
      const tick = () => {
        const chip = document.createElement("span");
        chip.className = "step-chip";
        chip.innerHTML = "Step <strong></strong>";
        chip.querySelector("strong").textContent = i;
        grid.appendChild(chip);
        logLine(panel, "Step " + i);
        if (i < n) { i += 1; timer = setTimeout(tick, 90); }
        else { timer = null; status.textContent = "Ran the loop " + n + " times."; }
      };
      tick();
    };

    $("#step-run", frame).addEventListener("click", run);
    $("#step-clear", frame).addEventListener("click", clear);
    clear();
  };

  /* ---------- Fruit loop: for (const fruit of fruits) ---------- */
  const initFruitLoop = () => {
    const frame = $("#demo-fruit");
    if (!frame) return;
    let fruits = ["apple", "banana", "cherry"];
    let index = -1;          /* cursor: the element "fruit" points at */
    let timer = null;

    const arrayView = $("#fruit-array", frame);
    const lengthOut = $("#fruit-length", frame);
    const varLine = $("#fruit-var", frame);
    const panel = $("#fruit-console", frame);
    const status = $(".demo-status", frame);

    const render = () => {
      arrayView.textContent = "";
      fruits.forEach((fruit, i) => {
        const chip = document.createElement("span");
        chip.className = "chip" + (i === index ? " is-current" : "");
        chip.textContent = fruit;
        arrayView.appendChild(chip);
      });
      lengthOut.textContent = "fruits (length: " + fruits.length + ")";
      if (index === -1) {
        varLine.innerHTML = "fruit = <strong>(waiting)</strong>";
      } else {
        varLine.innerHTML = "fruit = <strong></strong>";
        varLine.querySelector("strong").textContent = "'" + fruits[index] + "'";
      }
    };

    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };

    const step = () => {
      if (index + 1 >= fruits.length) { stop(); status.textContent = "Loop finished."; return false; }
      index += 1;
      render();
      logLine(panel, fruits[index]);
      return true;
    };

    $("#fruit-run", frame).addEventListener("click", () => {
      stop();
      index = -1;
      panel.textContent = "";
      render();
      if (reducedMotion) {
        while (step()) { /* step through everything at once */ }
        return;
      }
      timer = setInterval(() => { if (!step()) stop(); }, 700);
    });

    $("#fruit-next", frame).addEventListener("click", () => { stop(); step(); });
    $("#fruit-reset", frame).addEventListener("click", () => {
      stop();
      index = -1;
      render();
      status.textContent = "";
      logLine(panel, "Ready", true);
    });

    const add = () => {
      const input = $("#fruit-add", frame);
      const value = input.value.trim();
      if (!value) return;
      fruits.push(value);
      input.value = "";
      render();
      status.textContent = "Added '" + value + "' \u2014 length is now " + fruits.length + ".";
      logLine(panel, "fruits.push('" + value + "')", true);
    };
    $("#fruit-add-btn", frame).addEventListener("click", add);
    $("#fruit-add", frame).addEventListener("keydown", (e) => { if (e.key === "Enter") add(); });

    render();
    logLine(panel, "Ready", true);
  };

  /* ---------- Colour palette (Exercise 5) ---------- */
  const initPalette = () => {
    const frame = $("#demo-palette");
    if (!frame) return;
    const KEY = "week5-palette";
    const DEFAULTS = ["#12544f", "#2a835f", "#4d9a73", "#8bbb92", "#bfddc4"];
    const grid = $("#palette", frame);
    const status = $("#palette-status", frame);
    const input = $("#palette-add", frame);
    const error = $("#palette-error", frame);

    let colours = load();

    function load() {
      try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return DEFAULTS.slice();
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return DEFAULTS.slice();
        const hexes = parsed.filter((c) => /^#[0-9a-f]{6}$/i.test(String(c))).map((c) => String(c).toLowerCase());
        return hexes.length ? hexes : DEFAULTS.slice();
      } catch (e) {
        return DEFAULTS.slice();
      }
    }

    function save() {
      try { localStorage.setItem(KEY, JSON.stringify(colours)); } catch (e) { /* storage unavailable */ }
    }

    const wrapFor = (hex) => {
      const wrap = document.createElement("div");
      wrap.className = "swatch-wrap";

      const swatch = document.createElement("button");
      swatch.type = "button";
      swatch.className = "swatch";
      swatch.style.background = hex;
      swatch.setAttribute("aria-expanded", "false");
      swatch.setAttribute("aria-label", "Colour " + hex + ", click to expand");
      const hexLabel = document.createElement("span");
      hexLabel.className = "hex";
      hexLabel.textContent = hex;
      swatch.appendChild(hexLabel);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove";
      remove.textContent = "\u00d7";
      remove.setAttribute("aria-label", "Remove " + hex);
      remove.hidden = true;

      const toggle = () => {
        const open = wrap.classList.toggle("is-open");
        swatch.setAttribute("aria-expanded", open ? "true" : "false");
        remove.hidden = !open;
      };
      swatch.addEventListener("click", toggle);
      swatch.addEventListener("dblclick", () => removeColour(hex));
      remove.addEventListener("click", () => removeColour(hex));

      wrap.appendChild(swatch);
      wrap.appendChild(remove);
      return wrap;
    };

    const render = () => {
      grid.textContent = "";
      colours.forEach((hex) => grid.appendChild(wrapFor(hex)));
      if (!colours.length) {
        const empty = document.createElement("p");
        empty.className = "demo-hint";
        empty.textContent = "The palette is empty \u2014 add a colour below.";
        grid.appendChild(empty);
      }
    };

    const removeColour = (hex) => {
      colours = colours.filter((c) => c !== hex);
      save();
      render();
      status.textContent = "Removed " + hex + " and saved the palette to localStorage.";
    };

    const addColour = () => {
      error.textContent = "";
      const raw = input.value.trim();
      if (!/^#[0-9a-f]{6}$/i.test(raw)) {
        error.textContent = "Use a six-digit hex code, e.g. #ff5733.";
        return;
      }
      const hex = raw.toLowerCase();
      if (colours.includes(hex)) {
        error.textContent = hex + " is already in the palette.";
        return;
      }
      colours.push(hex);
      input.value = "";
      save();
      render();
      status.textContent = "Added " + hex + " and saved the palette to localStorage.";
    };
    $("#palette-add-btn", frame).addEventListener("click", addColour);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") addColour(); });

    /* Export PNG: tile the palette onto a canvas and download it */
    $("#palette-export", frame).addEventListener("click", () => {
      if (!colours.length) {
        status.textContent = "Nothing to export \u2014 the palette is empty.";
        return;
      }
      const cell = 140;
      const perRow = Math.min(4, colours.length);
      const rows = Math.ceil(colours.length / perRow);
      const canvas = document.createElement("canvas");
      canvas.width = perRow * cell;
      canvas.height = rows * cell;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#092328";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      colours.forEach((hex, i) => {
        const x = (i % perRow) * cell;
        const y = Math.floor(i / perRow) * cell;
        const pad = 10;
        if (ctx.roundRect) {
          ctx.beginPath();
          ctx.roundRect(x + pad, y + pad, cell - pad * 2, cell - pad * 2, 12);
          ctx.fillStyle = hex;
          ctx.fill();
        } else {
          ctx.fillStyle = hex;
          ctx.fillRect(x + pad, y + pad, cell - pad * 2, cell - pad * 2);
        }
      });
      const link = document.createElement("a");
      link.download = "palette.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      status.textContent = "Exported palette.png (" + colours.length + " colours).";
    });

    render();
    status.textContent = "Palette restored" + (colours.length ? " from localStorage." : ".");
  };

  initCopyButtons();
  initCounter();
  initGrade();
  initStepLoop();
  initFruitLoop();
  initPalette();
})();
