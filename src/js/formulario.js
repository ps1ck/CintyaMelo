/* ===== CONFIG ===== */
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyRO4JIN8NmKXi6cHyrvGV2I0pEfMJ1fAL5EaaH0fgoMK1owISXOqdsrqydIjveOk_U/exec';
const WEB_APP_TOKEN = 'meu_token_5j3kL9';
/* ================== */

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscribeForm');
  const message = document.getElementById('formMessage');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    message.textContent = 'Enviando...';
    message.style.color = '#333';

    const email = form.email.value.trim();
    const name = form.name.value.trim();

    if (!validarEmail(email)) {
      message.textContent = 'E-mail inválido.';
      message.style.color = 'red';
      return;
    }

    submitBtn.disabled = true;

    try {
      // Envio via método POST (recomendado pelo Apps Script)
      const response = await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          token: WEB_APP_TOKEN
        })
      });

      const json = await response.json();

      if (json.success) {
        message.textContent = 'Inscrição realizada com sucesso! Verifique seu e-mail.';
        message.style.color = 'green';
        form.reset();
      } else {
        message.textContent = json.message || 'Erro ao enviar dados.';
        message.style.color = 'red';
      }

    } catch (err) {
      message.textContent = 'Erro de conexão. Tente novamente.';
      message.style.color = 'red';
      console.error(err);
    } finally {
      submitBtn.disabled = false;
    }
  });
});
