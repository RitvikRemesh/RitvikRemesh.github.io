const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
document.documentElement.classList.add("js");
document.querySelector("#copyright-year").textContent = new Date().getFullYear();

function setMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  siteNav.classList.toggle("is-open", open);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const contactForm = document.querySelector("#contact-form");
contactForm.hidden = false;
contactForm.addEventListener("input", (event) => {
  if (event.target.matches("input, textarea")) event.target.setCustomValidity("");
});
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  for (const name of ["name", "message"]) {
    const field = form.elements.namedItem(name);
    field.setCustomValidity(field.value.trim() ? "" : "Please enter more than whitespace.");
  }
  if (!form.reportValidity()) return;

  const fields = new FormData(form);
  const body = [
    "Hi Ritvik! I got in touch through your portfolio website.",
    `Name: ${fields.get("name").trim()}`,
    `Email: ${fields.get("email").trim()}`,
    `Message: ${fields.get("message").trim()}`,
  ].join("\n");
  const url = `https://wa.me/918606440847?text=${encodeURIComponent(body)}`;
  window.location.assign(url);
});

const repoSearch = document.querySelector("#repo-search");
const repoStatus = document.querySelector(".repo-status");
const repositories = [...document.querySelectorAll(".repo-card")].map((card) => ({
  card,
  text: card.textContent.toLowerCase(),
}));

function filterRepositories() {
  const terms = repoSearch.value.toLowerCase().trim().split(/\s+/);
  let count = 0;
  for (const { card, text } of repositories) {
    card.hidden = !terms.every((term) => text.includes(term));
    if (!card.hidden) count += 1;
  }
  repoStatus.textContent = count === 0
    ? "No repositories match your search."
    : `${count} ${count === 1 ? "repository" : "repositories"}`;
}

repoSearch.closest(".repo-controls").hidden = false;
repoStatus.hidden = false;
repoSearch.addEventListener("input", filterRepositories);
filterRepositories();

const preview = document.querySelector(".project-preview");
const previewLinks = [...document.querySelectorAll(".preview-link")];
const previewImage = preview.querySelector("img");
const previewTitle = preview.querySelector("h2");
const previewPosition = preview.querySelector(".preview-position");
let previewIndex = 0;

function showScreenshot(index) {
  previewIndex = (index + previewLinks.length) % previewLinks.length;
  const link = previewLinks[previewIndex];
  const title = link.dataset.title;
  previewTitle.textContent = title;
  previewImage.alt = `${title} interface screenshot`;
  previewImage.src = link.href;
  previewPosition.textContent = `${title} · ${previewIndex + 1} of ${previewLinks.length}`;
}

previewLinks.forEach((link, index) => {
  link.addEventListener("click", (event) => {
    if (typeof preview.showModal !== "function" || event.defaultPrevented ||
        event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    showScreenshot(index);
    link.focus({ preventScroll: true });
    preview.showModal();
    event.preventDefault();
  });
});

preview.querySelector(".preview-previous").addEventListener("click", () => showScreenshot(previewIndex - 1));
preview.querySelector(".preview-next").addEventListener("click", () => showScreenshot(previewIndex + 1));
preview.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showScreenshot(previewIndex + (event.key === "ArrowRight" ? 1 : -1));
  }
});

const motion = matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window) {
  const reveal = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      if (!motion.matches) entry.target.classList.add("reveal-in");
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.12 });

  document.querySelectorAll(".section-heading, .studio-image, .project-card, .skill-card, .contact-intro")
    .forEach((element) => reveal.observe(element));
}

const progress = document.querySelector(".scroll-progress");
const navSections = [...siteNav.querySelectorAll("a")].map((link) => ({
  link,
  section: document.querySelector(link.hash),
}));
let framePending = false;

function updateScrollState() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
  progress.style.transform = `scaleX(${ratio})`;

  const active = [...navSections].reverse().find(({ section }) =>
    section.getBoundingClientRect().top <= 120);
  for (const item of navSections) {
    if (item === active) item.link.setAttribute("aria-current", "location");
    else item.link.removeAttribute("aria-current");
  }
  framePending = false;
}

function scheduleScrollUpdate() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(updateScrollState);
}

window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
window.addEventListener("resize", scheduleScrollUpdate);
window.addEventListener("load", scheduleScrollUpdate);
repoSearch.addEventListener("input", scheduleScrollUpdate);
updateScrollState();
