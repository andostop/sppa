export const Auth = {

  getUsuarios: () =>
    JSON.parse(localStorage.getItem('sppa_usuarios') || '[]'),

  guardarUsuarios: (u) =>
    localStorage.setItem('sppa_usuarios', JSON.stringify(u)),

  registrar: (datos) => {
    const usuarios = Auth.getUsuarios();

    if (usuarios.find(x => x.email === datos.email)) {
      return { ok:false, msg:'Correo ya existe' };
    }

    const user = {
      ...datos,
      id_usuario: 'USR_' + Date.now(),
      historial_comidas: [],
      puntos_favoritismo: {},
      plan_alimenticio: null // 👈 NUEVO (clave importante)
    };

    usuarios.push(user);
    Auth.guardarUsuarios(usuarios);

    return { ok:true, usuario:user };
  },

  login: (email, pass) => {
    const u = Auth.getUsuarios()
      .find(x => x.email === email && x.password === pass);

    if (!u) return { ok:false };

    localStorage.setItem('sppa_sesion', JSON.stringify(u));
    return { ok:true, usuario:u };
  },

  getSesion: () =>
    JSON.parse(localStorage.getItem('sppa_sesion') || 'null'),

  logout: () => {
    localStorage.removeItem('sppa_sesion');
    location.href = 'index.html';
  },

  // ===========================================
  // 🆕 NUEVO: actualizar usuario y sesión
  // ===========================================
  actualizarSesion: (datos) => {
  const sesion = Auth.getSesion();
  if (!sesion) return;

  const nueva = { ...sesion, ...datos };
  localStorage.setItem('sppa_sesion', JSON.stringify(nueva));

  const usuarios = Auth.getUsuarios();
  const i = usuarios.findIndex(u => u.id_usuario === sesion.id_usuario);

  if (i !== -1) {
    usuarios[i] = { ...usuarios[i], ...datos };
    Auth.guardarUsuarios(usuarios);
    }

    return nueva;
  },

  // ===========================================
  // 🆕 NUEVO: validar si tiene plan alimenticio
  // ===========================================
  tienePlan: () => {
    const sesion = Auth.getSesion();
    return sesion && sesion.plan_alimenticio;
  }

};