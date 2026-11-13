/* Hover glossary: the first use of each jargon term in a section gets a dotted underline and a one-line meaning
   on hover, keyboard focus or tap. One floating tip, positioned in the viewport, so cards never clip it. */
(() => {
  const G = {
    "HBM4": "The newest generation of HBM: stacked memory right beside the chip, faster and larger than HBM3E.",
    "HBM3E": "The previous generation of HBM, high-bandwidth stacked memory beside the chip.",
    "HBM": "High Bandwidth Memory: DRAM chips stacked on top of each other and placed right next to the processor, so data moves very fast.",
    "SRAM": "Very fast, very small memory built into the chip itself. Holds data the chip needs right now.",
    "DRAM": "Ordinary main memory: large and cheap, but slower than memory on the chip.",
    "LPDDR": "Low-power DRAM, the kind in phones and laptops: cheaper per gigabyte than HBM, but slower.",
    "KV cache": "The memory a language model keeps of the conversation so far, so it doesn't recompute it for every new word.",
    "GPU": "Graphics Processing Unit: a chip with thousands of small cores that do many calculations at once. The workhorse of AI.",
    "CPU": "Central Processing Unit: the general-purpose processor that runs the operating system and feeds work to the accelerators.",
    "host CPU": "The ordinary processor that sits beside the accelerators, running the software and sending them work.",
    "TPU": "Tensor Processing Unit: Google's own AI chip, built for the matrix maths in neural networks.",
    "LPU": "Language Processing Unit: Groq's chip, designed to generate text quickly by keeping the model in on-chip SRAM.",
    "NPU": "Neural Processing Unit: a general name for a chip built specifically for AI work.",
    "DPU": "Data Processing Unit: a chip that handles networking, storage and security so the CPU and GPUs don't have to.",
    "ASIC": "Application-Specific Integrated Circuit: a chip designed for one job (here, AI) rather than general use.",
    "SoC": "System on a Chip: several components (CPU, accelerator, memory controllers) on one piece of silicon.",
    "chiplet": "A smaller piece of silicon; several chiplets are joined in one package to act as one big chip.",
    "die": "One piece of silicon cut from a wafer: the actual chip inside the package.",
    "wafer": "The thin silicon disc, about 30 cm across, on which chips are made before being cut apart.",
    "reticle": "The largest area a chip factory can print in one shot (about 26 x 33 mm), which caps the size of one die.",
    "TSMC": "Taiwan Semiconductor Manufacturing Company: the factory that makes most of the world's advanced AI chips.",
    "rack": "A tall metal cabinet holding servers, switches, power and cooling. Here it works as one giant computer.",
    "tray": "A flat drawer that slides into a rack and holds chips, memory and boards.",
    "pod": "A group of racks wired together to work on one job.",
    "superpod": "A very large pod: many racks of accelerators wired as one system.",
    "NVL72": "Nvidia's rack design with 72 GPUs linked by NVLink so they act like one huge GPU.",
    "switch": "A device that passes data between many chips or servers, like a traffic junction for the network.",
    "NIC": "Network Interface Card: the part that connects a server to the network.",
    "SuperNIC": "Nvidia's name for a very fast network card built for AI clusters.",
    "NVLink": "Nvidia's own very fast link between GPUs, much faster than ordinary networking.",
    "UALink": "Ultra Accelerator Link: an open standard for linking accelerators inside a rack, a rival to NVLink.",
    "Infinity Fabric": "AMD's own link between its chips and chiplets.",
    "PCIe": "PCI Express: the standard connection between a computer's processor and its add-in cards.",
    "CXL": "Compute Express Link: a standard built on PCIe that lets chips share memory.",
    "Ethernet": "The most common networking standard, the same family as the cable to your router, here in very fast versions.",
    "InfiniBand": "A high-speed, low-delay networking standard used in supercomputers and AI clusters.",
    "RDMA": "Remote Direct Memory Access: one machine reads another's memory directly over the network, skipping the CPU.",
    "scale-up": "Linking chips inside one rack so tightly they act as one machine.",
    "scale-out": "Linking many racks together over a network to make a bigger cluster.",
    "torus": "A network shape where chips connect in a grid whose edges wrap around, like a doughnut.",
    "Boardfly": "Google's network layout for TPU 8i: boards in groups, groups linked so any chip is only a few hops from any other.",
    "dragonfly": "A network shape of tightly linked groups with direct links between groups, keeping paths short.",
    "optical": "Using light in fibre instead of electricity in copper to carry data: longer reach, less power.",
    "co-packaged": "Optics built into the same package as the switch chip, instead of in separate plug-in modules.",
    "OCS": "Optical Circuit Switch: redirects beams of light with tiny mirrors to rewire the network without touching cables.",
    "bandwidth": "How much data can move per second. Higher is better.",
    "TB/s": "Terabytes per second: a trillion bytes of data moved every second.",
    "latency": "The delay before data arrives or an answer starts. Lower is better.",
    "throughput": "How much total work gets done per second.",
    "FP4": "4-bit floating-point numbers: very low precision, so the chip can do many more calculations per second.",
    "FP8": "8-bit floating-point numbers: lower precision than usual, faster and cheaper for AI.",
    "NVFP4": "Nvidia's own 4-bit number format for AI.",
    "PF": "Petaflops: a thousand trillion calculations per second.",
    "EF": "Exaflops: a million trillion calculations per second (1,000 petaflops).",
    "FLOPS": "Floating-point operations per second: how many calculations a chip does each second.",
    "sparsity": "Skipping calculations on zeros, which can roughly double speed when a model allows it.",
    "matrix": "A grid of numbers. Neural networks are mostly matrix multiplications.",
    "systolic": "A grid of simple calculators that pass numbers to their neighbours in rhythm: very efficient for matrix maths.",
    "inference": "Using a trained model to answer questions or generate text.",
    "training": "Teaching a model by showing it data and adjusting its numbers, which takes huge compute.",
    "token": "A chunk of text, roughly three quarters of a word, that a language model reads or writes.",
    "MoE": "Mixture of Experts: a model made of many sub-models, only a few of which work on each word.",
    "liquid cooling": "Cooling chips with water or fluid through cold plates instead of fans, needed at these power levels.",
    "memory wall": "The problem that chips can calculate faster than memory can feed them data.",
    "confidential computing": "Keeping data encrypted even while it's being processed, so the cloud operator can't read it.",
    "EPYC": "AMD's line of server CPUs.",
    "Arm": "A family of power-efficient processor designs, used in phones and in many new server CPUs.",
    "x86": "The processor design used by Intel and AMD in most PCs and servers.",
    "CUDA": "Nvidia's software platform for programming its GPUs. Most AI software is built on it.",
    "ROCm": "AMD's software platform for programming its GPUs, its answer to CUDA.",
    "PyTorch": "The most popular open-source framework for building and training AI models.",
    "JAX": "Google's framework for machine-learning research, often used on TPUs.",
    "XLA": "Accelerated Linear Algebra: a compiler that turns model code into fast instructions for TPUs and GPUs.",
    "Triton": "A language for writing fast GPU code without writing CUDA directly.",
    "MLIR": "A compiler toolkit for building compilers for new chips.",
    "Neuron": "AWS's software kit for running models on its Trainium and Inferentia chips.",
    "compiler": "Software that translates a model into instructions a particular chip can run.",
    "kernel": "A small, highly tuned program that does one operation (like a matrix multiply) on the chip.",
    "runtime": "Software that runs alongside the program, scheduling work and managing memory on the chip.",
    "BlueField": "Nvidia's DPU line.",
    "ConnectX": "Nvidia's network card line.",
    "Spectrum-X": "Nvidia's Ethernet networking platform for AI.",
    "Grace": "Nvidia's Arm-based server CPU.",
    "Vera": "Nvidia's newest Arm-based server CPU, which follows Grace.",
    "SerDes": "Serializer/deserializer: the circuit that sends data over a wire at very high speed.",
    "interconnect": "The links that connect chips to each other.",
  };
  const keys = Object.keys(G).sort((a, b) => b.length - a.length);
  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  const re = new RegExp("(^|[^A-Za-z0-9-])(" + keys.map(esc).join("|") + ")(?![A-Za-z0-9])", "");
  const lookup = (w) => G[w] ? w : keys.find((k) => k.toLowerCase() === w.toLowerCase());
  const SKIP = "a, button, select, option, code, kbd, script, style, svg, h1, h2, h3, dt, th, .gl, .tag, .vtag, .camp, .gen, .top, .nav, .side, .skip, .skip-link, [aria-hidden='true'], .rx, .close__word, .mo-cr, title";
  const root = document.querySelector("main") || document.body;

  const css = document.createElement("style");
  css.textContent = `
    .gl { text-decoration: underline dotted; text-decoration-color: color-mix(in srgb, currentColor 55%, transparent); text-underline-offset: 3px; cursor: help; border-radius: 2px; }
    .gl:hover, .gl:focus-visible { text-decoration-color: currentColor; outline: none; background: rgb(160 134 114 / .18); }
    .gl-tip { position: fixed; z-index: 1000; max-width: 300px; padding: 10px 12px; border-radius: 10px; background: #f2f2f2; color: #111; font: 400 13.5px/1.45 "Reddit Sans", system-ui, sans-serif; box-shadow: 0 10px 30px rgb(0 0 0 / .45); pointer-events: none; opacity: 0; transform: translateY(4px); transition: opacity .12s, transform .12s; }
    .gl-tip.on { opacity: 1; transform: none; }
    .gl-tip b { display: block; margin-bottom: 2px; font-weight: 600; }
    @media (prefers-reduced-motion: reduce) { .gl-tip { transition: none; } }`;
  document.head.appendChild(css);

  // the first use of each term per section, tab panel or chip view
  const scopeOf = (n) => n.parentElement.closest("[data-variant], .tab-panel, section, .part-detail, [popover], footer") || root;
  const seen = new Map();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (!n.nodeValue.trim() || n.parentElement.closest(SKIP)) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  for (let node of nodes) {
    const scope = scopeOf(node); if (!seen.has(scope)) seen.set(scope, new Set());
    const done = seen.get(scope);
    let guard = 0;
    while (node && guard++ < 20) {
      const s = node.nodeValue; let m, from = 0, hit = null;
      while ((m = re.exec(s.slice(from)))) {
        const key = lookup(m[2]); const at = from + m.index + m[1].length;
        if (key && !done.has(key)) { hit = { at, len: m[2].length, key }; break; }
        from = at + m[2].length;
      }
      if (!hit) break;
      done.add(hit.key);
      const word = node.splitText(hit.at); const rest = word.splitText(hit.len);
      const span = document.createElement("span");
      span.className = "gl"; span.tabIndex = 0; span.dataset.term = hit.key;
      span.setAttribute("aria-description", G[hit.key]);
      word.replaceWith(span); span.appendChild(word);
      node = rest;
    }
  }

  const tip = document.createElement("div"); tip.className = "gl-tip"; tip.setAttribute("role", "tooltip"); tip.id = "gl-tip";
  document.body.appendChild(tip);
  let cur = null;
  const show = (el) => {
    cur = el; const k = el.dataset.term;
    tip.innerHTML = ""; const b = document.createElement("b"); b.textContent = k; tip.append(b, G[k]);
    const r = el.getBoundingClientRect(); tip.classList.add("on");
    const w = tip.offsetWidth, h = tip.offsetHeight;
    let x = Math.min(Math.max(8, r.left + r.width / 2 - w / 2), innerWidth - w - 8);
    let y = r.top - h - 8; if (y < 80) y = r.bottom + 8;
    tip.style.left = x + "px"; tip.style.top = y + "px"; el.setAttribute("aria-describedby", "gl-tip");
  };
  const hide = () => { tip.classList.remove("on"); if (cur) cur.removeAttribute("aria-describedby"); cur = null; };
  document.addEventListener("pointerover", (e) => { const g = e.target.closest?.(".gl"); if (g) show(g); });
  document.addEventListener("pointerout", (e) => { if (e.target.closest?.(".gl")) hide(); });
  document.addEventListener("focusin", (e) => { if (e.target.classList?.contains("gl")) show(e.target); });
  document.addEventListener("focusout", (e) => { if (e.target.classList?.contains("gl")) hide(); });
  document.addEventListener("click", (e) => { const g = e.target.closest?.(".gl"); if (g) { cur === g && tip.classList.contains("on") ? hide() : show(g); } else hide(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
  addEventListener("scroll", hide, { passive: true });
})();
