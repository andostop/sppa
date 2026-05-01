import { Auth } from '../auth.js';
import { SPPA_Model } from '../model.js';

const user = Auth.getSesion();

function generarRecomendaciones() {
  if (!user || !user.registros_diarios || user.registros_diarios.length === 0) return;

  const ultimo = user.registros_diarios.slice(-1)[0];

  const recos = SPPA_Model.recomendar(user);

  // 🔥 MATCH POR INGREDIENTES (MEJORADO)
  const resultados = recos.map(plato => {

    const match = plato.ingredientes.filter(i =>
      ultimo.ingredientes.some(userIng =>
        userIng.trim().toLowerCase().includes(i.toLowerCase())
      )
    ).length;

    return {
      ...plato,
      score_final: plato.probabilidad_aceptacion + (match * 0.05)
    };
  })
  .sort((a,b)=>b.score_final - a.score_final)
  .slice(0,6); // top 6

  guardarHistorial(resultados);
  render(resultados);
}

function guardarHistorial(recos) {
  const historial = user.historial_recomendaciones || [];

  historial.push({
    fecha: new Date().toISOString(),
    platos: recos
  });

  Auth.actualizarSesion({ historial_recomendaciones: historial });
}

function render(recos) {
  const cont = document.getElementById('recoContainer');

  cont.innerHTML = recos.map(r => `
    <div class="card">
      <h3>${r.emoji} ${r.nombre_plato}</h3>
      <p>Score: ${Math.round(r.score_final * 100)}%</p>
      <p>Precio: S/${r.precio}</p>
    </div>
  `).join('');
}

generarRecomendaciones();