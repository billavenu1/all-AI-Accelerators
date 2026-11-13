// All AI Accelerators 101 — shared behaviour (nav, theme, filters, tabs)

(function () {
  // Highlight the current page in the nav.
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((a) => {
    if (a.getAttribute("href").split("/").pop() === here) a.classList.add("active");
  });

  // Light / dark toggle (remembered per viewer).
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.dataset.theme = saved;
  } catch (e) {}
  const toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const dark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = dark ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    });
  }

  // Provider card filters (index.html).
  // Buttons carry data-filter="key:value"; cards carry data-camp / data-focus / data-access.
  const filterBar = document.querySelector(".filters");
  if (filterBar) {
    const cards = document.querySelectorAll(".provider-card");
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      filterBar.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      const [key, value] = (btn.dataset.filter || "all").split(":");
      cards.forEach((card) => {
        card.hidden = key !== "all" && !(card.dataset[key] || "").split(" ").includes(value);
      });
    });
  }

  // Variant picker (e.g. TPU 8t / 8i / 8tx / 8i Max).
  // Cards: button[data-pick="8i"]; drop-down: select[data-variant-select]; content: [data-variant="8i"].
  const pickButtons = document.querySelectorAll("[data-pick]");
  if (pickButtons.length) {
    const variants = [...pickButtons].map((b) => b.dataset.pick);
    const setVariant = (v, { updateHash = true } = {}) => {
      if (!variants.includes(v)) v = variants[0];
      document.querySelectorAll("[data-variant]").forEach((el) => { el.hidden = el.dataset.variant !== v; });
      pickButtons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pick === v)));
      document.querySelectorAll("select[data-variant-select]").forEach((s) => { s.value = v; });
      if (updateHash) history.replaceState(null, "", `#${v}`);
    };
    pickButtons.forEach((b) => b.addEventListener("click", () => setVariant(b.dataset.pick)));
    document.querySelectorAll("select[data-variant-select]").forEach((s) =>
      s.addEventListener("change", () => setVariant(s.value)));
    setVariant(location.hash.slice(1), { updateHash: false });
  }

  // Tabs (provider pages): .tabs > button[aria-controls] ↔ .tab-panel#id
  document.querySelectorAll(".tabs").forEach((tabs) => {
    const buttons = tabs.querySelectorAll("button");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.setAttribute("aria-selected", "false");
          document.getElementById(b.getAttribute("aria-controls")).hidden = true;
        });
        btn.setAttribute("aria-selected", "true");
        document.getElementById(btn.getAttribute("aria-controls")).hidden = false;
      });
    });
  });
})();
