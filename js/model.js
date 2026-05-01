import { PLATOS_DB } from './data.js';

export const SPPA_Model = {

  calcularProbabilidad(plato, usuario) {

    let score = plato.frecuencia_base;

    if (plato.region.includes(usuario.region))
      score += 0.08;

    if (plato.tipo_dieta.includes(usuario.tipo_dieta))
      score += 0.1;

    return Math.min(0.99, score);
  },

  // =========================================
  // RECOMENDACIÓN GENERAL
  // =========================================
  recomendar(usuario) {

    const registros =
      usuario.registros_diarios || [];

    const ultimo =
      registros[registros.length - 1];

    return PLATOS_DB.map(plato => {

      let score =
        this.calcularProbabilidad(
          plato,
          usuario
        );

      // MATCH INGREDIENTES
      if (ultimo) {

        const matchIngredientes =
          plato.ingredientes.filter(i =>

            ultimo.ingredientes.some(userIng =>

              userIng
                .trim()
                .toLowerCase()
                .includes(i.toLowerCase())

            )

          ).length;

        score += matchIngredientes * 0.05;
      }

      return {
        ...plato,
        probabilidad_aceptacion:
          Math.min(
            0.99,
            score + (Math.random() * 0.1)
          )
      };

    })

    .sort((a,b)=>
      b.probabilidad_aceptacion -
      a.probabilidad_aceptacion
    );

  },

  // =========================================
  // NUEVA FUNCIÓN
  // RECOMENDACIÓN POR DÍA
  // =========================================
  recomendarPorRegistro(usuario, registro) {

    return PLATOS_DB.map(plato => {

      const coincidencias =
        plato.ingredientes.filter(i =>

          registro.ingredientes.some(userIng =>

            userIng
              .trim()
              .toLowerCase()
              .includes(i.toLowerCase())

          )

        ).length;

      let score =
        this.calcularProbabilidad(
          plato,
          usuario
        );

      score += coincidencias * 0.08;

      return {
        ...plato,
        score_final: score,
        coincidencias
      };

    })

    // SOLO compatibles
    .filter(p => p.coincidencias > 0)

    // ORDENAR
    .sort((a,b)=>
      b.score_final -
      a.score_final
    );

  }

};