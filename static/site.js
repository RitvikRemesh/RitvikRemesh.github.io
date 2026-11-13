const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const fields = new FormData(form);
  const body = [
    "Hi Ritvik! I got in touch through your portfolio website.",
    `Name: ${fields.get("name").trim()}`,
    `Email: ${fields.get("email").trim()}`,
    `Message: ${fields.get("message").trim()}`,
  ].join("\n");
  const url = `https://wa.me/918606440847?text=${encodeURIComponent(body)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
