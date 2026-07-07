(function () {
  "use strict";

  /* ── Particle Network ── */
  const canvas = document.getElementById("particle-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h, particles, mouse = { x: null, y: null };
    const COUNT = 80;
    const CONNECT = 140;
    const MOUSE_RADIUS = 180;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function initParticles() {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        if (mouse.x !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.015;
            p.vx -= dx * force;
            p.vy -= dy * force;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(212, 165, 116, 0.5)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212, 165, 116, ${0.12 * (1 - dist / CONNECT)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", () => { resize(); initParticles(); });
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });
    resize();
    initParticles();
    draw();
  }

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

  /* ── Nav scroll ── */
  const nav = document.querySelector(".nav");
  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 40);
  });

  /* ── Mobile menu ── */
  const toggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  toggle?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("open");
    document.body.style.overflow = mobileMenu?.classList.contains("open") ? "hidden" : "";
  });
  mobileMenu?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
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
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
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
          setTimeout(() => line.classList.add("show"), i * 350);
        });
        termObs.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );
  const terminal = document.querySelector(".terminal");
  if (terminal) termObs.observe(terminal);

  /* ── Smooth anchor offset for fixed nav ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
