// Rack explorer: pick a component in the rack to open its "why it's special" panel;
// the ⓘ button on each component opens a plain-language concept card.
//
// Markup contract (no JSON — all content lives in the HTML):
//   <div class="explorer" data-explorer>
//     <div class="explorer-progress"><span class="count"></span><div class="bar"><span></span></div></div>
//     <div class="part" data-part="bf4" data-role="dpu">
//       <button class="part-btn">…</button>
//       <button class="info-btn" popovertarget="concept-dpu">i</button>
//     </div>
//     <article class="part-detail card" data-detail="bf4" data-role="dpu" hidden>…</article>
//     <div class="concept" id="concept-dpu" popover>…</div>
//   Inside a detail: <button data-goto="nvlink"> jumps to another part;
//                    <button data-step="-1|1"> moves to the previous/next part.

(function () {
  // Fallback for browsers without the Popover API.
  const hasPopover = typeof HTMLElement !== "undefined" && HTMLElement.prototype.hasOwnProperty("popover");
  if (!hasPopover) {
    document.addEventListener("click", (e) => {
      const opener = e.target.closest("[popovertarget]");
      if (!opener) return;
      const target = document.getElementById(opener.getAttribute("popovertarget"));
      if (!target) return;
      const hide = opener.getAttribute("popovertargetaction") === "hide";
      document.querySelectorAll(".concept.open").forEach((c) => c.classList.remove("open"));
      if (!hide) target.classList.add("open");
    });
  }

  document.querySelectorAll("[data-explorer]").forEach((explorer) => {
    const parts = [...explorer.querySelectorAll(".part[data-part]")];
    // A part id may appear on several blocks (e.g. 8 HBM stacks); they act as one.
    const order = [...new Set(parts.map((p) => p.dataset.part))];
    const details = explorer.querySelectorAll(".part-detail[data-detail]");
    const empty = explorer.querySelector(".empty-detail");
    const progress = explorer.querySelector(".explorer-progress");
    const seen = new Set();
    const noun = explorer.dataset.noun || "components";
    let current = null;

    function updateProgress() {
      if (!progress) return;
      const count = progress.querySelector(".count");
      const bar = progress.querySelector(".bar span");
      const total = order.length;
      if (bar) bar.style.width = `${(seen.size / total) * 100}%`;
      if (seen.size === total) {
        progress.classList.add("done");
        if (count) count.textContent = `🎉 You've explored all ${total} ${noun}`;
      } else if (count) {
        count.textContent = `Explored ${seen.size} of ${total} ${noun}`;
      }
    }

    function select(id, { scroll = false } = {}) {
      if (!order.includes(id)) return;
      current = id;
      parts.forEach((p) => p.classList.toggle("active", p.dataset.part === id));
      details.forEach((d) => { d.hidden = d.dataset.detail !== id; });
      if (empty) empty.hidden = true;
      seen.add(id);
      parts.filter((p) => p.dataset.part === id).forEach((p) => p.classList.add("seen"));
      updateProgress();
      if (scroll && matchMedia("(max-width: 860px)").matches) {
        explorer.querySelector(`.part-detail[data-detail="${id}"]`).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    explorer.addEventListener("click", (e) => {
      const btn = e.target.closest(".part-btn");
      if (btn) { select(btn.closest(".part").dataset.part, { scroll: true }); return; }

      const go = e.target.closest("[data-goto]");
      if (go) { select(go.dataset.goto); return; }

      const step = e.target.closest("[data-step]");
      if (step) {
        const i = order.indexOf(current);
        const next = order[(i + Number(step.dataset.step) + order.length) % order.length];
        select(next);
      }
    });

    updateProgress();
  });
})();
