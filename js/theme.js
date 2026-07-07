(function () {
  "use strict";

  const STORAGE_KEY = "ondery-theme";
  const DEFAULT_THEME = "dark";

  function getTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" ? saved : DEFAULT_THEME;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === "light" ? "#f4f6f9" : "#080b12";

    document.querySelectorAll(".theme-btn").forEach((btn) => {
      const isDark = theme === "dark";
      btn.classList.toggle("is-dark", isDark);
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.setAttribute("title", isDark ? btn.dataset.labelLight || "Light mode" : btn.dataset.labelDark || "Dark mode");
    });

    document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
  }

  function setTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  }

  function toggleTheme() {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }

  window.OnderyTheme = { getTheme, setTheme, toggleTheme, applyTheme };

  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });

  applyTheme(getTheme());
})();
