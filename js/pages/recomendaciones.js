import { Auth } from '../auth.js';
import { SPPA_Model } from '../model.js';

//const user = Auth.getSesion();
const getUser = () => Auth.getSesion();

const cont =
  document.getElementById('recoContainer');

// =====================================
// FORMATEAR FECHA
// =====================================
function formatearFecha(fecha) {

  const [year, month, day] = fecha.split("-");
  const f = new Date(year, month - 1, day);
  return f.toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

}

// =====================================
// GENERAR HISTORIAL
// =====================================
function generarHistorial() {

  const user = Auth.getSesion(); // SIEMPRE fresco

  if (!user?.registros_diarios?.length) {

    cont.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🍽️</div>
        <h3>No existen registros todavía</h3>
      </div>
    `;

    return;
  }

  const registros = [...user.registros_diarios].reverse();

  cont.innerHTML = registros.map(registro => {

    const recomendaciones = SPPA_Model
      .recomendarPorRegistro(user, registro)
      .slice(0, 3);

    return `
      <div class="card" style="margin-bottom:24px;">

        <h3>📅 ${formatearFecha(registro.fecha)}</h3>

        <p>
          <strong>Ingredientes:</strong>
          ${registro.ingredientes.join(', ')}
        </p>

        <div class="reco-grid">

          ${recomendaciones.map(r => `
            <div class="reco-card">
              <div class="reco-card-img">${r.emoji}</div>

              <div class="reco-card-body">
                <div class="reco-card-name">${r.nombre_plato}</div>
                <div>S/${r.precio}</div>
                <p>Compatibilidad: ${Math.round(r.score_final * 100)}%</p>
              </div>

            </div>
          `).join('')}

        </div>

      </div>
    `;

  }).join('');
}

generarHistorial();
