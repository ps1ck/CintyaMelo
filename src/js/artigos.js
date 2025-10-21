document.addEventListener('DOMContentLoaded', () => {
  const botoesCompartilhar = document.querySelectorAll('.div-botao-compartilhar');

  botoesCompartilhar.forEach(container => {
    const botao = container.querySelector('.botao-compartilhar');
    const dropdown = container.querySelector('.botao-compartilhar-showdown');

    // Mostra/esconde o menu
    botao.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
    });

    // Fecha ao clicar fora
    document.addEventListener('click', () => {
      dropdown.classList.remove('show');
    });

    // Compartilhar
    dropdown.addEventListener('click', async () => {
      dropdown.classList.remove('show');

      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            text: 'Confira este artigo!',
            url: window.location.href
          });
        } catch (err) {
          console.log('Compartilhamento cancelado ou falhou:', err);
        }
      } else {
        alert('O compartilhamento não é suportado neste navegador.');
      }
    });
  });
});

const currentURL = window.location.href;
  const pageTitle = document.title;

  document.getElementById("whatsapp-share").addEventListener("click", () => {
    const text = `${pageTitle} - ${currentURL}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });

  document.getElementById("linkedin-share").addEventListener("click", () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentURL)}`;
    window.open(url, "_blank");
  });

  document.getElementById("x-share").addEventListener("click", () => {
    const text = `${pageTitle} - ${currentURL}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });

  document.getElementById("copy-link").addEventListener("click", () => {
    navigator.clipboard.writeText(currentURL)
      .then(() => alert("Link copiado para a área de transferência!"))
      .catch(() => alert("Não foi possível copiar o link."));
  });