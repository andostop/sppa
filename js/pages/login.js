import { Auth } from '../auth.js';

document.getElementById('formLogin')
.addEventListener('submit', e => {

  e.preventDefault();

  const email = e.target.email.value;
  const pass  = e.target.password.value;

  const res = Auth.login(email, pass);

  if (!res.ok) {
    alert("Correo o contraseña incorrectos");
  } else {
    // 🔥 IMPORTANTE
    window.location.href = 'index.html';
  }
});