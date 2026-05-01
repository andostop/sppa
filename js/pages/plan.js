import { Auth } from '../auth.js';

const formPlan = document.getElementById('formPlan');
const formDiario = document.getElementById('formDiario');
const btnEditar = document.getElementById('btnEditarPlan');

// ==========================
// SESION
// ==========================
const user = Auth.getSesion();

// ==========================
// SI YA EXISTE PLAN
// ==========================
if (Auth.tienePlan()) {

  formPlan.style.display = 'none';
  formDiario.style.display = 'block';
  btnEditar.style.display = 'inline-flex';

}

// ==========================
// EDITAR PLAN
// ==========================
btnEditar.addEventListener('click', () => {

  const plan = Auth.getSesion().plan_alimenticio;

  if (!plan) return;

  // ==========================
  // TOGGLE MOSTRAR / OCULTAR
  // ==========================
  const visible =
    formPlan.style.display === 'block';

  formPlan.style.display =
    visible ? 'none' : 'block';

  // ==========================
  // SI SE ESTÁ MOSTRANDO
  // ==========================
  if (!visible) {

    Object.keys(plan).forEach(key => {

      const input =
        formPlan.querySelector(`[name="${key}"]`);

      if (input) {
        input.value = plan[key];
      }

    });

  }

});

// ==========================
// GUARDAR PLAN
// ==========================
formPlan.addEventListener('submit', e => {

  e.preventDefault();

  const data = Object.fromEntries(
    new FormData(formPlan)
  );

  Auth.actualizarSesion({
    plan_alimenticio: data
  });

  alert('Plan guardado correctamente');

  formPlan.style.display = 'none';
  formDiario.style.display = 'block';
  btnEditar.style.display = 'inline-flex';

});

// ==========================
// REGISTRO DIARIO
// ==========================
formDiario.addEventListener('submit', e => {

  e.preventDefault();

  const fecha = document.getElementById('fechaDia').value;

  const presupuesto =
    document.getElementById('presupuestoDia').value;

  const ingredientes =
    document.getElementById('ingredientesDia')
    .value
    .split(',')
    .map(i => i.trim().toLowerCase())
    .filter(i => i);

  const nuevoRegistro = {
    fecha,
    presupuesto,
    ingredientes
  };

  const historial = user.registros_diarios || [];

  historial.push(nuevoRegistro);

  Auth.actualizarSesion({
    registros_diarios: historial
  });

  alert('Registro guardado');

  window.location.href =
    'recomendaciones.html';

});