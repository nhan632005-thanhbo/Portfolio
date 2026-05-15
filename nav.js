/* ============================================================
   nav.js — Navbar dùng chung cho toàn bộ portfolio
   Cách dùng: thêm <script src="nav.js"></script>
   vào cuối <body> của mỗi trang
   ============================================================ */

(function () {

  /* ── 1. INJECT CSS ── */
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,300&family=DM+Sans:wght@400;500;600&display=swap');

    #main-nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      height: 64px;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 48px;
      background: rgba(248,245,240,0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(26,24,22,0.1);
      box-sizing: border-box;
    }

    .nav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 18px;
      font-weight: 600;
      color: #1a1816;
      text-decoration: none;
      letter-spacing: -0.3px;
      white-space: nowrap;
    }

    .nav-logo span {
      font-style: italic;
      font-weight: 300;
      color: #1a3a5c;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
      list-style: none;
      margin: 0; padding: 0;
    }

    .nav-links a {
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 500;
      letter-spacing: 0.06em;
      color: #8a8680;
      text-decoration: none;
      padding: 7px 18px;
      border-radius: 100px;
      border: 1px solid transparent;
      transition: all 0.22s;
      white-space: nowrap;
    }

    .nav-links a:hover {
      color: #1a1816;
      border-color: rgba(26,24,22,0.1);
      background: rgba(26,24,22,0.04);
    }

    .nav-links a.nav-active {
      color: #1a3a5c;
      border-color: rgba(26,58,92,0.2);
      background: rgba(26,58,92,0.06);
      font-weight: 600;
    }

    .nav-links a.nav-cta {
      background: #1a3a5c;
      color: white !important;
      border-color: #1a3a5c;
      font-weight: 600;
    }

    .nav-links a.nav-cta:hover {
      background: #1a1816;
      border-color: #1a1816;
    }

    /* Hamburger */
    .nav-hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 8px;
      background: none;
      border: none;
    }

    .nav-hamburger span {
      display: block;
      width: 22px;
      height: 1.5px;
      background: #1a1816;
      border-radius: 2px;
      transition: all 0.3s;
    }

    .nav-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
    .nav-hamburger.open span:nth-child(2) { opacity: 0; }
    .nav-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

    /* Mobile menu */
    #nav-mobile-menu {
      display: none;
      position: fixed;
      top: 64px; left: 0; right: 0;
      background: rgba(248,245,240,0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: 16px 32px 24px;
      z-index: 999;
      border-bottom: 1px solid rgba(26,24,22,0.1);
      flex-direction: column;
      gap: 0;
    }

    #nav-mobile-menu.open { display: flex; }

    #nav-mobile-menu a {
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #8a8680;
      text-decoration: none;
      padding: 12px 0;
      border-bottom: 1px solid rgba(26,24,22,0.08);
      transition: color 0.2s;
    }

    #nav-mobile-menu a:last-child { border-bottom: none; }
    #nav-mobile-menu a:hover { color: #1a3a5c; }
    #nav-mobile-menu a.nav-active { color: #1a3a5c; font-weight: 700; }

    /* Push body down */
    body { padding-top: 64px !important; }

    @media (max-width: 860px) {
      #main-nav { padding: 0 24px; }
      .nav-links { display: none !important; }
      .nav-hamburger { display: flex; }
    }

    @media (max-width: 480px) {
      #main-nav { padding: 0 20px; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── 2. INJECT HTML ── */
  const navHTML = `
    <nav id="main-nav">
      <a href="index.html" class="nav-logo">Thanh<span>Nhàn</span></a>

      <ul class="nav-links">
        <li><a href="about-me.html">About me</a></li>
        <li><a href="skills.html">Skills</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="events.html">Events</a></li>
        <li><a href="contact.html" class="nav-cta">Contact</a></li>
      </ul>

      <button class="nav-hamburger" id="navHamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>

    <div id="nav-mobile-menu">
      <a href="about-me.html">About me</a>
      <a href="skills.html">Skills</a>
      <a href="projects.html">Projects</a>
      <a href="events.html">Events</a>
      <a href="contact.html">Contact</a>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', navHTML);

  /* ── 3. ACTIVE LINK ── */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#main-nav .nav-links a, #nav-mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === currentPage) {
      a.classList.add('nav-active');
    }
  });

  /* ── 4. HAMBURGER LOGIC ── */
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('nav-mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

})();
