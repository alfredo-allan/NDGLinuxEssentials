📑 BRIEFING DE IDENTIDADE VISUAL E ESTRUTURA: NDG LINUX ESSENTIALS
📌 VISÃO GERAL

Este briefing define os padrões de design, cores, tipografia, efeitos e estrutura para renderização de conteúdo técnico (textos, comandos, estruturas de arquivos) em páginas web com a identidade visual voltada para o curso NDG Linux Essentials.

O estilo é inspirado em sistemas operacionais modernos e terminais Linux em dark mode profissional, com ênfase máxima em legibilidade, comandos destacados, fidelidade linguística e elementos de terminal.
🎨 PALETA DE CORES (CSS Variables)
css

:root {
  --bg-dark: #0a0a0a;
  --bg-card: #111111;
  --bg-card-hover: #1a1a1a;
  --text: #e0e0e0;
  --text-dim: #888888;
  --primary: #00ff88;
  --primary-dark: #00cc6a;
  --secondary: #0078d4;
  --success: #00ff88;
  --warning: #ffcc00;
  --danger: #ff4444;
  --info: #00aaff;
  --border: #222222;
}

🔤 TIPOGRAFIA
Elemento	Fonte	Tamanho	Peso	Cor
Títulos principais (h1)	'Inter', sans-serif	3.5rem	800	Gradiente (--primary → --secondary)
Subtítulos (h2)	'Inter', sans-serif	2rem	700	--text + ícone --primary
Títulos de seção (h3)	'Inter', sans-serif	1.3rem	600	--text
Corpo do texto	'Inter', sans-serif	1rem	400	--text
Texto secundário	'Inter', sans-serif	0.85rem	400	--text-dim
Terminal / Código	'Courier New', monospace	0.85rem	400	--primary

Efeito Gradiente para H1:
css

background: linear-gradient(90deg, var(--primary), var(--secondary));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

🧱 ESTRUTURA DE LAYOUT
Container:
css

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

Seções:
css

.section {
    padding: 60px 0;
    border-bottom: 1px solid var(--border);
    scroll-margin-top: 80px;
}

Título de Seção:
css

.section-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
}
.section-title i {
    color: var(--primary);
    font-size: 2rem;
}
.section-number {
    color: var(--primary);
    font-family: monospace;
    font-size: 1.8rem;
}

Cards:
css

.card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s;
    margin-bottom: 1.5rem;
}
.card:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
    background: var(--bg-card-hover);
}
.card i {
    font-size: 2rem;
    color: var(--primary);
    margin-bottom: 1rem;
}

💻 TERMINAL
css

.terminal {
    background: #0d1117;
    border-radius: 12px;
    padding: 1rem;
    border: 1px solid var(--border);
    font-family: 'Courier New', monospace;
    overflow-x: auto;
    margin: 1.5rem 0;
}
.terminal pre {
    margin: 0;
    color: var(--primary);
    font-size: 0.85rem;
    white-space: pre;
    word-wrap: normal;
    display: inline-block;
    min-width: 100%;
}

🧭 TOP BAR E MENU LATERAL (MODERNO)
Estrutura HTML do Top Bar e Sidebar:
html

<!-- Top Bar - Header fixo -->
<div class="top-bar">
    <button class="menu-toggle" id="openMenu">
        <i class="fas fa-bars"></i>
        <span>Menu</span>
    </button>
    <a href="index.html" class="top-bar-brand">
        <i class="fab fa-linux"></i> NDG Linux Essentials
    </a>
    <a href="index.html" class="btn-outline">
        <i class="fas fa-home"></i> Voltar
    </a>
</div>

<!-- Menu Lateral (Sidebar) -->
<div class="sidebar" id="sidebar">
    <div class="sidebar-header">
        <h3><i class="fas fa-compass"></i> Navegação</h3>
        <button class="close-sidebar" id="closeMenu">
            <i class="fas fa-times"></i>
        </button>
    </div>
    <ul class="nav-modules">
        <li><a href="#secaoX-Y"><i class="fas fa-icone"></i> X.Y Título</a></li>
    </ul>
</div>

<!-- Overlay para fechar o menu -->
<div class="sidebar-overlay" id="sidebarOverlay"></div>

CSS do Top Bar e Sidebar:
css

