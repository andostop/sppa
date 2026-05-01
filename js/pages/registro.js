import { Auth } from '../auth.js';

document.getElementById('formRegistro')
.addEventListener('submit', e => {

  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  const res = Auth.registrar(data);

  if (!res.ok) {
    alert(res.msg);
  } else {
    location.href = 'login.html';
  }

});