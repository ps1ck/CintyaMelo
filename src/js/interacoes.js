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

    /* Scroll reveal using IntersectionObserver */
    const revealTargets = [];

    // titulos-artigos (reveal from bottom)
    document.querySelectorAll('.titulos-artigos').forEach(el => revealTargets.push(el));    

    // 'Ver mais' button at the end of artigos
    const verMaisBtn = document.querySelector('#artigos a');
    if (verMaisBtn) revealTargets.push(verMaisBtn);

    // pre-footer: reveal all children with a stagger
    const preFooter = document.querySelector('#pre-footer');
    let preFooterChildren = [];
    if (preFooter) {
        preFooterChildren = Array.from(preFooter.children);
        // mark parent so we can stagger children
        preFooter.classList.add('reveal-stagger');
        preFooterChildren.forEach(child => child.classList.add('reveal-item'));
    }

    // TextoNossaMissao: reveal all children with a stagger (same behavior as pre-footer)
    const nossaMissao = document.querySelector('.TextoNossaMissao');
    let nossaMissaoChildren = [];
    if (nossaMissao) {
        nossaMissaoChildren = Array.from(nossaMissao.children);
        nossaMissao.classList.add('reveal-stagger');
        nossaMissaoChildren.forEach(child => child.classList.add('reveal-item'));
    }

    // Add reveal-item to single targets
    revealTargets.forEach(node => {
        if (!node.classList.contains('reveal-item')) node.classList.add('reveal-item');
    });

    // Configurable timings (change these to tune behavior)
    const REVEAL_DELAY_MS = 120; // delay before reveal after entering viewport
    const PREFOOTER_STAGGER_MS = 150; // stagger between pre-footer children

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;
            if (entry.isIntersecting) {
                // if parent is pre-footer, stagger children
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
                // remove revealed so the animation can reset when re-entering
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

    // Observe parent preFooter wrapper for stagger, and other targets normally
    if (preFooter) io.observe(preFooter);
    if (nossaMissao) io.observe(nossaMissao);
    revealTargets.forEach(node => { if (node !== preFooter) io.observe(node); });

});
