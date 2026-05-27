// ============================================ //
// MENU LATERAL - NDG LINUX ESSENTIALS         //
// ============================================ //

class SidebarMenu {
  constructor() {
    this.sidebar = document.getElementById("sidebar");
    this.overlay = document.getElementById("sidebarOverlay");
    this.openBtn = document.getElementById("openMenu");
    this.closeBtn = document.getElementById("closeMenu");
    this.init();
  }

  init() {
    if (!this.sidebar) return;

    // Abrir menu
    if (this.openBtn) {
      this.openBtn.addEventListener("click", () => {
        this.open();
      });
    }

    // Fechar menu
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => {
        this.close();
      });
    }

    // Fechar ao clicar no overlay
    if (this.overlay) {
      this.overlay.addEventListener("click", () => {
        this.close();
      });
    }

    // Fechar ao pressionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.sidebar.classList.contains("open")) {
        this.close();
      }
    });

    // Fechar ao clicar em um link do menu (opcional)
    const links = document.querySelectorAll(".nav-modules a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        this.close();
      });
    });
  }

  open() {
    this.sidebar.classList.add("open");
    this.overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  close() {
    this.sidebar.classList.remove("open");
    this.overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  new SidebarMenu();
});
