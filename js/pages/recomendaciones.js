import { Auth } from '../auth.js';
import { SPPA_Model } from '../model.js';

const user = Auth.getSesion();

const cont =
  document.getElementById('recoContainer');

// =====================================
// FORMATEAR FECHA
// =====================================
function formatearFecha(fecha) {

  const f = new Date(fecha);

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

  if (
    !user ||
    !user.registros_diarios ||
    user.registros_diarios.length === 0
  ) {

    cont.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🍽️</div>
        <h3>No existen registros todavía</h3>
      </div>
    `;

    return;
  }

  // MÁS RECIENTE ARRIBA
  const registros =
    [...user.registros_diarios]
    .reverse();

  cont.innerHTML =
    registros.map(registro => {

      // recomendaciones del día
      const recomendaciones =
        SPPA_Model
          .recomendarPorRegistro(
            user,
            registro
          )
          .slice(0,3);

      return `

        <div class="card" style="margin-bottom:24px;">

          <h3 style="margin-bottom:12px;">
            📅 ${formatearFecha(registro.fecha)}
          </h3>

          <p style="margin-bottom:18px;">
            <strong>Ingredientes registrados:</strong>
            ${registro.ingredientes.join(', ')}
          </p>

          <div class="reco-grid">

            ${recomendaciones.map(r => `

              <div class="reco-card">

                <div class="reco-card-img">
                  ${r.emoji}
                </div>

                <div class="reco-card-body">

                  <div class="reco-card-name">
                    ${r.nombre_plato}
                  </div>

                  <div class="reco-precio">
                    S/${r.precio}
                  </div>

                  <p style="margin-top:10px;">
                    Compatibilidad:
                    ${Math.round(r.score_final * 100)}%
                  </p>

                </div>

              </div>

            `).join('')}

          </div>

        </div>

      `;

    }).join('');

}

generarHistorial();