/* Renders project cards + search + filters. Data comes from data.js */

const PLACEHOLDER = "#";

function projectCard(p, i = 0) {
  const cats = p.categories.map(c => `<span class="cat">${c}</span>`).join("");
  const tags = p.tags.slice(0, 5).map(t => `<span class="chip">${t}</span>`).join("");
  const live = p.live
    ? `<a class="btn btn-primary btn-sm" href="${p.live}" target="_blank" rel="noopener">Live demo ${ICONS.external}</a>` : "";
  return `
    <article class="project reveal" data-anim="pop" style="--d:${i * 80}ms">
      <div class="project-img">
        <img src="${p.image}" alt="${p.title} screenshot" width="1200" height="600" loading="lazy" decoding="async"
             onerror="this.onerror=null;this.src='${PLACEHOLDER}'">
      </div>
      <div class="project-body">
        <div class="project-cats">${cats}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="chips">${tags}</div>
        <div class="project-links">
          ${live}
          <a class="btn btn-ghost btn-sm" href="${p.github}" target="_blank" rel="noopener">${ICONS.github} GitHub</a>
        </div>
      </div>
    </article>`;
}

/* Home page: first 3 projects */
function renderFeatured() {
  const host = document.getElementById("featured-projects");
  if (!host) return;
  host.innerHTML = PROJECTS.slice(0, 3).map(projectCard).join("");
}

/* Projects page: search + filter */
function initProjectsPage() {
  const grid = document.getElementById("project-grid");
  if (!grid) return;
  const input = document.getElementById("project-search");
  const filterHost = document.getElementById("project-filters");
  const count = document.getElementById("result-count");
  const empty = document.getElementById("empty");
  let active = "All";

  filterHost.innerHTML = PROJECT_FILTERS.map(
    f => `<button class="filter ${f === "All" ? "active" : ""}" data-f="${f}">${f}</button>`
  ).join("");

  function apply() {
    const q = input.value.trim().toLowerCase();
    const list = PROJECTS.filter(p => {
      const inCat = active === "All" || p.categories.includes(active);
      const hay = [p.title, p.description, ...p.tags, ...p.categories].join(" ").toLowerCase();
      return inCat && (!q || q.split(/\s+/).every(w => hay.includes(w)));
    });
    grid.innerHTML = list.map(projectCard).join("");
    list.forEach((_, i) => grid.children[i].classList.add("in"));
    count.textContent = `Showing ${list.length} of ${PROJECTS.length} projects`;
    empty.classList.toggle("show", list.length === 0);
  }

  filterHost.addEventListener("click", e => {
    const b = e.target.closest(".filter");
    if (!b) return;
    active = b.dataset.f;
    filterHost.querySelectorAll(".filter").forEach(x => x.classList.toggle("active", x === b));
    apply();
  });
  input.addEventListener("input", apply);
  document.getElementById("reset-search").addEventListener("click", () => {
    input.value = ""; active = "All";
    filterHost.querySelectorAll(".filter").forEach(x => x.classList.toggle("active", x.dataset.f === "All"));
    apply();
  });
  apply();
}

/* Skills page */
function renderSkills() {
  const host = document.getElementById("skills-list");
  if (!host) return;
  host.innerHTML = SKILLS.map((g, i) => `
    <div class="card skill-group reveal" data-anim="${i % 2 ? "right" : "left"}">
      <h3>${g.group}</h3>
      <p>${g.blurb}</p>
      ${g.items.map(s => `
        <div class="skill">
          <div class="skill-top"><span>${s.name}</span><span>${s.level}%</span></div>
          <div class="bar"><i data-level="${s.level}"></i></div>
        </div>`).join("")}
    </div>`).join("");
}

/* Home: skills marquee */
function renderMarquee() {
  const host = document.getElementById("skill-marquee");
  if (!host) return;
  const names = SKILLS.flatMap(g => g.items.map(s => s.name));
  const row = names.map(n => `<span class="chip">${n}</span>`).join("");
  host.innerHTML = `<div class="marquee-track">${row}${row}</div>`;
}

renderFeatured();
initProjectsPage();
renderSkills();
renderMarquee();