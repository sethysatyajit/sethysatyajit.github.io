/* Global behaviour: scroll effects, animations, typing, canvas */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Progress bar + header + back-to-top */
const progress = document.createElement("div");
progress.className = "progress";
document.body.prepend(progress);

const toTop = document.createElement("button");
toTop.className = "to-top";
toTop.setAttribute("aria-label", "Back to top");
toTop.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 6-6 6 6"/></svg>';
toTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
document.body.appendChild(toTop);

function onScroll() {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100;
  progress.style.width = pct + "%";
  const header = document.getElementById("site-header");
  if (header) header.classList.toggle("scrolled", h.scrollTop > 30);
  toTop.classList.toggle("show", h.scrollTop > 500);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Mobile menu */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
if (burger) {
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
  });
  navLinks.addEventListener("click", e => {
    if (e.target.tagName === "A") { navLinks.classList.remove("open"); burger.classList.remove("open"); }
  });
}

/* Reveal on scroll + skill bars + counters */
function countUp(el) {
  const target = +el.dataset.count;
  let n = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const t = setInterval(() => {
    n = Math.min(target, n + step);
    el.textContent = n + (el.dataset.suffix || "");
    if (n >= target) clearInterval(t);
  }, 35);
}

const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    el.classList.add("in");
    el.querySelectorAll(".bar i").forEach(b => (b.style.width = b.dataset.level + "%"));
    if (el.dataset.count) countUp(el);
    io.unobserve(el);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

function observeAll() {
  document.querySelectorAll(".reveal:not(.in), [data-count]").forEach(el => io.observe(el));
}
observeAll();

/* Count-up numbers from data */
document.querySelectorAll("[data-count-from]").forEach(el => {
  if (el.dataset.countFrom === "projects") el.dataset.count = PROJECTS.length;
  if (el.dataset.countFrom === "skills") el.dataset.count = SKILLS.reduce((a, g) => a + g.items.length, 0);
  if (el.dataset.countFrom === "groups") el.dataset.count = SKILLS.length;
});
document.querySelectorAll("[data-count]").forEach(el => io.observe(el));

/* Typing animation (loops through phrases) */
document.querySelectorAll("[data-typing]").forEach(el => {
  const words = JSON.parse(el.dataset.typing);
  const text = document.createElement("span");
  const cur = document.createElement("span");
  cur.className = "cursor";
  el.append(text, cur);
  if (reduceMotion) { text.textContent = words[0]; return; }
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    text.textContent = word.slice(0, c);
    let delay = del ? 35 : 80;
    if (!del && c === word.length) { del = true; delay = 1500; }
    else if (del && c === 0) { del = false; w = (w + 1) % words.length; delay = 350; }
    c += del ? -1 : 1;
    setTimeout(tick, delay);
  })();
});

/* Terminal typing (hero) */
const term = document.getElementById("terminal-body");
if (term) {
  const script = [
    { t: "$ ", cls: "p", type: "whoami" },
    { t: "satyajit_sethy", cls: "o" },
    { t: "$ ", cls: "p", type: "cat focus.txt" },
    { t: "cybersecurity | python | full-stack", cls: "o" },
    { t: "$ ", cls: "p", type: "python3 scan.py --safe" },
    { t: "[+] checking systems...", cls: "g" },
    { t: "[+] 0 threats left unnoticed", cls: "g" },
    { t: "$ ", cls: "p", type: "" }
  ];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  (async function run() {
    term.innerHTML = "";
    for (const line of script) {
      const row = document.createElement("div");
      const pre = document.createElement("span");
      pre.className = line.cls;
      row.appendChild(pre);
      term.appendChild(row);
      if (line.type !== undefined) {
        pre.textContent = line.t;
        const typed = document.createElement("span");
        row.appendChild(typed);
        for (const ch of line.type) { typed.textContent += ch; await sleep(reduceMotion ? 0 : 70); }
        await sleep(reduceMotion ? 0 : 350);
      } else {
        pre.textContent = line.t;
        await sleep(reduceMotion ? 0 : 400);
      }
    }
    const cur = document.createElement("span");
    cur.className = "cursor";
    term.lastChild.appendChild(cur);
  })();
}

/* 3D tilt on terminal and cards */
if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll("[data-tilt]").forEach(el => {
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    });
    el.addEventListener("mouseleave", () => (el.style.transform = ""));
  });
}

/* Background: drifting node network */
(function network() {
  if (reduceMotion) return;
  const cv = document.createElement("canvas");
  cv.id = "bg-canvas";
  document.body.prepend(cv);
  const ctx = cv.getContext("2d");
  let w, h, pts;
  const color = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();

  function resize() {
    w = cv.width = innerWidth; h = cv.height = innerHeight;
    const n = Math.min(70, Math.floor((w * h) / 22000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35
    }));
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    const c = color();
    ctx.fillStyle = c; ctx.strokeStyle = c;
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.globalAlpha = .7;
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 7); ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d < 140) {
        ctx.globalAlpha = (1 - d / 140) * .35;
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  addEventListener("resize", resize);
  resize(); draw();
})();

/* Wire hero social icons + email button from SITE settings */
const heroSocials = document.getElementById("hero-socials");
if (heroSocials) {
  heroSocials.innerHTML = `
    <a href="${SITE.github}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>
    <a href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>
    <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
    <a href="mailto:${SITE.email}" aria-label="Email">${ICONS.mail}</a>`;
}
const ctaMail = document.getElementById("cta-mail");
if (ctaMail) ctaMail.href = "mailto:" + SITE.email;
