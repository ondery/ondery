(function () {
  "use strict";

  const STORAGE_KEY = "ondery-lang";
  const DEFAULT_LANG = "en";
  const translations = window.OnderyTranslations || {};

  function getNested(obj, path) {
    return path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
  }

  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (!translations[lang]) return;
    localStorage.setItem(STORAGE_KEY, lang);
    applyLanguage(lang);
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }

  function renderLegalAreas(lang) {
    const container = document.getElementById("legal-areas");
    const t = translations[lang];
    if (!container || !t?.legal?.areas) return;

    const icons = {
      scale: "i-scale",
      ship: "i-ship",
      badge: "i-badge",
      briefcase: "i-briefcase",
      file: "i-file",
      users: "i-users",
      car: "i-car",
      globe: "i-globe",
    };

    container.innerHTML = t.legal.areas
      .map(
        (a) => `
        <article class="legal-card reveal">
          <div class="legal-icon"><svg class="icon" aria-hidden="true"><use href="#${icons[a.icon] || "i-scale"}"/></svg></div>
          <h3>${a.title}</h3>
          <p>${a.desc}</p>
        </article>`
      )
      .join("");

    container.querySelectorAll(".reveal").forEach((el) => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      obs.observe(el);
    });
  }

  function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;

    document.documentElement.lang = lang;
    document.title = t.meta.title;

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = t.meta.description;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = t.meta.ogTitle;
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = t.meta.ogDescription;
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle && t.meta.ogTitle) twTitle.content = t.meta.ogTitle;
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && t.meta.ogDescription) twDesc.content = t.meta.ogDescription;
    const locales = { en: "en_US", tr: "tr_TR", fr: "fr_FR" };
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale && locales[lang]) ogLocale.content = locales[lang];

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = getNested(t, el.dataset.i18n);
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const val = getNested(t, el.dataset.i18nHtml);
      if (val !== undefined) el.innerHTML = val;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":");
        const val = getNested(t, key.trim());
        if (val !== undefined) el.setAttribute(attr.trim(), val);
      });
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
      btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
    });

    document.querySelectorAll(".theme-btn").forEach((btn) => {
      const labelLight = getNested(t, "nav.themeLight");
      const labelDark = getNested(t, "nav.themeDark");
      const labelToggle = getNested(t, "nav.themeToggle");
      if (labelLight) btn.dataset.labelLight = labelLight;
      if (labelDark) btn.dataset.labelDark = labelDark;
      if (labelToggle) btn.setAttribute("aria-label", labelToggle);
    });

    if (window.OnderyTheme) {
      window.OnderyTheme.applyTheme(window.OnderyTheme.getTheme());
    }

    renderLegalAreas(lang);
  }

  window.OnderyI18n = {
    translations,
    getLang,
    setLang,
    applyLanguage,
    getRoles: (lang) => translations[lang]?.roles || translations.en?.roles || [],
  };

  applyLanguage(getLang());
})();
