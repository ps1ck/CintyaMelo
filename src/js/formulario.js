// Função para validar e-mail
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

document.querySelectorAll(".custom-form").forEach(form => {
  const message = form.parentElement.querySelector(".form-message");
  const submitButton = form.querySelector("button[type='submit']");

  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const emailInput = form.email_address;
    const email = emailInput.value.trim();

    // Validação do e-mail
    if (!email) {
      message.textContent = "Por favor, insira um e-mail.";
      message.style.color = "red";
      return;
    }

    if (!validarEmail(email)) {
      message.textContent = "E-mail inválido. Verifique e tente novamente.";
      message.style.color = "red";
      return;
    }

    // Mensagem de envio
    message.textContent = "Enviando...";
    message.style.color = "#333";
    submitButton.disabled = true;

    try {
      const data = {
        email: email,
        api_key: "kJjkZAZY10RhyIACjw2siA"
      };

      const res = await fetch("https://api.convertkit.com/v3/forms/8699115/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (res.ok) {
        message.textContent = "Sucesso! Verifique seu e-mail para confirmar a inscrição 💌";
        message.style.color = "green";
        form.reset();
      } else {
        message.textContent = result.message || "Ocorreu um erro. Tente novamente.";
        message.style.color = "red";
      }
    } catch (error) {
      console.error(error);
      message.textContent = "Erro de conexão. Tente novamente.";
      message.style.color = "red";
    } finally {
      submitButton.disabled = false;
    }
  });
});
