import { Auth } from '../auth.js';

export function initIndex() {
  const sesion = Auth.getSesion();

  // BOTÓN FINAL
  const cta = document.getElementById('ctaFinal');

  if (cta) {
    if (sesion) {
      cta.textContent = 'Iniciar plan alimenticio →';
      cta.href = 'plan.html';
    } else {
      cta.textContent = 'Crear mi perfil alimentario →';
      cta.href = 'registro.html';
    }
  }

  // BOTONES HERO (si existen)
  const heroBtns = document.querySelectorAll('[data-auth]');

  heroBtns.forEach(btn => {
    if (sesion) {
      btn.style.display = 'none';
    }
  });
}