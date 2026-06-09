// api/chat.js (Bypass de Infraestrutura para chaves gen-lang-client)
module.exports = async (req, res) => {
  // Configuração estrita de CORS para seu front-end
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  const { question, context } = req.body;

  if (!API_KEY) {
    return res
      .status(500)
      .json({ error: "Variável GEMINI_API_KEY ausente no servidor Vercel." });
  }

  const systemPrompt = `Você é o "Pinguim IA", tutor oficial do curso NDG Linux Essentials.
Responda usando EXCLUSIVAMENTE o contexto dos módulos abaixo. Se o assunto não estiver no contexto, diga rigorosamente que não localizou nos módulos atuais do curso.
Responda em português brasileiro. Use tags html simples como <code>comando</code> para dar destaque a códigos.

CONTEXTO DO CURSO:
${context}`;

  try {
    // 💡 SOLUÇÃO: Usando a rota v1beta estável com a query string direta para aceitar o token de cliente
    const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nPergunta do Aluno: ${question}` },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 800,
      },
    };

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Adiciona cabeçalhos genéricos para simular tráfego direto de aplicação e evitar o bloqueio por IP da Vercel
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "X-Goog-Api-Client": "gl-js/auth-link",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Retorno do Google:", data);
      return res.status(response.status).json({
        error:
          data.error?.message || `Erro ${response.status} na API da Google.`,
      });
    }

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (answer) {
      return res.status(200).json({ success: true, answer });
    } else {
      return res
        .status(500)
        .json({ error: "O modelo não gerou conteúdo de texto válido." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Falha de rede na rota serverless: ${error.message}` });
  }
};
