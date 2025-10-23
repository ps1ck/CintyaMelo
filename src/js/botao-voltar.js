document.getElementById("voltar").addEventListener("click", function() {
  if (document.referrer) {
    history.back(); // volta para a página anterior
  } else {
    window.location.href = "/"; // se não houver página anterior, vai pro início
  }
});