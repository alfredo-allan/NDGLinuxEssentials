class NDGLinuxAgent {
  constructor() {
    if (window.__ndgAgentInitialized) {
      return;
    }
    window.__ndgAgentInitialized = true;

    this.apiEndpoint = "http://localhost:3000/api/chat";
    this.isLoading = false;

    this.init();
  }

  init() {
    // this.injectStyles();
    this.injectHTML();
    this.bindEvents();
  }

  injectStyles() {
    if (!document.querySelector("link[href*='agent.css']")) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "./css/agent.css";
      document.head.appendChild(link);
    }
  }

  injectHTML() {
    if (document.getElementById("ndgAgentWidgetContainer")) {
      return;
    }

    const container = document.createElement("div");
    container.id = "ndgAgentWidgetContainer";

    container.innerHTML = `
      <div id="ndgAgentToggle" class="ndg-agent-toggle">
        <i class="fas fa-robot"></i>
      </div>

      <div id="ndgAgentWindow" class="ndg-agent-window">
        <div class="ndg-agent-header">
          <div class="ndg-agent-brand">
            <i class="fab fa-linux"></i>
            <div class="ndg-agent-brand-info">
              <h4>Pinguim IA</h4>
              <span id="agentStatus">Online • Ollama</span>
            </div>
          </div>
          <button id="ndgAgentClose" class="ndg-agent-close">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div id="ndgAgentMessages" class="ndg-agent-messages">
          <div class="ng-msg system">
            🐧 Olá! Sou o <strong>Pinguim IA</strong>.<br>
            Faça perguntas sobre Linux Essentials.
          </div>
        </div>

        <div class="ndg-agent-input-zone">
          <input
            type="text"
            id="ndgAgentInput"
            placeholder="Digite sua dúvida..."
            autocomplete="off"
          />
          <button id="ndgAgentSend" class="ndg-agent-send-btn">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(container);
  }

  bindEvents() {
    const toggleBtn = document.getElementById("ndgAgentToggle");
    const windowDiv = document.getElementById("ndgAgentWindow");
    const closeBtn = document.getElementById("ndgAgentClose");
    const inputField = document.getElementById("ndgAgentInput");
    const sendBtn = document.getElementById("ndgAgentSend");

    // 🟢 AÇÃO DE ABRIR
    toggleBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      windowDiv.classList.add("ng-active");
    };

    // 🟢 AÇÃO DE FECHAR SIMPLES E DIRETA (SEM BARREIRAS ASSASSINAS)
    closeBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      windowDiv.classList.remove("ng-active");
    };

    // 🟢 CLIQUE FORA: Se clicar no fundo do site (fora do widget), não faz nada.
    // Mas garante que cliques dentro do modal não se espalhem para a busca global
    windowDiv.onclick = (e) => {
      e.stopPropagation();
    };

    // Enviar no botão de papel de carta
    sendBtn.onclick = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      this.handleUserInput();
    };

    // Enviar ao pressionar Enter no teclado
    inputField.onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        this.handleUserInput();
      }
    };
  }

  async handleUserInput() {
    if (this.isLoading) {
      return;
    }

    const inputField = document.getElementById("ndgAgentInput");
    const sendBtn = document.getElementById("ndgAgentSend");

    if (!inputField || !sendBtn) return;

    const query = inputField.value.trim();
    if (!query) return;

    this.isLoading = true;

    inputField.disabled = true;
    sendBtn.disabled = true;
    inputField.value = "";

    this.appendMessage(query, "user");

    const loadingId = this.appendMessage(
      "🤖 Consultando o Pinguim IA...",
      "loading"
    );

    try {
      const result = await this.askPinguim(query);

      const loadingEl = document.getElementById(loadingId);
      if (loadingEl) {
        loadingEl.remove();
      }

      if (result.success) {
        this.appendMessage(result.answer, "ai");
      } else {
        this.appendMessage(`⚠️ ${result.error}`, "system");
      }
    } catch (error) {
      const loadingEl = document.getElementById(loadingId);
      if (loadingEl) {
        loadingEl.remove();
      }
      this.appendMessage(`⚠️ ${error.message}`, "system");
    }

    // Aguarda 100ms para liberar os campos e devolver o foco com segurança
    setTimeout(() => {
      if (inputField && sendBtn) {
        inputField.disabled = false;
        sendBtn.disabled = false;

        const windowDiv = document.getElementById("ndgAgentWindow");
        if (windowDiv && windowDiv.classList.contains("ng-active")) {
          inputField.focus();
        }
      }
      this.isLoading = false;
    }, 100);
  }

  appendMessage(text, type) {
    const msgArea = document.getElementById("ndgAgentMessages");
    if (!msgArea) return null;

    const msgDiv = document.createElement("div");
    const id = `msg_${Date.now()}`;

    msgDiv.id = id;
    msgDiv.className = `ng-msg ${type}`;
    msgDiv.innerHTML = String(text).replace(/\n/g, "<br>");

    msgArea.appendChild(msgDiv);
    msgArea.scrollTop = msgArea.scrollHeight;

    return id;
  }

  async askPinguim(question) {
    try {
      const response = await fetch(this.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Falha ao consultar o servidor.");
      }

      return {
        success: true,
        answer: data.answer,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (!window.ndgLinuxAgent) {
    window.ndgLinuxAgent = new NDGLinuxAgent();
  }
});
