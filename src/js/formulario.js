/* ===== CONFIG ===== */
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwirN-1UoOde07RJUyODh0UUdYm97m_dbOlqQ9vQd9fs8h7Rfj-1V4MjWV9z5ekj5Nv/exec';
const WEB_APP_TOKEN = 'token-706c13-emails';
/* ================== */

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscribeForm');
  const message = document.getElementById('formMessage');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    message.style.color = '#333';
    message.textContent = 'Enviando...';

    const email = (form.email && form.email.value || '').trim();
    const name = (form.name && form.name.value || '').trim();

    if (!validarEmail(email)) {
      message.style.color = 'red';
      message.textContent = 'E-mail inválido.';
      return;
    }

    submitBtn.disabled = true;

    // cria um callback único para esta chamada
    const callbackName = 'jsonp_cb_' + Date.now() + '_' + Math.floor(Math.random()*1000);

    // define a função global que o JSONP irá chamar
    window[callbackName] = function(response) {
      try {
        if (response && response.success) {
          message.style.color = 'green';
          message.textContent = 'Inscrição realizada! Verifique seu e-mail.';
          form.reset();
        } else {
          message.style.color = 'red';
          message.textContent = (response && response.message) ? response.message : 'Erro no envio.';
        }
      } finally {
        // cleanup: remove o script e a função callback
        const s = document.getElementById(callbackName + '_script');
        if (s && s.parentNode) s.parentNode.removeChild(s);
        try { delete window[callbackName]; } catch(e) { window[callbackName] = undefined; }
        submitBtn.disabled = false;
      }
    };

    // monta URL segura (encode)
    const params = new URLSearchParams({
      email: email,
      name: name,
      token: WEB_APP_TOKEN,
      callback: callbackName
    });

    const script = document.createElement('script');
    script.src = WEB_APP_URL + '?' + params.toString();
    script.id = callbackName + '_script';
    script.onerror = function() {
      message.style.color = 'red';
      message.textContent = 'Erro de rede ao enviar. Tente novamente.';
      // cleanup
      try { delete window[callbackName]; } catch(e) {}
      if (script.parentNode) script.parentNode.removeChild(script);
      submitBtn.disabled = false;
    };

    // injeta script para fazer o request (JSONP)
    document.head.appendChild(script);
  });
});