/* Top Bar */
.top-bar {
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  padding: 0.8rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.menu-toggle {
  background: transparent;
  border: 1px solid var(--primary);
  color: var(--primary);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s;
}

.menu-toggle:hover {
  background: var(--primary);
  color: var(--bg-dark);
}

.top-bar-brand {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: rgba(17, 17, 17, 0.98);
  backdrop-filter: blur(15px);
  border-right: 1px solid var(--border);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 1002;
  overflow-y: auto;
  padding: 1.5rem;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.close-sidebar {
  background: transparent;
  border: none;
  color: var(--text-dim);
  font-size: 1.5rem;
  cursor: pointer;
}

.close-sidebar:hover {
  color: var(--danger);
}

/* Sidebar nav modules */
.sidebar .nav-modules {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar .nav-modules li a {
  display: block;
  padding: 0.7rem 1rem;
  color: var(--text-dim);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 0.85rem;
}

.sidebar .nav-modules li a i {
  margin-right: 0.75rem;
  width: 20px;
  color: var(--primary);
}

.sidebar .nav-modules li a:hover {
  color: var(--primary);
  background: rgba(0, 255, 136, 0.1);
  transform: translateX(5px);
}

/* Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1001;
  display: none;
}

.sidebar-overlay.active {
  display: block;
}

/* Ajuste do body para o header fixo */
body {
  padding-top: 65px;
}

JavaScript para o Menu Lateral (menu.js):
javascript

class SidebarMenu {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.overlay = document.getElementById('sidebarOverlay');
        this.openBtn = document.getElementById('openMenu');
        this.closeBtn = document.getElementById('closeMenu');
        this.init();
    }

    init() {
        if (!this.sidebar) return;

        if (this.openBtn) {
            this.openBtn.addEventListener('click', () => this.open());
        }
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
        if (this.overlay) {
            this.overlay.addEventListener('click', () => this.close());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebar.classList.contains('open')) {
                this.close();
            }
        });

        const links = document.querySelectorAll('.sidebar .nav-modules a');
        links.forEach(link => {
            link.addEventListener('click', () => this.close());
        });
    }

    open() {
        this.sidebar.classList.add('open');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.sidebar.classList.remove('open');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SidebarMenu();
});

🦸 HERO SECTION
css

.hero {
    padding: 80px 0;
    text-align: center;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
}
.badge-lab {
    display: inline-block;
    background: rgba(0, 255, 136, 0.1);
    color: var(--primary);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
    border: 1px solid rgba(0, 255, 136, 0.3);
}

📊 TABELAS
css

.table-custom {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
}
.table-custom th, .table-custom td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
}
.table-custom th {
    color: var(--primary);
    font-weight: 600;
}

⚠️ ALERTAS
css

.alert {
    padding: 1rem;
    border-radius: 12px;
    margin: 1rem 0;
    border-left: 4px solid;
    background: rgba(0, 0, 0, 0.3);
}
.alert-success { border-left-color: var(--success); }
.alert-info { border-left-color: var(--info); }
.alert-warning { border-left-color: var(--warning); }
.alert-danger { border-left-color: var(--danger); }

📱 RESPONSIVIDADE
css

