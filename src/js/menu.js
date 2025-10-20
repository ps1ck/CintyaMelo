document.addEventListener("DOMContentLoaded", () => {
    const btnHamburger = document.getElementById("btn-hamburger");
    const sideMenu = document.getElementById("side-menu");
    const sideMenuClose = document.getElementById("side-menu-close");

    if (!btnHamburger || !sideMenu) return; // evita erros se faltar o menu em alguma página

    // cria o overlay uma única vez
    let overlay = document.querySelector(".side-menu-overlay");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "side-menu-overlay";
        document.body.appendChild(overlay);
    }

    function openMenu() {
        sideMenu.classList.add("open");
        overlay.classList.add("visible");
        btnHamburger.setAttribute("aria-expanded", "true");
        sideMenu.setAttribute("aria-hidden", "false");

        const firstLink = sideMenu.querySelector("a");
        if (firstLink) firstLink.focus();
    }

    function closeMenu() {
        sideMenu.classList.remove("open");
        overlay.classList.remove("visible");
        btnHamburger.setAttribute("aria-expanded", "false");
        sideMenu.setAttribute("aria-hidden", "true");
        btnHamburger.focus();
    }

    btnHamburger.addEventListener("click", () => {
        const isOpen = sideMenu.classList.contains("open");
        if (isOpen) closeMenu(); else openMenu();
    });

    if (sideMenuClose) sideMenuClose.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    sideMenu.addEventListener("click", (e) => {
        if (e.target.tagName === "A") closeMenu();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && sideMenu.classList.contains("open")) closeMenu();
    });

    // rolagem suave para âncoras internas
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (ev) => {
            const href = link.getAttribute("href");
            if (href && href.startsWith("#") && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    ev.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    history.replaceState(null, "", href);
                    closeMenu();
                }
            }
        });
    });
});
