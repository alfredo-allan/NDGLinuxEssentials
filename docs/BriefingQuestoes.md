📑 BRIEFING TÉCNICO - NDG LINUX ESSENTIALS
Versão 2.0 - Para Reprodução em Novo Chat
markdown

🎯 **CONTEXTO GERAL**
Você é um especialista em front-end e deve criar páginas HTML para o curso "NDG Linux Essentials" seguindo as especificações abaixo. O projeto consiste em múltiplos módulos, uma página central de busca e uma página de questões.

---

📌 **IDENTIDADE VISUAL (OBRIGATÓRIA)**

- Fundo: #0a0a0a
- Cards: #111111 com borda #222222
- Cards hover: #1a1a1a com borda #00ff88 e translateY(-5px)
- Texto principal: #e0e0e0
- Texto secundário: #888888
- Cor primária: #00ff88 (verde neon) - para destaques, comandos, ícones
- Cor secundária: #0078d4 (azul) - para gradientes
- Terminal: fundo #0d1117, texto #00ff88, fonte 'Courier New', monospace
- Navbar: rgba(10,10,10,0.95) com backdrop-filter blur(10px), sticky top
- Seções: separadas por border-bottom: 1px solid #222222
- H1: gradiente linear(90deg, #00ff88, #0078d4) com background-clip text

---

🎨 **CSS VARIABLES PADRÃO**

```css
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

📐 ESTRUTURA BASE DO HTML
html

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NDG Linux Essentials | Título do Módulo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        /* TODAS AS REGRAS CSS DO BRIEFING ACIMA */
    </style>
</head>
<body>
    <!-- NAVBAR (fixa com sticky) -->
    <!-- HERO SECTION -->
    <!-- CONTAINER COM SEÇÕES -->
    <!-- FOOTER -->
</body>
</html>

🧭 NAVBAR PADRÃO
html

<nav class="navbar">
    <div class="container">
        <a href="index.html" class="navbar-brand">
            <i class="fab fa-linux"></i> NDG Linux Essentials
        </a>
        <ul class="nav-modules">
            <li><a href="#secaoX-Y">X.Y Título da Seção</a></li>
            <!-- Adicionar links para cada seção -->
        </ul>
        <a href="index.html" class="btn-outline">
            <i class="fas fa-home"></i> Voltar
        </a>
    </div>
</nav>

🦸 HERO SECTION PADRÃO
html

<section class="hero">
    <div class="container">
        <div class="badge-lab">
            <i class="fas fa-graduation-cap"></i> NDG Linux Essentials | Módulo X
        </div>
        <h1>Título do Módulo</h1>
        <p>Descrição resumida do módulo</p>
        <div style="margin-top: 1.5rem;">
            <i class="fab fa-linux" style="color: var(--primary); font-size: 1.5rem; margin: 0 0.5rem;"></i>
            <i class="fas fa-terminal" style="color: var(--primary); font-size: 1.5rem; margin: 0 0.5rem;"></i>
        </div>
    </div>
</section>

📄 ESTRUTURA DE SEÇÃO/CARD PADRÃO
html

<section id="secaoX-Y" class="section">
    <h2 class="section-title">
        <i class="fas [icone]"></i>
        <span class="section-number">X.Y</span> Título Traduzido
    </h2>
    
    <div class="card">
        <p>Conteúdo traduzido fielmente...</p>
    </div>
    
    <div class="terminal">
        <pre>$ comando exemplo</pre>
    </div>
    
    <div class="alert alert-info">
        <i class="fas fa-info-circle"></i> 
        <strong>📌 Dica:</strong> Texto informativo
    </div>
</section>

🛠️ COMPONENTES DISPONÍVEIS
Componente	Classe CSS	Uso
Card	card	Agrupar conceitos/textos
Terminal	terminal	Comandos Linux e saídas
Tabela	table-custom	Dados comparativos
Grid 2 colunas	grid-2	Cards lado a lado
Alerta info	alert alert-info	Informações/dicas
Alerta sucesso	alert alert-success	Confirmações
Alerta warning	alert alert-warning	Avisos
Alerta erro	alert alert-danger	Erros/perigos

📊 TABELA PADRÃO
html

<table class="table-custom">
    <thead>
        <tr><th>Coluna 1</th><th>Coluna 2</th></tr>
    </thead>
    <tbody>
        <tr><td>Dado 1</td><td>Dado 2</td></tr>
    </tbody>
</table>

🎨 SUBSTITUIÇÃO DE IMAGENS (REGRAS)

NUNCA use imagens ou fotos. Substitua por:

    Arte ASCII dentro de .terminal

    Ícones FontAwesome (fas ou fab)

    Tabelas estruturadas

    Grids com cards

Ícones obrigatórios por contexto:
Contexto	Ícone
Linux/Sistema	fab fa-linux
Terminal	fas fa-terminal
Servidor	fas fa-server
Segurança	fas fa-shield-alt
Diretórios	fas fa-folder-open
Documentação	fas fa-book
Sucesso	fas fa-check-circle
Aprendizado	fas fa-graduation-cap

📱 RESPONSIVIDADE
css

@media (max-width: 768px) {
    .hero h1 { font-size: 2rem; }
    .container { padding: 0 1rem; }
    .section { padding: 40px 0; }
    .section-title { font-size: 1.5rem; flex-wrap: wrap; }
    .navbar .container { flex-direction: column; align-items: flex-start; }
    .nav-modules { width: 100%; overflow-x: auto; flex-wrap: nowrap; }
    .nav-modules li a { white-space: nowrap; }
}

📋 REGRAS DE CONTEÚDO (OBRIGATÓRIAS)

    TRADUÇÃO: Todo conteúdo para PT-BR com terminologia Linux preservada (kernel, shell, pipeline, root)

    FIDELIDADE: Nunca omitir ou adicionar informações. Traduzir exatamente o original

    TERMINAL: Comandos SEMPRE dentro de <div class="terminal"><pre>comando</pre></div>

    ID DAS SEÇÕES: Formato id="secaoX-Y" onde X = módulo, Y = seção

    NAVBAR: Para cada seção, adicionar <li><a href="#secaoX-Y">X.Y Título</a></li>

    MASCOTE: Usar fa-linux em vez de caveiras ou ícones de ameaça

✅ CHECKLIST DE QUALIDADE

    Fundo escuro #0a0a0a

    Tradução PT-BR fiel

    Nenhuma imagem (tudo substituído por ícones/ASCII)

    Ícone fa-linux presente

    Comandos dentro de .terminal

    H1 com gradiente verde→azul

    Navbar fixa com navegação expansível

    Links gerados para cada seção

    Responsivo (mobile first)

    Cards com hover (borda verde + translateY)

    Alertas com bordas laterais coloridas

🚀 PROMPT DE INÍCIO (COLE NO NOVO CHAT)
text

🎨 Contexto: Você é especialista front-end e deve renderizar conteúdo do curso "NDG Linux Essentials" seguindo o BRIEFING TÉCNICO abaixo.

📌 Identidade Visual:
- Fundo escuro #0a0a0a, cards #111111, bordas #222222
- Texto #e0e0e0, texto secundário #888888
- Cor primária: #00ff88 (comandos, ícones, destaques)
- Cor secundária: #0078d4 (gradientes)
- Terminal: fundo #0d1117, texto #00ff88, fonte monospace
- Hover cards: elevação + borda verde
- Navbar fixa com blur
- Responsivo (mobile first)

🛠️ Regras:
1. Traduza para PT-BR com fidelidade técnica
2. Substitua imagens por ícones FontAwesome (use fa-linux)
3. Comandos dentro de <div class="terminal"><pre>...</pre></div>
4. Cada seção: <section id="secaoMODULO-SECAO"> com links no navbar
5. Use cards, tabelas, alertas e grids conforme necessidade
6. NUNCA omita conteúdo - tradução completa

📤 Envie o conteúdo do módulo/seção para renderização.

📁 ESTRUTURA DE ARQUIVOS ESPERADA
text

/Projeto/
├── index.html          (página central com busca)
├── modulo_1.html       (Módulo 1)
├── modulo_2.html       (Módulo 2)
├── questoes.html       (página de questões)
├── css/
│   └── styles.css      (opcional - pode ser inline)
├── js/
│   └── motor.js        (busca global)
└── pages/
    └── (módulos adicionais)

📝 EXEMPLO DE SEÇÃO PRONTA
html

<section id="secao2-5" class="section">
    <h2 class="section-title">
        <i class="fab fa-linux"></i>
        <span class="section-number">2.5</span> Distribuições Linux
    </h2>
    <div class="card">
        <p>Texto traduzido do conteúdo original...</p>
    </div>
    <div class="terminal">
        <pre>$ cat /etc/os-release</pre>
    </div>
    <div class="alert alert-info">
        <i class="fas fa-lightbulb"></i>
        <strong>📌 Dica:</strong> Informação complementar
    </div>
</section>

FIM DO BRIEFING
text


---

## 🗂️ Como usar este briefing:

1. **Salve este briefing** em um arquivo `briefing_tecnico.md` na pasta `docs/` do seu projeto
2. Quando precisar de um novo chat, **copie o PROMPT DE INÍCIO** (a parte com `🎨 Contexto...`) e cole no novo chat
3. Em seguida, **cole o conteúdo original do módulo** (em inglês) que deseja traduzir
4. O assistente seguirá **exatamente** as mesmas regras que usamos aqui

---

## ✅ O briefing garante:

| Item | Resultado |
|------|-----------|
| Mesma identidade visual | ✅ #00ff88, #0a0a0a, cards, terminal |
| Tradução fiel PT-BR | ✅ Termos Linux preservados |
| Substituição de imagens | ✅ Ícones FontAwesome ou ASCII |
| Navbar expansível | ✅ Links gerados automaticamente |
| Responsividade | ✅ Mobile first |
| Componentes padronizados | ✅ Card, Terminal, Tabela, Alertas |

Agora você pode **reproduzir o mesmo resultado** em qualquer novo chat! 🐧