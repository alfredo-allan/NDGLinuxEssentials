class NDGLinuxSearch {
  constructor() {
    // Lista de todos os módulos/páginas - AJUSTADO com o caminho correto
    this.pages = [
      {
        path: "pages/modulo_1.html",
        name: "Módulo 1",
        title: "Introdução ao Linux",
      },
      {
        path: "pages/modulo_2.html",
        name: "Módulo 2",
        title: "Sistemas Operacionais",
      },
      {
        path: "pages/modulo_3.html",
        name: "Módulo 3",
        title: "Trabalhando em Linux",
      },
      {
        path: "pages/modulo_4.html",
        name: "Módulo 4",
        title: "Software de Código Aberto e Licenciamento",
      },
      {
        path: "pages/modulo_5.html",
        name: "Módulo 5",
        title: "Habilidades de Linha de Comando",
      },
      {
        path: "pages/modulo_6.html",
        name: "Módulo 6",
        title: "Obtendo Ajuda no Linux",
      },
      {
        path: "pages/modulo_7.html",
        name: "Módulo 7",
        title: "Navegando pelo Sistema de Arquivos",
      },
      {
        path: "pages/modulo_8.html",
        name: "Módulo 8",
        title: "Manipulando Arquivos e Diretórios",
      },
      {
        path: "pages/modulo_9.html",
        name: "Módulo 9",
        title: "Arquivamento e Compressão",
      },
      {
        path: "pages/modulo_10.html",
        name: "Módulo 10",
        title: "Trabalhando com Texto",
      },
      {
        path: "pages/modulo_11.html",
        name: "Módulo 11",
        title: "Scripting Básico",
      },
      {
        path: "pages/modulo_12.html",
        name: "Módulo 12",
        title: "Hardware do Computador",
      },
      // Adicione novos módulos aqui:
      // { path: "pages/modulo_11.html", name: "Módulo 11", title: "Título" },
    ];

    this.searchTimeout = null;
    this.init();
  }

  init() {
    const searchInput = document.getElementById("ndgGlobalSearch");
    const resultsDiv = document.getElementById("ndgSearchResults");
    const statsSpan = document.getElementById("searchStatsResults");
    const statusSpan = document.getElementById("searchStatus");
    const modulesCount = document.getElementById("searchModulesCount");

    if (!searchInput) {
      console.error("❌ Elemento 'ndgGlobalSearch' não encontrado!");
      return;
    }

    console.log("✅ Motor de busca iniciado!");
    modulesCount.textContent = this.pages.length + " módulos";

    searchInput.addEventListener("input", (e) => {
      clearTimeout(this.searchTimeout);
      const term = e.target.value.trim();
      console.log(`🔍 Buscando por: "${term}"`);

      if (term.length < 2) {
        resultsDiv.innerHTML = "";
        statsSpan.textContent = "0";
        statusSpan.innerHTML =
          '<i class="fas fa-check-circle"></i> aguardando...';
        return;
      }

      resultsDiv.innerHTML =
        '<div class="cybersec-loading"><i class="fas fa-spinner fa-spin"></i> varrendo todos os módulos...</div>';
      statusSpan.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> buscando...';

      this.searchTimeout = setTimeout(() => {
        this.performSearch(term);
      }, 500);
    });

    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        clearTimeout(this.searchTimeout);
        const term = e.target.value.trim();
        if (term.length >= 2) {
          this.performSearch(term);
        }
      }
    });
  }

  async performSearch(term) {
    const resultsDiv = document.getElementById("ndgSearchResults");
    const statsSpan = document.getElementById("searchStatsResults");
    const statusSpan = document.getElementById("searchStatus");

    const searchTerm = term.toLowerCase();
    let allResults = [];
    let modulesSearched = 0;

    console.log(`🚀 Iniciando busca por: "${searchTerm}"`);

    for (const page of this.pages) {
      try {
        console.log(`📄 Buscando em: ${page.path}`);
        const response = await fetch(page.path);

        if (!response.ok) {
          console.warn(
            `⚠️ Página não encontrada: ${page.path} - Status: ${response.status}`
          );
          modulesSearched++;
          continue;
        }

        const html = await response.text();
        console.log(`✅ Página carregada: ${page.path} (${html.length} bytes)`);

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const contentElements = doc.querySelectorAll(
          "section, .card, p, h1, h2, h3, h4, .section-title, .terminal pre, .alert"
        );

        console.log(
          `📑 Encontrados ${contentElements.length} elementos para buscar em ${page.path}`
        );

        contentElements.forEach((element) => {
          const text = element.textContent.trim();
          if (text.toLowerCase().includes(searchTerm)) {
            console.log(`🎯 Encontrado termo em ${page.path}`);
            const index = text.toLowerCase().indexOf(searchTerm);
            const start = Math.max(0, index - 40);
            const end = Math.min(text.length, index + searchTerm.length + 40);
            let snippet = text.substring(start, end);

            if (start > 0) snippet = "..." + snippet;
            if (end < text.length) snippet = snippet + "...";

            const regex = new RegExp(`(${searchTerm})`, "gi");
            snippet = snippet.replace(regex, "<mark>$1</mark>");

            let anchorId = element.id || element.closest("[id]")?.id || "";

            allResults.push({
              moduleName: page.name,
              moduleTitle: page.title,
              path: page.path + (anchorId ? "#" + anchorId : ""),
              snippet: snippet.substring(0, 250),
            });
          }
        });

        modulesSearched++;
        statusSpan.innerHTML = `<i class="fas fa-spinner fa-spin"></i> buscando... (${modulesSearched}/${this.pages.length})`;
      } catch (error) {
        console.error(`❌ Erro ao buscar ${page.path}:`, error);
        modulesSearched++;
      }
    }

    console.log(
      `📊 Busca concluída. Total de resultados: ${allResults.length}`
    );
    statsSpan.textContent = allResults.length;
    statusSpan.innerHTML = '<i class="fas fa-check-circle"></i> concluído';

    if (allResults.length === 0) {
      resultsDiv.innerHTML = `
        <div class="cybersec-no-results">
          <i class="fas fa-search"></i>
          <p>Nenhum resultado encontrado para "<strong>${term}</strong>"</p>
          <p style="font-size: 0.8rem; color: #666">Tente outros termos: kernel, CLI, Debian, Ubuntu, sistema operacional, Windows, macOS</p>
        </div>
      `;
      return;
    }

    let html = "";
    allResults.forEach((result) => {
      html += `
        <div class="cybersec-result-item" onclick="window.location.href='${result.path}'">
          <div>
            <span class="cybersec-result-module">${result.moduleName}</span>
            <span style="color: #666; font-size: 0.7rem">${result.moduleTitle}</span>
          </div>
          <div class="cybersec-result-snippet">${result.snippet}</div>
          <div class="cybersec-result-meta">
            <span><i class="fas fa-link"></i> ${result.moduleName} - clique para acessar</span>
          </div>
        </div>
      `;
    });

    resultsDiv.innerHTML = html;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("🐧 NDG Linux Essentials - Motor de busca carregado!");
  new NDGLinuxSearch();
});
