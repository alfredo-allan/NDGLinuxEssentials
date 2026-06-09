/**
 * NDG Linux Essentials - Agente de IA Local (Pinguim IA)
 * Comunicação Segura via API Serverless
 */

class NDGLinuxAgent {
  constructor() {
    // Define o endpoint da API dependendo se você está rodando local ou na produção (Vercel)
    this.apiEndpoint =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000/api/chat"
        : "/api/chat";

    this.modules = [
      {
        path: "/pages/modulo_1.html",
        name: "Módulo 1",
        title: "Introdução ao Linux",
      },
      {
        path: "/pages/modulo_2.html",
        name: "Módulo 2",
        title: "Sistemas Operacionais",
      },
      {
        path: "/pages/modulo_3.html",
        name: "Módulo 3",
        title: "Trabalhando em Linux",
      },
      {
        path: "/pages/modulo_4.html",
        name: "Módulo 4",
        title: "Software de Código Aberto e Licenciamento",
      },
      {
        path: "/pages/modulo_5.html",
        name: "Módulo 5",
        title: "Habilidades de Linha de Comando",
      },
      {
        path: "/pages/modulo_6.html",
        name: "Módulo 6",
        title: "Obtendo Ajuda no Linux",
      },
      {
        path: "/pages/modulo_7.html",
        name: "Módulo 7",
        title: "Navegando pelo Sistema de Arquivos",
      },
      {
        path: "/pages/modulo_8.html",
        name: "Módulo 8",
        title: "Manipulando Arquivos e Diretórios",
      },
      {
        path: "/pages/modulo_9.html",
        name: "Módulo 9",
        title: "Arquivamento e Compressão",
      },
      {
        path: "/pages/modulo_10.html",
        name: "Módulo 10",
        title: "Trabalhando com Texto",
      },
    ];

    this.init();
  }

  init() {
    this.injectStyles();
    this.injectHTML();
    this.bindEvents();
  }

  injectStyles() {
    // Busca se o estilo já foi injetado para evitar duplicidade
    if (!document.querySelector("link[href*='agent.css']")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      // O "/" no início garante que ele busque a partir da raiz na Vercel ou Localhost
      link.href = "/css/agent.css";
      document.head.appendChild(link);
    }
  }

  injectHTML() {
    const chatHTML = `
      <div id="ndgAgentToggle" class="ndg-agent-toggle">
        <i class="fas fa-robot"></i>
      </div>

      <div id="ndgAgentWindow" class="ndg-agent-window ng-hidden">
        <div class="ndg-agent-header">
          <div class="ndg-agent-brand">
            <i class="fab fa-linux"></i>
            <div class="ndg-agent-brand-info">
              <h4>Pinguim IA</h4>
              <span id="agentStatus" style="color: var(--primary)">Online - Protegido</span>
            </div>
          </div>
          <button id="ndgAgentClose" class="ndg-agent-close"><i class="fas fa-times"></i></button>
        </div>
        
        <div id="ndgAgentMessages" class="ndg-agent-messages">
          <div class="ng-msg system">
            🐧 Olá! Sou o <strong>Pinguim IA</strong>. Faça uma pergunta sobre o conteúdo dos módulos do curso e eu usarei o material local para formular uma resposta!
          </div>
        </div>

        <div class="ndg-agent-input-zone">
          <input type="text" id="ndgAgentInput" placeholder="Digite sua dúvida sobre Linux..." />
          <button id="ndgAgentSend" class="ndg-agent-send-btn"><i class="fas fa-paper-plane"></i></button>
        </div>
      </div>
    `;

    const container = document.createElement("div");
    container.id = "ndgAgentWidgetContainer";
    container.innerHTML = chatHTML;
    document.body.appendChild(container);
  }

  bindEvents() {
    const toggleBtn = document.getElementById("ndgAgentToggle");
    const windowDiv = document.getElementById("ndgAgentWindow");
    const closeBtn = document.getElementById("ndgAgentClose");
    const inputField = document.getElementById("ndgAgentInput");
    const sendBtn = document.getElementById("ndgAgentSend");

    toggleBtn.addEventListener("click", () =>
      windowDiv.classList.remove("ng-hidden")
    );
    closeBtn.addEventListener("click", () =>
      windowDiv.classList.add("ng-hidden")
    );

    sendBtn.addEventListener("click", () => this.handleUserInput());
    inputField.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleUserInput();
    });
  }

  async handleUserInput() {
    const inputField = document.getElementById("ndgAgentInput");
    const query = inputField.value.trim();
    if (!query) return;

    inputField.value = "";
    this.appendMessage(query, "user");

    const loadingId = this.appendMessage(
      "🤖 Pinguim IA está analisando os arquivos locais...",
      "loading"
    );

    // 1. Varre os módulos HTML locais para achar trechos com base na pergunta
    const context = await this.buildLocalContext(query);

    // 2. Dispara a requisição para o back-end seguro (/api/chat)
    const result = await this.fetchGemini(query, context);

    document.getElementById(loadingId)?.remove();

    if (result.success) {
      this.appendMessage(result.answer, "ai");
    } else {
      this.appendMessage(
        `⚠️ Falha no processamento: ${result.error}`,
        "system"
      );
    }
  }

  appendMessage(text, type) {
    const msgArea = document.getElementById("ndgAgentMessages");
    const msgDiv = document.createElement("div");
    const id = "msg_" + Math.random().toString(36).substr(2, 9);

    msgDiv.id = id;
    msgDiv.className = `ng-msg ${type}`;
    msgDiv.innerHTML = text.replace(/\n/g, "<br>");

    msgArea.appendChild(msgDiv);
    msgArea.scrollTop = msgArea.scrollHeight;

    return id;
  }

  async buildLocalContext(userQuery) {
    let contextChunks = [];
    const keywords = userQuery
      .toLowerCase()
      .split(" ")
      .filter((w) => w.length > 3);

    for (const mod of this.modules) {
      try {
        const response = await fetch(mod.path);
        if (!response.ok) continue;

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const elements = doc.querySelectorAll(
          "section, p, .terminal pre, .alert, h2, h3, td"
        );

        elements.forEach((el) => {
          const text = el.textContent.trim();
          const hasKeyword = keywords.some((k) =>
            text.toLowerCase().includes(k)
          );
          if (text.length > 15 && (hasKeyword || keywords.length === 0)) {
            contextChunks.push(`[${mod.name}]: ${text}`);
          }
        });
      } catch (e) {
        console.warn("Erro ao indexar página local:", e);
      }
    }
    return contextChunks.slice(0, 12).join("\n\n");
  }

  async fetchGemini(question, context) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, context }),
      });

      const data = await response.json();
      if (data.success) {
        return { success: true, answer: data.answer };
      } else {
        return { success: false, error: data.error || "Erro na requisição." };
      }
    } catch (e) {
      return {
        success: false,
        error: "Não foi possível conectar ao servidor do agente.",
      };
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.ndgLinuxAgent = new NDGLinuxAgent();
});
