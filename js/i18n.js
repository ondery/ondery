(function () {
  "use strict";

  const STORAGE_KEY = "ondery-lang";
  const DEFAULT_LANG = "en";

  const translations = {
    en: {
      meta: {
        title: "Öndery — Software Architecture & AI",
        description: "Öndery — Full-stack software architect, database specialist and graphic designer with 20 years of experience. Istanbul, Turkey.",
        ogTitle: "Öndery — Software Architecture & AI",
        ogDescription: "More than writing code: I design systems, optimize databases, and bring interfaces to life.",
      },
      nav: {
        label: "Main menu",
        about: "About",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        toggle: "Toggle menu",
        mobileLabel: "Mobile menu",
      },
      hero: {
        badge: "Istanbul, Turkey · Open to opportunities",
        titleHtml: "Beyond<br><em>writing code.</em>",
        subtitle: "With 20 years of experience, I architect systems, optimize databases, build AI integrations, and craft user experiences.",
        ctaProjects: "Explore Projects",
        ctaContact: "Get in Touch",
        avatarAlt: "Öndery profile photo",
        statYears: "Years Experience",
        statProjects: "Projects",
        statTech: "Technologies",
      },
      roles: [
        "Full-Stack Architecture & System Design",
        "AI & RAG Pipeline Development",
        "Database Optimization & Modeling",
        "UI/UX & Graphic Design",
        "DevOps & Container Orchestration",
      ],
      about: {
        tag: "// about",
        titleHtml: "Engineering mindset,<br>design sensibility.",
        desc: "Frontend developer, backend architect, database specialist and graphic designer — disciplines united in one person.",
        p1Html: "I've been active in software since <strong>2006</strong>. From day one, I didn't just write code — I thought about the entire system, from database schema to user interface, from server architecture to DevOps pipelines.",
        p2Html: "From monolithic PHP apps to the modern <strong>Next.js &amp; TypeScript</strong> ecosystem, from traditional relational databases to <strong>vector search &amp; RAG</strong> pipelines — I've deeply learned each era's technology and brought it to production.",
        p3Html: "Today my focus is building <strong>AI-powered enterprise platforms</strong>, designing multi-tenant architectures, and automating complex business processes. My graphic design background lets me complement technical solutions with aesthetic, usable interfaces.",
        h1Title: "System Architecture",
        h1Desc: "I design scalable, modular and maintainable software architectures.",
        h2Title: "AI Integration",
        h2Desc: "I build intelligent applications with LLM, RAG, LangGraph and the MCP protocol.",
        h3Title: "Database Expertise",
        h3Desc: "MySQL, PostgreSQL, MongoDB, Redis, Qdrant — modeling, optimization and migration.",
        h4Title: "UI/UX & Graphic Design",
        h4Desc: "User-centered interfaces, brand identity and visual communication design.",
      },
      experience: {
        tag: "// career journey",
        title: "Two decades of evolution.",
        desc: "Each era brought a new paradigm. I stayed one step ahead every time.",
        t1Year: "2024 — Present",
        t1Title: "AI Era & Legal Tech",
        t1Desc: "AI-powered platform development for the legal sector. RAG pipelines, LangGraph agents, MCP servers and multi-tenant SaaS architecture. ONLYOFFICE integration and document management systems.",
        t2Year: "2018 — 2024",
        t2Title: "Cloud, DevOps & Modern Frontend",
        t2Desc: "React ecosystem, TypeScript, Docker containerization and CI/CD pipelines. Microservice architectures, API gateway design, real-time applications and automation platforms.",
        t3Year: "2012 — 2018",
        t3Title: "Full-Stack Maturity",
        t3Desc: "Enterprise web applications, ERP modules, e-commerce platforms and mobile-responsive interfaces. Database performance optimization, stored procedures and reporting systems.",
        t4Year: "2006 — 2012",
        t4Title: "Foundations & First Steps",
        t4Desc: "The golden age of web development. Dynamic websites, CMS systems, graphic design and print work. First production systems with HTML, CSS, PHP and MySQL.",
      },
      skills: {
        tag: "// skills",
        titleHtml: "Wide toolkit,<br>deeper expertise.",
        frontend: "Frontend & UI",
        backend: "Backend",
        database: "Database",
        depth: "Expertise Depth",
        ai: "Artificial Intelligence",
        devops: "DevOps & Infrastructure",
        bar1: "Full-Stack Development",
        bar2: "Database Design",
        bar3: "System Architecture",
        bar4: "UI/UX Design",
        bar5: "AI / LLM Integration",
      },
      terminal: {
        label: "Terminal demo",
        whoami: "Öndery — Full-Stack Architect & AI Engineer",
        status: "Ready for the next challenge. ▊",
      },
      projects: {
        tag: "// projects",
        titleHtml: "A selection<br>of my work.",
        desc: "From open-source contributions to enterprise platforms — each project solves a different problem.",
        lawTitle: "LawToolsAI — Legal AI Platform",
        lawDesc: "Multi-tenant law office management platform. LangGraph agents, MCP protocol, RAG-based legislation search, ONLYOFFICE document editor, UYAP integration and async job queues — enterprise-scale legal-tech.",
        ragDesc: "Development on open-source RAG engine in Go and Python layers. Document parsing, vector indexing and agent capabilities.",
        officeTitle: "ONLYOFFICE Integration",
        officeDesc: "Customization across Document Server, web-apps and backend server layers with enterprise document management integration.",
        outlinerDesc: "Outline/note-taking tool built with TypeScript. Hierarchical structure and modern editor experience.",
        wcDesc: "Interactive HTML experience for the 2026 World Cup. Live scores, calendar and statistics.",
        neuraTitle: "NeuraFlow — Workflow Automation",
        neuraDesc: "AI-powered workflow automation platform. Visual builder, 400+ integrations and self-host option.",
        viewGithub: "View on GitHub →",
      },
      contact: {
        tag: "// contact",
        titleHtml: "Let's build<br>together.",
        desc: "Reach out for new projects, collaborations or technical consulting.",
        email: "Email",
        quote: "Many people have reached out recently because of my job search. I'm actually an ordinary person — but I take my work seriously. Thank you for your interest and kindness.",
        cite: "— Öndery",
      },
      footer: {
        textHtml: '© 2026 <a href="https://github.com/ondery">Öndery</a> · Istanbul, Turkey · <a href="https://github.com/ondery/ondery">Source Code</a>',
      },
    },
    tr: {
      meta: {
        title: "Öndery — Yazılım Mimarisi & Yapay Zeka",
        description: "Öndery — 20 yıllık deneyime sahip full-stack yazılım mimarı, veritabanı uzmanı ve grafik tasarımcı. İstanbul, Türkiye.",
        ogTitle: "Öndery — Yazılım Mimarisi & Yapay Zeka",
        ogDescription: "Kod yazmaktan fazlası: sistemler tasarlarım, veritabanlarını optimize ederim, arayüzler hayata geçiririm.",
      },
      nav: {
        label: "Ana menü",
        about: "Hakkımda",
        experience: "Deneyim",
        skills: "Yetkinlikler",
        projects: "Projeler",
        contact: "İletişim",
        toggle: "Menüyü aç/kapat",
        mobileLabel: "Mobil menü",
      },
      hero: {
        badge: "İstanbul, Türkiye · Açık iş tekliflerine uygun",
        titleHtml: "Kod yazmaktan<br><em>çok daha fazlası.</em>",
        subtitle: "20 yıllık deneyimle sistem mimarisi kuruyor, veritabanlarını optimize ediyor, yapay zeka entegrasyonları geliştiriyor ve kullanıcı deneyimini tasarlıyorum.",
        ctaProjects: "Projelerimi Keşfet",
        ctaContact: "İletişime Geç",
        avatarAlt: "Öndery profil fotoğrafı",
        statYears: "Yıl Deneyim",
        statProjects: "Proje",
        statTech: "Teknoloji",
      },
      roles: [
        "Full-Stack Mimari & Sistem Tasarımı",
        "Yapay Zeka & RAG Pipeline Geliştirme",
        "Veritabanı Optimizasyonu & Modelleme",
        "UI/UX & Grafik Tasarım",
        "DevOps & Konteyner Orkestrasyonu",
      ],
      about: {
        tag: "// hakkımda",
        titleHtml: "Mühendislik zihniyeti,<br>tasarım duyarlılığı.",
        desc: "Frontend geliştiricisi, backend mimarı, veritabanı uzmanı ve grafik tasarımcı — tek bir kişide birleşen disiplinler.",
        p1Html: "<strong>2006'dan bu yana</strong> yazılım dünyasında aktif olarak çalışıyorum. İlk günlerden beri sadece kod yazmakla yetinmedim; sistemin tamamını düşündüm — veritabanı şemasından kullanıcı arayüzüne, sunucu mimarisinden DevOps pipeline'ına kadar.",
        p2Html: "Monolitik PHP uygulamalarından modern <strong>Next.js &amp; TypeScript</strong> ekosistemine, geleneksel ilişkisel veritabanlarından <strong>vektör arama &amp; RAG</strong> pipeline'larına uzanan bir yolculukta, her dönemin teknolojisini derinlemesine öğrenip üretime taşıdım.",
        p3Html: "Bugün odak noktam: <strong>yapay zeka destekli kurumsal platformlar</strong> inşa etmek, multi-tenant mimariler tasarlamak ve karmaşık iş süreçlerini otomatikleştirmek. Grafik tasarım geçmişim sayesinde teknik çözümlerimi estetik ve kullanılabilir arayüzlerle tamamlıyorum.",
        h1Title: "Sistem Mimarisi",
        h1Desc: "Ölçeklenebilir, modüler ve sürdürülebilir yazılım mimarileri tasarlıyorum.",
        h2Title: "Yapay Zeka Entegrasyonu",
        h2Desc: "LLM, RAG, LangGraph ve MCP protokolü ile akıllı uygulamalar geliştiriyorum.",
        h3Title: "Veritabanı Uzmanlığı",
        h3Desc: "MySQL, PostgreSQL, MongoDB, Redis, Qdrant — modelleme, optimizasyon ve migration.",
        h4Title: "UI/UX & Grafik Tasarım",
        h4Desc: "Kullanıcı odaklı arayüzler, marka kimliği ve görsel iletişim tasarımı.",
      },
      experience: {
        tag: "// kariyer yolculuğu",
        title: "İki on yıllık evrim.",
        desc: "Her dönem yeni bir paradigma getirdi. Ben de her seferinde bir adım önde kaldım.",
        t1Year: "2024 — Günümüz",
        t1Title: "Yapay Zeka Çağı & Legal Tech",
        t1Desc: "Hukuk sektörüne yönelik yapay zeka destekli platform geliştirme. RAG pipeline'ları, LangGraph agent'ları, MCP sunucuları ve multi-tenant SaaS mimarisi. ONLYOFFICE entegrasyonu ve doküman yönetim sistemleri.",
        t2Year: "2018 — 2024",
        t2Title: "Bulut, DevOps & Modern Frontend",
        t2Desc: "React ekosistemi, TypeScript, Docker konteynerizasyonu ve CI/CD pipeline'ları. Mikroservis mimarileri, API gateway tasarımı, gerçek zamanlı uygulamalar ve otomasyon platformları.",
        t3Year: "2012 — 2018",
        t3Title: "Full-Stack Olgunlaşma",
        t3Desc: "Kurumsal web uygulamaları, ERP modülleri, e-ticaret platformları ve mobil uyumlu arayüzler. Veritabanı performans optimizasyonu, stored procedure'lar ve raporlama sistemleri.",
        t4Year: "2006 — 2012",
        t4Title: "Temeller & İlk Adımlar",
        t4Desc: "Web geliştirmenin altın çağı. Dinamik web siteleri, CMS sistemleri, grafik tasarım ve baskı işleri. HTML, CSS, PHP ve MySQL ile ilk production sistemler.",
      },
      skills: {
        tag: "// yetkinlikler",
        titleHtml: "Araç kutum geniş,<br>derinliğim daha geniş.",
        frontend: "Frontend & UI",
        backend: "Backend",
        database: "Veritabanı",
        depth: "Uzmanlık Derinliği",
        ai: "Yapay Zeka",
        devops: "DevOps & Altyapı",
        bar1: "Full-Stack Geliştirme",
        bar2: "Veritabanı Tasarımı",
        bar3: "Sistem Mimarisi",
        bar4: "UI/UX Tasarım",
        bar5: "AI / LLM Entegrasyonu",
      },
      terminal: {
        label: "Terminal demo",
        whoami: "Öndery — Full-Stack Architect & AI Engineer",
        status: "Bir sonraki meydan okumaya hazır. ▊",
      },
      projects: {
        tag: "// projeler",
        titleHtml: "Ürettiklerimden<br>bir seçki.",
        desc: "Açık kaynak katkılarından kurumsal platformlara — her proje farklı bir problemi çözüyor.",
        lawTitle: "LawToolsAI — Hukuk Yapay Zeka Platformu",
        lawDesc: "Multi-tenant hukuk ofisi yönetim platformu. LangGraph agent'ları, MCP protokolü, RAG tabanlı mevzuat araması, ONLYOFFICE doküman editörü, UYAP entegrasyonu ve asenkron iş kuyrukları ile kurumsal ölçekte legal-tech çözümü.",
        ragDesc: "Açık kaynak RAG motoru üzerinde Go ve Python katmanlarında geliştirme. Doküman ayrıştırma, vektör indeksleme ve agent yetenekleri.",
        officeTitle: "ONLYOFFICE Entegrasyonu",
        officeDesc: "Document Server, web-apps ve backend server katmanlarında özelleştirme ve kurumsal doküman yönetim sistemi entegrasyonu.",
        outlinerDesc: "TypeScript ile geliştirilmiş outline/not alma aracı. Hiyerarşik yapı ve modern editör deneyimi.",
        wcDesc: "2026 Dünya Kupası için interaktif HTML deneyimi. Canlı skorlar, takvim ve istatistikler.",
        neuraTitle: "NeuraFlow — İş Akışı Otomasyonu",
        neuraDesc: "Yapay zeka destekli workflow otomasyon platformu. Görsel builder, 400+ entegrasyon ve self-host seçeneği.",
        viewGithub: "GitHub'da Gör →",
      },
      contact: {
        tag: "// iletişim",
        titleHtml: "Birlikte<br>inşa edelim.",
        desc: "Yeni projeler, iş birlikleri veya teknik danışmanlık için benimle iletişime geçebilirsiniz.",
        email: "E-posta",
        quote: "İş arayışım nedeniyle son zamanlarda birçok kişi benimle iletişime geçti. Aslında sıradan bir insanım — ama yaptığım işi ciddiye alıyorum. İlginiz ve sevginiz için teşekkür ederim.",
        cite: "— Öndery",
      },
      footer: {
        textHtml: '© 2026 <a href="https://github.com/ondery">Öndery</a> · İstanbul, Türkiye · <a href="https://github.com/ondery/ondery">Kaynak Kodu</a>',
      },
    },
  };

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

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const val = getNested(t, el.dataset.i18n);
      if (val !== undefined) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const val = getNested(t, el.dataset.i18nHtml);
      if (val !== undefined) el.innerHTML = val;
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const pairs = el.dataset.i18nAttr.split(";");
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(":");
        const val = getNested(t, key.trim());
        if (val !== undefined) el.setAttribute(attr.trim(), val);
      });
    });

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
      btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
    });
  }

  window.OnderyI18n = {
    translations,
    getLang,
    setLang,
    applyLanguage,
    getRoles: (lang) => translations[lang]?.roles || translations.en.roles,
  };

  applyLanguage(getLang());
})();
