import { renderNavbar } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const pagina = location.pathname.split('/').pop();
  renderNavbar(pagina);
});