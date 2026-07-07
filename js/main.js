(function () {
  "use strict";

  /* ── Sidebar mobile toggle ── */
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  const menuToggle = document.querySelector(".menu-toggle");

  function setMenuOpen(open) {
    document.body.classList.toggle("menu-open", open);
    sidebar?.classList.toggle("open", open);
    overlay?.classList.toggle("open", open);
    menuToggle?.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }

  function closeMenu() { setMenuOpen(false); }
  function openMenu() { setMenuOpen(true); }

  menuToggle?.addEventListener("click", () => {
    sidebar?.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlay?.addEventListener("click", closeMenu);

  sidebar?.querySelectorAll(".sidebar-nav a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeMenu();
  });

  /* ── Scroll spy — active sidebar link ── */
  const sections = document.querySelectorAll(".doc-section[id], .hero[id]");
  const navLinks = document.querySelectorAll(".sidebar-nav a");

  const spyObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      });
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: 0 }
  );

  sections.forEach((s) => spyObs.observe(s));

  /* ── Typed Roles (i18n-aware) ── */
  const typedEl = document.getElementById("typed-text");
  let typeTimeout = null;
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function getRoles() {
    const lang = window.OnderyI18n?.getLang() || "en";
    return window.OnderyI18n?.getRoles(lang) || [];
  }

  function resetTyping() {
    if (typeTimeout) clearTimeout(typeTimeout);
    roleIdx = 0;
    charIdx = 0;
    deleting = false;
    if (typedEl) typedEl.textContent = "";
    typeTimeout = setTimeout(type, 400);
  }

  function type() {
    if (!typedEl) return;
    const roles = getRoles();
    if (!roles.length) return;

    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        typeTimeout = setTimeout(type, 2400);
        return;
      }
      typeTimeout = setTimeout(type, 55 + Math.random() * 30);
    } else {
      typedEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeTimeout = setTimeout(type, 400);
        return;
      }
      typeTimeout = setTimeout(type, 30);
    }
  }

  if (typedEl) setTimeout(type, 1200);
  document.addEventListener("langchange", resetTyping);

  /* ── Language switcher ── */
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.OnderyI18n?.setLang(btn.dataset.lang);
    });
  });

  /* ── Scroll reveal ── */
  const revealEls = document.querySelectorAll(".reveal");
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );
  revealEls.forEach((el) => revealObs.observe(el));

  /* ── Counter animation ── */
  const counters = document.querySelectorAll("[data-count]");
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObs.observe(c));

  /* ── Skill bars ── */
  const bars = document.querySelectorAll(".skill-bar-fill");
  const barObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          barObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((b) => barObs.observe(b));

  /* ── Skill card mouse glow ── */
  document.querySelectorAll(".skill-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  });

  /* ── Terminal typing ── */
  const terminalLines = document.querySelectorAll(".terminal-line");
  const termObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        terminalLines.forEach((line, i) => {
          setTimeout(() => line.classList.add("show"), i * 300);
        });
        termObs.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  const terminal = document.querySelector(".terminal");
  if (terminal) termObs.observe(terminal);

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
