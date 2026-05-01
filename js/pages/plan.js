import { Auth } from '../auth.js';
import { SPPA_Model } from '../model.js';

const formPlan = document.getElementById('formPlan');
const formDiario = document.getElementById('formDiario');

// ==========================
// ESTADO INICIAL
// ==========================
if (Auth.tienePlan()) {
  formPlan.style.display = 'none';
  formDiario.style.display = 'block';
} else {
  formPlan.style.display = 'block';
  formDiario.style.display = 'none';
}

// ==========================
// GUARDAR PLAN PRINCIPAL
// ==========================
formPlan.addEventListener('submit', e => {

  e.preventDefault();

  const data = Object.fromEntries(new FormData(formPlan));

  // =========================================
  // GUARDAR EN PLAN + PERFIL USUARIO
  // =========================================
  Auth.actualizarSesion({
    plan_alimenticio: data,

    // datos importantes para recomendaciones
    edad: data.edad,
    sexo: data.sexo,
    peso: data.peso,
    altura: data.altura,
    tipo_dieta: data.tipo_dieta,
    region: data.region,
    preferencia_comida: data.preferencia_comida,
    alergias_salud: data.alergias_salud,
    presupuesto_dia: data.presupuesto_dia,
    objetivo: data.objetivo
  });

  alert('Plan alimenticio guardado');

  // =========================================
  // MOSTRAR SOLO FORM DIARIO
  // =========================================
  formPlan.style.display = 'none';
  formDiario.style.display = 'block';

});

// ==========================
// REGISTRO DIARIO
// ==========================
formDiario.addEventListener('submit', e => {

  e.preventDefault();

  const fecha = document.getElementById('fechaDia').value;

  const presupuesto = document
    .getElementById('presupuestoDia')
    .value;

  const ingredientes = document
    .getElementById('ingredientesDia')
    .value
    .split(',')
    .map(i => i.trim().toLowerCase())
    .filter(i => i);

  const user = Auth.getSesion();

  // =========================================
  // GENERAR RECOMENDACIONES
  // =========================================
  const recomendaciones = SPPA_Model
    .recomendar(user)
    .map(plato => {

      const matchIngredientes = plato.ingredientes.filter(i =>
        ingredientes.some(userIng =>
          userIng.includes(i)
        )
      ).length;

      return {
        ...plato,
        score_final: plato.prob + (matchIngredientes * 0.08)
      };

    })
    .sort((a,b) => b.score_final - a.score_final)
    .slice(0, 5);

  // =========================================
  // NUEVO REGISTRO
  // =========================================
  const nuevoRegistro = {
    fecha,
    presupuesto,
    ingredientes,
    recomendaciones
  };

  // =========================================
  // HISTORIAL
  // =========================================
  const historial = user.registros_diarios || [];

  // más reciente arriba
  historial.unshift(nuevoRegistro);

  // =========================================
  // GUARDAR
  // =========================================
  Auth.actualizarSesion({
    registros_diarios: historial
  });

  alert('Registro diario guardado');

  // =========================================
  // REDIRECCIÓN
  // =========================================
  window.location.href = 'recomendaciones.html';

});