@media (max-width: 768px) {
    .hero h1 { font-size: 2rem; }
    .container { padding: 0 1rem; }
    .section { padding: 40px 0; }
    .section-title { font-size: 1.5rem; flex-wrap: wrap; }
    
    /* Top Bar Mobile */
    .top-bar { padding: 0.5rem 1rem; }
    .menu-toggle { padding: 0.3rem 0.6rem; font-size: 0.8rem; }
    .top-bar-brand { font-size: 0.9rem; }
    .btn-outline { padding: 0.3rem 0.6rem; font-size: 0.7rem; }
    body { padding-top: 55px; }
    
    /* Sidebar Mobile */
    .sidebar { width: 85%; max-width: 300px; }
    
    /* Terminal Mobile */
    .terminal { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .terminal pre { font-size: 0.7rem; white-space: pre; }
}

🛠️ ÍCONES FONTAWESOME RECOMENDADOS
Contexto	Ícone
Linux/Sistema	fa-linux
Terminal	fa-terminal, fa-code
Diretórios	fa-folder-open, fa-sitemap
Servidor	fa-server, fa-microchip
Segurança	fa-shield-alt, fa-key
Documentação	fa-book, fa-file-alt
Sucesso	fa-check-circle
Aprendizado	fa-graduation-cap, fa-lightbulb
Menu/Navegação	fa-bars, fa-compass
Fechar	fa-times
📋 INSTRUÇÕES OBRIGATÓRIAS PARA RENDERIZAÇÃO

Ao receber o conteúdo técnico original do curso, siga estritamente:

    TRADUÇÃO: Traduza para PT-BR com alta fidelidade, mantendo termos técnicos como kernel, shell, pipeline, root.

    SUBSTITUIÇÃO DE IMAGENS: Nunca use imagens/fotos. Substitua por ícones FontAwesome ou arte ASCII.

    MASCOTE: Use fa-linux (pinguim/Tux) em vez de caveiras ou ícones de ameaça.

    COMANDOS: Todo comando ou saída de terminal deve ficar dentro de <div class="terminal"><pre>comando</pre></div>.

    ALERTAS: Use as classes .alert-success, .alert-info, .alert-warning, .alert-danger com ícones correspondentes.

    TOPBAR E SIDEBAR: Use obrigatoriamente a estrutura do .top-bar com .sidebar e .menu-toggle.

    MENU LATERAL: Para cada seção criada, gere um <li><a href="#secaoX-Y"><i class="fas [icone]"></i> X.Y Título</a></li> para colar dentro do <ul class="nav-modules"> da sidebar.

    ID DAS SEÇÕES: Cada seção deve ter id="secao1-1", id="secao1-2", etc., seguindo o padrão secao{MODULO}-{SECAO}.

    ARQUIVOS EXTERNOS: Incluir menu.js no final de cada página e importar o CSS global.

ESTRUTURA DA SEÇÃO:
html

<section id="secao1-X" class="section">
    <h2 class="section-title">
        <i class="fas [icone]"></i>
        <span class="section-number">1.X</span> Título Traduzido
    </h2>
    <div class="card">
        <p>Conteúdo traduzido...</p>
    </div>
</section>

PADRÃO DE PÁGINA COMPLETO:
html

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>NDG Linux Essentials | Título</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* CSS GLOBAL COMPLETO AQUI */
    </style>
</head>
<body>

<!-- TOP BAR -->
<div class="top-bar">...</div>

<!-- SIDEBAR -->
<div class="sidebar">...</div>
<div class="sidebar-overlay"></div>

<!-- HERO -->
<section class="hero">...</section>

<div class="container">
    <!-- SEÇÕES -->
</div>

<footer>...</footer>

<script src="menu.js"></script>
</body>
</html>

✅ CHECKLIST DE QUALIDADE

    Fundo escuro consistente (#0a0a0a)

    Tradução PT-BR fiel

    Sem imagens (tudo substituído por ícones ou ASCII)

    Ícone fa-linux presente

    Comandos dentro de .terminal

    H1 com gradiente verde → azul

    Top Bar fixa com menu toggle

    Sidebar com navegação expansível

    Overlay para fechar menu

    menu.js incluído

    Links gerados para cada seção dentro da sidebar

    Responsividade testada (mobile/desktop)

🚀 INÍCIO PARA NOVO CHAT

Copie e cole o texto abaixo em um novo chat:
text

🎨 Contexto: Você é um especialista em front-end e deve renderizar o conteúdo do curso "NDG Linux Essentials" seguindo o briefing abaixo.

📌 Identidade Visual:
- Fundo escuro #0a0a0a, cards #111111, bordas #222222
- Texto principal #e0e0e0, texto secundário #888888
- Cor primária: verde neon #00ff88 (comandos, ícones, destaques)
- Cor secundária: azul #0078d4 (gradientes)
- Terminal: fundo #0d1117, texto #00ff88, fonte monospace
- Hover nos cards: elevação + borda verde

🛠️ Estrutura do Header (OBRIGATÓRIA):
- Top bar fixa com botão menu toggle
- Sidebar lateral que abre/fecha
- Overlay para fechar o menu
- menu.js para controle

🛠️ Regras:
1. Traduza tudo para PT-BR com fidelidade técnica
2. Substitua imagens por ícones FontAwesome (use fa-linux como mascote)
3. Comandos dentro de <div class="terminal"><pre>...</pre></div>
4. Para CADA seção, gere um link <li><a href="#secaoX-Y"><i class="fas [icone]"></i> X.Y Título</a></li> para a sidebar
5. IDs das seções: id="secao1-1", id="secao1-2", etc.
6. Use cards, tabelas e alertas conforme necessidade
7. Inclua menu.js no final da página

📤 Aguardando conteúdo do módulo para renderização...

FIM DO BRIEFING REFATORADO 🐧
