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
