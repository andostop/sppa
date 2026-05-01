import { Auth } from './auth.js';

export function renderNavbar(paginaActual = '') {

  const sesion = Auth.getSesion();
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const links = [
    { href: 'index.html', label: 'Inicio' },
    { href: 'dashboard.html', label: 'Mi Actividad', auth: true },
    { href: 'recomendaciones.html', label: 'Recomendaciones', auth: true },
    { href: 'plan.html', label: 'Plan Alimenticio', auth: true } // 👈 NUEVO
  ];

  const linksHTML = links
    .filter(l => !l.auth || sesion)
    .map(l => `
      <a href="${l.href}" class="nav-link ${l.href === paginaActual ? 'active' : ''}">
        ${l.label}
      </a>
    `)
    .join('');

  let authHTML = '';

  if (sesion) {
    const iniciales = sesion.nombre
      ? sesion.nombre.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()
      : 'U';

    authHTML = `
      <div class="user-menu-wrap">
        <button class="user-btn" id="userBtn">
          <div class="user-avatar">${iniciales}</div>
          <span class="user-name">${sesion.nombre.split(' ')[0]}</span>
          <span class="hamburger">☰</span>
        </button>

        <div class="dropdown-menu" id="dropdownMenu">
          <a href="perfil.html" class="dropdown-item">👤 Perfil</a>
          <div class="dropdown-divider"></div>
          <div class="dropdown-item danger" id="logoutBtn">🚪 Cerrar sesión</div>
        </div>
      </div>
    `;
  } else {
    authHTML = `
      <a href="login.html" class="btn btn-secondary">Ingresar</a>
      <a href="registro.html" class="btn btn-primary">Registro</a>
    `;
  }

  nav.innerHTML = `
    <a href="index.html" class="navbar-brand">
      <div class="logo-dot">🌿</div>
      SPPA
    </a>

    <div class="navbar-links">
      ${linksHTML}
    </div>

    <div style="display:flex;gap:10px;">
      ${authHTML}
    </div>
  `;

  // 🔽 MENU DROPDOWN
  const userBtn = document.getElementById('userBtn');
  const dropMenu = document.getElementById('dropdownMenu');

  if (userBtn && dropMenu) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropMenu.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      dropMenu.classList.remove('open');
    });
  }

  // 🔽 LOGOUT
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', Auth.logout);
  }
}