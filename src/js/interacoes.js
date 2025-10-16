document.addEventListener("DOMContentLoaded", function () {
    const artigos = document.querySelectorAll(".artigo");

    artigos.forEach((artigo) => {
        const artigoId = artigo.getAttribute("data-id");
        const link = artigo.getAttribute("data-link");

        const viewKey = `views-${artigoId}`;
        const likeKey = `likes-${artigoId}`;
        const likedKey = `liked-${artigoId}`;

        const interactionEl = artigo.querySelector(".interactions");
        const viewCountEl = artigo.querySelector(".view-count");
        const likeCountEl = artigo.querySelector(".like-count");
        const likeArea = artigo.querySelector(".like-area");

        // CURTIDAS (mesmo comportamento anterior)
        let likes = parseInt(localStorage.getItem(likeKey)) || 0;
        let liked = localStorage.getItem(likedKey) === "true";

        likeCountEl.textContent = likes;
        if (liked) likeArea.classList.add("liked");

        likeArea.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita redirecionamento

            liked = !liked;

            if (liked) {
                likes++;
                likeArea.classList.add("liked");
            } else {
                likes = Math.max(0, likes - 1);
                likeArea.classList.remove("liked");
            }

            localStorage.setItem(likeKey, likes);
            localStorage.setItem(likedKey, liked);
            likeCountEl.textContent = likes;
        });

        // Impede clique nas visualizações também
        const viewsEl = artigo.querySelector(".view-count");
        viewsEl.addEventListener("click", (e) => e.stopPropagation());

        // Clique no artigo redireciona e marca visualização
        artigo.addEventListener("click", () => {
            // Ao clicar, salva +1 visualização para esse artigo
            let views = parseInt(localStorage.getItem(viewKey)) || 0;
            views++;
            localStorage.setItem(viewKey, views);
            viewCountEl.innerHTML = `${views} <span class="views">Visualizações</span>`;
            // Vai para a página do artigo
            window.location.href = link;
        });

        // Atualiza visualização no card ao abrir a página principal
        let currentViews = localStorage.getItem(viewKey) || 0;
        viewCountEl.innerHTML = `${currentViews} <span class="views">Visualizações</span>`;
    });
});
