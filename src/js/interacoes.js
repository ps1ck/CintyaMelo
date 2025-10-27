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

        // CURTIDAS 
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

    /* Scroll reveal usando IntersectionObserver */
    const revealTargets = [];

    // titulo acima dos artigos do index
    document.querySelectorAll('.titulos-artigos').forEach(el => revealTargets.push(el));    

    // 'Ver mais' botão no final dos artigos no index
    const verMaisBtn = document.querySelector('#artigos a');
    if (verMaisBtn) revealTargets.push(verMaisBtn);

    // pre-footer: revela todos os elementos children dele (Tudo que ta dentro dele, textos e botões), pre-footer ta no index
    const preFooter = document.querySelector('#pre-footer');
    let preFooterChildren = [];
    if (preFooter) {
        preFooterChildren = Array.from(preFooter.children);
        // mark parent so we can stagger children
        preFooter.classList.add('reveal-stagger');
        preFooterChildren.forEach(child => child.classList.add('reveal-item'));
    }

    // texto do nossa missão
    const nossaMissao = document.querySelector('.TextoNossaMissao');
    let nossaMissaoChildren = [];
    if (nossaMissao) {
        nossaMissaoChildren = Array.from(nossaMissao.children);
        nossaMissao.classList.add('reveal-stagger');
        nossaMissaoChildren.forEach(child => child.classList.add('reveal-item'));
    }

    // Adiciona reveal-item para alvos separados
    revealTargets.forEach(node => {
        if (!node.classList.contains('reveal-item')) node.classList.add('reveal-item');
    });

    // Configurando timings (muda pra configurar o comportamento)
    const REVEAL_DELAY_MS = 120; // delay pra revelar depois de entrar no viewport
    const PREFOOTER_STAGGER_MS = 150; // stagger entre o pre-footer children

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                // se o parent for pre-footer, stagger children
                if (el === preFooter) {
                    preFooterChildren.forEach((child, i) => {
                        setTimeout(() => child.classList.add('revealed'), REVEAL_DELAY_MS + i * PREFOOTER_STAGGER_MS);
                    });
                } else if (el === nossaMissao) {
                    nossaMissaoChildren.forEach((child, i) => {
                        setTimeout(() => child.classList.add('revealed'), REVEAL_DELAY_MS + i * PREFOOTER_STAGGER_MS);
                    });
                } else {
                    setTimeout(() => el.classList.add('revealed'), REVEAL_DELAY_MS);
                }
            } else {
                // remove revealed pra animação poder resetar
                if (el === preFooter) {
                    preFooterChildren.forEach(child => child.classList.remove('revealed'));
                } else if (el === nossaMissao) {
                    nossaMissaoChildren.forEach(child => child.classList.remove('revealed'));
                } else {
                    el.classList.remove('revealed');
                }
            }
        });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    // Observa parent preFooter quebrar pra stagger, e outros alvos normalmente
    if (preFooter) io.observe(preFooter);
    if (nossaMissao) io.observe(nossaMissao);
    revealTargets.forEach(node => { if (node !== preFooter) io.observe(node); });
});