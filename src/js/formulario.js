/* ===== CONFIGURAÇÃO ===== */
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzNt03bmn2Gf1ELDYJDQ_scfkWgWn9hEWNdTH6y6RIFHnffJXwaS60XUaLNFZ91yEUM/exec';
const WEB_APP_TOKEN = 'meu_token_5j3kL9';
/* ======================== */

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
    message.textContent = 'Enviando...';

    const formData = new FormData(form);
    const email = (formData.get('email') || '').trim();
    const name = (formData.get('name') || '').trim();

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

    try {
      // envia via GET — compatível com o Apps Script
      const params = new URLSearchParams({
        email,
        name,
        token: WEB_APP_TOKEN
      });

      const response = await fetch(`${WEB_APP_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors', // impede bloqueio CORS
      });

      // como no-cors impede ler o JSON, mostramos sucesso simples
      message.style.color = 'green';
      message.innerHTML = '<strong>Sucesso!</strong> Verifique seu e-mail (confirmação enviada).';
      form.reset();

    } catch (err) {
      console.error(err);
      message.style.color = 'red';
      message.textContent = 'Erro de conexão. Tente novamente.';
    } finally {
      submitBtn.disabled = false;
    }
  });
});
