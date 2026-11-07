/* ==========================================================
   SHARED COMPONENTS  -  Navbar + Footer + Social links
   Edit here ONCE and every page updates automatically.
   (Works with a double-click on the file, no server needed.)
   ========================================================== */

const SITE = {
  name: "Satyajit Sethy",
  logo: "img/Logo.png",   // <-- navbar/footer logo image. Replace "#" with e.g. "assets/images/Logo.png" when ready
  email: "satyajitsethy369@gmail.com",
  github: "https://github.com/sethysatyajit",
  linkedin: "https://www.linkedin.com/in/satyajitsethy/",
  instagram: "https://www.instagram.com/satyajitsethyofficial/"
};

const NAV_LINKS = [
  { href: "index.html",    label: "Home" },
  { href: "about.html",    label: "About" },
  { href: "skills.html",   label: "Skills" },
  { href: "projects.html", label: "Projects" },
  { href: "contact.html",  label: "Contact" }
];

const ICONS = {
  github: "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 .5C5.37.5 0 5.78 0 12.3c0 5.2 3.44 9.63 8.2 11.19.6.11.82-.26.82-.58v-2.04c-3.34.74-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.08-.75.08-.74.08-.74 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.31-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12.01 12.01 0 0 0 24 12.3C24 5.78 18.63.5 12 .5z\"/></svg>",
  linkedin: "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z\"/></svg>",
  instagram: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"17.5\" cy=\"6.5\" r=\"1\" fill=\"currentColor\" stroke=\"none\"/></svg>",
  mail: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"14\" rx=\"3\"/><path d=\"m3.5 7.5 8.5 6 8.5-6\"/></svg>",
  external: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5\"/></svg>",
  sun: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\"><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4\"/></svg>",
  moon: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z\"/></svg>"
};

/* Logo mark: image sits on top of the "SS" text. If the image is missing or "#", it removes itself and "SS" shows. */
function brandMark() {
  return `<span class="brand-mark"><span class="brand-initials">SS</span><img src="${SITE.logo}" alt="${SITE.name} logo" onerror="this.remove()"></span>`;
}

function currentPage() {
  const file = location.pathname.split("/").pop();
  return file === "" ? "index.html" : file;
}

function renderNavbar() {
  const host = document.getElementById("site-header");
  if (!host) return;
  const page = currentPage();
  const links = NAV_LINKS.map(
    l => `<a href="${l.href}" class="${l.href === page ? "active" : ""}">${l.label}</a>`
  ).join("");

  host.innerHTML = `
    <nav class="nav" aria-label="Main">
      <a href="index.html" class="brand" aria-label="Home">
        ${brandMark()}
        <span class="brand-name">${SITE.name}</span>
      </a>
      <div class="nav-links" id="navLinks">${links}</div>
      <div class="nav-actions">
        <button class="icon-btn" id="themeToggle" aria-label="Switch theme"></button>
        <button class="icon-btn burger" id="burger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`;
}

function renderFooter() {
  const host = document.getElementById("site-footer");
  if (!host) return;
  const links = NAV_LINKS.map(l => `<a href="${l.href}">${l.label}</a>`).join("");
  host.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">
        ${brandMark()}
        <p>Cybersecurity enthusiast and full-stack developer, building and protecting digital spaces.</p>
      </div>
      <div class="footer-col">
        <h4>Pages</h4>
        ${links}
      </div>
      <div class="footer-col">
        <h4>Find me</h4>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <div class="socials">
          <a href="${SITE.github}" target="_blank" rel="noopener" aria-label="GitHub">${ICONS.github}</a>
          <a href="${SITE.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn">${ICONS.linkedin}</a>
          <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
          <a href="mailto:${SITE.email}" aria-label="Email">${ICONS.mail}</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">&copy; <span id="year"></span> ${SITE.name}. Built with HTML, CSS and JavaScript.</div>`;
  document.getElementById("year").textContent = new Date().getFullYear();
}

function renderContactCards() {
  const host = document.getElementById("contact-cards");
  if (!host) return;
  const cards = [
    { icon: "mail", title: "Email", text: SITE.email, href: "mailto:" + SITE.email, note: "Best for project and job enquiries" },
    { icon: "linkedin", title: "LinkedIn", text: "/in/satyajitsethy", href: SITE.linkedin, note: "Let us connect professionally" },
    { icon: "github", title: "GitHub", text: "@sethysatyajit", href: SITE.github, note: "Browse my code and projects" },
    { icon: "instagram", title: "Instagram", text: "@satyajitsethyofficial", href: SITE.instagram, note: "Say hi and see what I am up to" }
  ];
  host.innerHTML = cards.map((c, i) => `
    <a class="contact-card reveal" data-anim="pop" style="--d:${i * 90}ms" href="${c.href}" target="_blank" rel="noopener">
      <span class="contact-icon">${ICONS[c.icon]}</span>
      <h3>${c.title}</h3>
      <p class="contact-main">${c.text}</p>
      <p class="muted">${c.note}</p>
    </a>`).join("");
}

/* Theme (dark default) */
function applyTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.innerHTML = t === "dark" ? ICONS.sun : ICONS.moon;
}
function initTheme() {
  let saved = "dark";
  try { saved = localStorage.getItem("theme") || "dark"; } catch (e) {}
  applyTheme(saved);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

renderNavbar();
renderFooter();
renderContactCards();
initTheme();