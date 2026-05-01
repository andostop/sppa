import { Auth } from '../auth.js';

const user = Auth.getSesion();

const cont = document.querySelector('.perfil-cards-grid');

if (user && user.plan_alimenticio) {

  const plan = user.plan_alimenticio;

  cont.innerHTML += `
    <div class="card">
      <h3>🥗 Plan Alimenticio</h3>

      <div class="info-row">
        <span class="info-key">Dieta</span>
        <span class="info-val">${plan.tipo_dieta || '-'}</span>
      </div>

      <div class="info-row">
        <span class="info-key">Región</span>
        <span class="info-val">${plan.region || '-'}</span>
      </div>

      <div class="info-row">
        <span class="info-key">Presupuesto</span>
        <span class="info-val">S/${plan.presupuesto_dia || '-'}</span>
      </div>

      <div class="info-row">
        <span class="info-key">Objetivo</span>
        <span class="info-val">${plan.objetivo || '-'}</span>
      </div>
    </div>
  `;
}