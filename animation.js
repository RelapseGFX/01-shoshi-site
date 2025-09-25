// =======================
// Mobile Navigation
// =======================
(() => {
  const openNav = document.querySelector(".open-menu");
  const closeNav = document.querySelector(".close-menu");
  const navMenu = document.querySelector(".nav-links-container");
  const mediaSize = 992;

  if (openNav && closeNav && navMenu) {
    const toggleMenu = () => navMenu.classList.toggle("open");
    openNav.addEventListener("click", toggleMenu);
    closeNav.addEventListener("click", toggleMenu);

    navMenu.addEventListener("click", (e) => {
      if (e.target.hasAttribute("data-toggle") && window.innerWidth <= mediaSize) {
        e.preventDefault();
        const branch = e.target.parentElement;
        const active = navMenu.querySelector(".dropdown-menu-branch.active");

        if (branch.classList.contains("active")) {
          active?.querySelector(".dropdown-menu")?.removeAttribute("style");
          branch.classList.remove("active");
        } else {
          active?.querySelector(".dropdown-menu")?.removeAttribute("style");
          active?.classList.remove("active");

          branch.classList.add("active");
          const dropdown = branch.querySelector(".dropdown-menu");
          dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        }
      }
    });
  }
})();

// =======================
// Tabs
// =======================
(() => {
  const container = document.querySelector(".tabs-container");
  if (!container) return;

  const list = container.querySelector(".tabs-list");
  const buttons = list.querySelectorAll(".tabs-button");
  const panels = container.querySelectorAll(".tabs__panels > div");

  list.setAttribute("role", "tablist");
  list.querySelectorAll("li").forEach(li => li.setAttribute("role", "presentation"));

  buttons.forEach((btn, i) => {
    btn.setAttribute("role", "tab");
    if (i === 0) btn.setAttribute("aria-selected", "true");
    else {
      btn.setAttribute("tabindex", "-1");
      panels[i].setAttribute("hidden", "");
    }
  });

  panels.forEach(p => {
    p.setAttribute("role", "tabpanel");
    p.setAttribute("tabindex", "0");
  });

  const switchTab = (newTab) => {
    const activePanel = container.querySelector(newTab.getAttribute("href"));
    buttons.forEach(b => { b.setAttribute("aria-selected", false); b.setAttribute("tabindex", "-1"); });
    panels.forEach(p => p.setAttribute("hidden", ""));
    activePanel?.removeAttribute("hidden");
    newTab.setAttribute("aria-selected", true);
    newTab.setAttribute("tabindex", "0");
    newTab.focus();
  };

  container.addEventListener("click", (e) => {
    const tab = e.target.closest("a.tabs-button");
    if (tab) { e.preventDefault(); switchTab(tab); }
  });

  container.addEventListener("keydown", (e) => {
    const current = document.activeElement;
    let idx = [...buttons].indexOf(current);
    if (idx < 0) return;

    if (e.key === "ArrowLeft") switchTab(buttons[(idx - 1 + buttons.length) % buttons.length]);
    if (e.key === "ArrowRight") switchTab(buttons[(idx + 1) % buttons.length]);
    if (e.key === "Home") { e.preventDefault(); switchTab(buttons[0]); }
    if (e.key === "End") { e.preventDefault(); switchTab(buttons[buttons.length - 1]); }
  });
})();

// =======================
// Scroll + Trailer
// =======================
(() => {
  const header = document.querySelector("header");
  if (header) {
    document.addEventListener("scroll", () =>
      header.classList.toggle("scrolled", window.scrollY > 0)
    );
  }

  window.toggleTrailer = () => {
    const trailer = document.querySelector(".trailer");
    const video = document.querySelector("video");
    trailer?.classList.toggle("active");
    if (trailer && !trailer.classList.contains("active")) {
      video?.pause();
      if (video) video.currentTime = 0;
    }
  };
})();
