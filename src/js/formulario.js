/* ====== CONFIGURE AQUI ====== */
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyRKidivXruJWuTyhgXrVMCbmc2joAhQozQBS8XBZfIOuhISPLWqMEs9iLE_acuoBLY/exec'; // ← substitua com a URL do Apps Script (doPost)
const WEB_APP_TOKEN = 'meu_token_5j3kL9'; // ← mesma string que colocou no Apps Script
/* =========================== */

function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscribeForm');
  const message = document.getElementById('formMessage');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.style.color = '#333';

    const formData = new FormData(form);
    const email = (formData.get('email')||'').trim();
    const name = (formData.get('name')||'').trim();

    if (!email) {
      message.textContent = 'Por favor, insira um e-mail.';
      message.style.color = 'red';
      return;
    }
    if (!validarEmail(email)) {
      message.textContent = 'E-mail inválido. Verifique e tente novamente.';
      message.style.color = 'red';
      return;
    }

    submitBtn.disabled = true;
    message.textContent = 'Enviando...';

    try {
      const payload = { email: email, name: name, token: WEB_APP_TOKEN };

      const res = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors'
      });

      const json = await res.json();

      if (res.ok && json.success) {
        message.style.color = 'green';
        message.innerHTML = '<strong>Sucesso!</strong> Verifique seu e-mail (confirmação enviada).';
        form.reset();
      } else {
        message.style.color = 'red';
        message.textContent = json && json.message ? json.message : 'Ocorreu um erro. Tente novamente.';
      }
    } catch (err) {
      console.error(err);
      message.style.color = 'red';
      message.textContent = 'Erro de conexão. Tente novamente.';
    } finally {
      submitBtn.disabled = false;
    }
  });
});