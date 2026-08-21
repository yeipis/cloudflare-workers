export interface Env {}

export default {
  /**
   * HTTP handler serving a responsive, bilingual (ES/EN) "Coming Soon / Under Construction" placeholder page.
   */
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    // Extract and sanitize subdomain
    const rawSubdomain = url.hostname.split(".")[0];
    const subdomain = rawSubdomain.replace(/[^a-zA-Z0-9_-]/g, "");

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title id="meta-title">${subdomain}.yeipi.dev | In Development</title>
  <link rel="icon" type="image/svg+xml" href="https://yeipi.dev/favicon.svg" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: #0a0c10;
      color: #f1f5f9;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      -webkit-font-smoothing: antialiased;
    }
    ::selection { background-color: #d97706; color: #ffffff; }

    .card {
      background-color: rgba(18, 22, 31, 0.95);
      border: 1px solid #242b3b;
      border-radius: 1rem;
      padding: 2.5rem 2rem;
      max-width: 32rem;
      width: 100%;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
    }

    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.35rem 0.75rem;
      background-color: #181d28;
      border: 1px solid #242b3b;
      border-radius: 0.375rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: #cbd5e1;
    }
    .badge-dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 9999px;
      background-color: #fbbf24;
    }

    .lang-toggle {
      display: inline-flex;
      background-color: #181d28;
      border: 1px solid #242b3b;
      border-radius: 0.375rem;
      padding: 0.15rem;
      gap: 0.2rem;
    }
    .lang-btn {
      background: none;
      border: none;
      color: #64748b;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.2rem 0.5rem;
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .lang-btn:hover {
      color: #f1f5f9;
    }
    .lang-btn.active {
      background-color: #242b3b;
      color: #fbbf24;
    }

    h1 {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      color: #f1f5f9;
      margin-bottom: 0.75rem;
    }
    .accent { color: #fbbf24; }

    p {
      color: #94a3b8;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      justify-content: center;
      align-items: center;
    }
    @media (min-width: 640px) {
      .buttons { flex-direction: row; }
      h1 { font-size: 2.25rem; }
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: #fbbf24;
      color: #0a0c10;
      font-weight: 600;
      font-size: 0.875rem;
      padding: 0.65rem 1.25rem;
      border-radius: 0.5rem;
      text-decoration: none;
      transition: background-color 0.15s ease;
      width: 100%;
    }
    .btn-primary:hover {
      background-color: #f59e0b;
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: #181d28;
      color: #e2e8f0;
      border: 1px solid #242b3b;
      font-weight: 500;
      font-size: 0.875rem;
      padding: 0.65rem 1.25rem;
      border-radius: 0.5rem;
      text-decoration: none;
      transition: all 0.15s ease;
      width: 100%;
    }
    .btn-secondary:hover {
      background-color: #1f2533;
      border-color: #475569;
      color: #ffffff;
    }

    @media (min-width: 640px) {
      .btn-primary, .btn-secondary { width: auto; }
    }

    .footer-note {
      margin-top: 2rem;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(36, 43, 59, 0.6);
      font-size: 0.75rem;
      color: #64748b;
    }
  </style>
</head>
<body>

  <main class="card">
    <div class="top-bar">
      <!-- Badge -->
      <div class="badge">
        <span class="badge-dot"></span>
        <span id="txt-badge">In Development</span>
      </div>

      <!-- Language Selector -->
      <div class="lang-toggle" role="group" aria-label="Language selector">
        <button type="button" class="lang-btn active" id="btn-en" onclick="setLang('en')">EN</button>
        <button type="button" class="lang-btn" id="btn-es" onclick="setLang('es')">ES</button>
      </div>
    </div>

    <!-- Title -->
    <h1>${subdomain}<span class="accent">.yeipi.dev</span></h1>

    <!-- Description -->
    <p id="txt-desc">This project is currently under active construction and will be available soon.</p>

    <!-- Action Buttons -->
    <div class="buttons">
      <a href="https://yeipi.dev" class="btn-primary" id="btn-home">
        ← Back to yeipi.dev
      </a>

      <a href="https://github.com/yeipis" target="_blank" rel="noopener noreferrer" class="btn-secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="display: inline-block; flex-shrink: 0;">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        <span>GitHub</span>
      </a>
    </div>

    <!-- Footer -->
    <div class="footer-note" id="txt-footer">
      yeipi.dev • Subdomain Preview
    </div>
  </main>

  <script>
    const translations = {
      en: {
        title: "${subdomain}.yeipi.dev | In Development",
        badge: "In Development",
        desc: "This project is currently under active construction and will be available soon.",
        home: "← Back to yeipi.dev",
        footer: "yeipi.dev • Subdomain Preview"
      },
      es: {
        title: "${subdomain}.yeipi.dev | En desarrollo",
        badge: "En desarrollo",
        desc: "Este proyecto está actualmente en fase de construcción activa y estará disponible muy pronto.",
        home: "← Volver a yeipi.dev",
        footer: "yeipi.dev • Vista previa de subdominio"
      }
    };

    function setLang(lang) {
      const t = translations[lang] || translations.en;
      document.documentElement.lang = lang;
      document.title = t.title;
      document.getElementById('txt-badge').textContent = t.badge;
      document.getElementById('txt-desc').textContent = t.desc;
      document.getElementById('btn-home').textContent = t.home;
      document.getElementById('txt-footer').textContent = t.footer;

      document.getElementById('btn-en').classList.toggle('active', lang === 'en');
      document.getElementById('btn-es').classList.toggle('active', lang === 'es');

      try {
        localStorage.setItem('yeipi_lang', lang);
      } catch (e) {}
    }

    // Auto-detect browser language or saved preference
    (function initLang() {
      try {
        const saved = localStorage.getItem('yeipi_lang');
        if (saved && (saved === 'es' || saved === 'en')) {
          setLang(saved);
          return;
        }
      } catch (e) {}

      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (browserLang.startsWith('es')) {
        setLang('es');
      } else {
        setLang('en');
      }
    })();
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store",
        "x-robots-tag": "noindex, nofollow"
      }
    });
  }
};