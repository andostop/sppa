import { PLATOS_DB } from './data.js';

export const SPPA_Model = {

  calcularProbabilidad(plato, usuario) {
    let score = plato.frecuencia_base;

    if (plato.region.includes(usuario.region)) score += 0.08;
    if (plato.tipo_dieta.includes(usuario.tipo_dieta)) score += 0.1;

    return Math.min(0.99, score);
  },

  recomendar(usuario) {

  const registros = usuario.registros_diarios || [];
  const ultimo = registros[registros.length - 1];

  return PLATOS_DB.map(plato => {

    let score = this.calcularProbabilidad(plato, usuario);

    // 🔥 MATCH INGREDIENTES (AQUÍ VA TU CÓDIGO)
    if (ultimo) {

      const matchIngredientes = plato.ingredientes.filter(i =>
        ultimo.ingredientes.some(userIng =>
          userIng.trim().toLowerCase().includes(i.toLowerCase())
        )
      ).length;

      // peso importante
      score += matchIngredientes * 0.05;
    }

    return {
      ...plato,
      probabilidad_aceptacion:
        Math.min(0.99, score + (Math.random() * 0.1))
    };

  })
  .sort((a, b) => b.probabilidad_aceptacion - a.probabilidad_aceptacion);
}

};