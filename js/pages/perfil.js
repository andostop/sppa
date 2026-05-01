import { Auth } from '../auth.js';

const user = Auth.getSesion();

if (!user) {
  window.location.href = 'login.html';
}

// ==========================
// AVATAR Y NOMBRE
// ==========================
const avatar = document.getElementById('perfilAvatar');
const nombre = document.getElementById('perfilNombre');

const iniciales = user.nombre
  .split(' ')
  .map(n => n[0])
  .join('')
  .slice(0,2)
  .toUpperCase();

avatar.textContent = iniciales;
nombre.textContent = user.nombre;

// ==========================
// DATOS PERSONALES
// ==========================
const datos = document.getElementById('perfilDatos');

datos.innerHTML = `
  <div class="info-row">
    <span class="info-key">Correo</span>
    <span class="info-val">${user.email || '-'}</span>
  </div>
`;

// ==========================
// PLAN ALIMENTICIO
// ==========================
const planBox = document.getElementById('perfilPlan');

const plan = user.plan_alimenticio;

if (!plan) {

  planBox.innerHTML = `
    <p>Aún no tienes un plan alimenticio registrado.</p>
  `;

} else {

  planBox.innerHTML = `

    <div class="info-row">
      <span class="info-key">Edad</span>
      <span class="info-val">${plan.edad || '-'}</span>
    </div>

    <div class="info-row">
      <span class="info-key">Sexo</span>
      <span class="info-val">${plan.sexo || '-'}</span>
    </div>

    <div class="info-row">
      <span class="info-key">Peso</span>
      <span class="info-val">${plan.peso || '-'} kg</span>
    </div>

    <div class="info-row">
      <span class="info-key">Altura</span>
      <span class="info-val">${plan.altura || '-'} cm</span>
    </div>

    <div class="info-row">
      <span class="info-key">Tipo de dieta</span>
      <span class="info-val">${plan.tipo_dieta || '-'}</span>
    </div>

    <div class="info-row">
      <span class="info-key">Región</span>
      <span class="info-val">${plan.region || '-'}</span>
    </div>

    <div class="info-row">
      <span class="info-key">Objetivo</span>
      <span class="info-val">${plan.objetivo || '-'}</span>
    </div>

    <div class="info-row">
      <span class="info-key">Alergias</span>
      <span class="info-val">${plan.alergias_salud || '-'}</span>
    </div>

    <div class="info-row">
      <span class="info-key">Presupuesto diario</span>
      <span class="info-val">S/ ${plan.presupuesto_dia || '-'}</span>
    </div>

  `;
}