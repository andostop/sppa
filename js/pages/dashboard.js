import { Auth } from '../auth.js';

const user = Auth.getSesion();

const registros = user?.registros_diarios || [];

// =========================================
// DATOS SEMANALES
// =========================================
const semana = registros.slice(0,7);

// =========================================
// DATOS MENSUALES
// =========================================
const mes = registros.slice(0,30);

// =========================================
// CONTAR INGREDIENTES
// =========================================
function contarIngredientes(data){

  const count = {};

  data.forEach(r => {

    r.ingredientes.forEach(i => {

      count[i] = (count[i] || 0) + 1;

    });

  });

  return count;
}

// =========================================
// SEMANAL
// =========================================
const semanalCount = contarIngredientes(semana);

new Chart(document.getElementById('chartSemanaBar'), {

  type: 'bar',

  data: {
    labels: Object.keys(semanalCount),
    datasets: [{
      label: 'Frecuencia',
      data: Object.values(semanalCount)
    }]
  },

  options:{
    responsive:true,
    maintainAspectRatio:false
  }

});

new Chart(document.getElementById('chartSemanaPie'), {

  type: 'pie',

  data: {
    labels: Object.keys(semanalCount),
    datasets: [{
      data: Object.values(semanalCount)
    }]
  },

  options:{
    responsive:true,
    maintainAspectRatio:false
  }

});

// =========================================
// MENSUAL
// =========================================
const mensualCount = contarIngredientes(mes);

new Chart(document.getElementById('chartMesBar'), {

  type: 'bar',

  data: {
    labels: Object.keys(mensualCount),
    datasets: [{
      label: 'Frecuencia',
      data: Object.values(mensualCount)
    }]
  },

  options:{
    responsive:true,
    maintainAspectRatio:false
  }

});

new Chart(document.getElementById('chartMesPie'), {

  type: 'pie',

  data: {
    labels: Object.keys(mensualCount),
    datasets: [{
      data: Object.values(mensualCount)
    }]
  },

  options:{
    responsive:true,
    maintainAspectRatio:false
  }

});