document.querySelectorAll(".custom-form").forEach(form => {
  form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = this.email_address.value.trim();
    const message = this.parentElement.querySelector(".form-message");

    message.textContent = "Enviando...";
    message.style.color = "#333";

    try {
      const data = new FormData();
      data.append("email_address", email);
      data.append("api_key", "kJjkZAZY10RhyIACjw2siA");

      const res = await fetch("https://app.kit.com/forms/8699115/subscriptions", {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (res.ok) {
        message.textContent = "Sucesso! Verifique seu e-mail para confirmar a inscrição 💌";
        message.style.color = "green";
        this.reset();
      } else {
        const err = await res.json();
        message.textContent = err.message || "Ocorreu um erro. Tente novamente.";
        message.style.color = "red";
      }
    } catch (error) {
      message.textContent = "Erro de conexão. Tente novamente.";
      message.style.color = "red";
    }
  });
});