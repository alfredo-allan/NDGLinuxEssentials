// api/chat.js (Padrão CommonJS estável para Vercel)
const fetch = require("node-fetch"); // A Vercel já fornece fetch nativo ou polyfill no ambiente Node moderno

module.exports = async (req, res) => {
  // Configuração estrita de CORS
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
      .json({ error: "Variável GEMINI_API_KEY não configurada na Vercel." });
  }

  const systemPrompt = `Você é o "Pinguim IA", tutor oficial do curso NDG Linux Essentials.
Responda usando EXCLUSIVAMENTE o contexto dos módulos abaixo. Se o assunto não estiver no contexto, diga rigorosamente que não localizou nos módulos atuais do curso.
Responda em português brasileiro. Use tags html simples como <code>comando</code> para dar destaque a códigos.

CONTEXTO DO CURSO:
${context}`;

  try {
    // Rota estável do Google para requisições brutas via POST
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    // Payload exato esperado pelo gateway da API
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

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data.error?.message ||
          `Erro ${response.status} retornado pelo Google.`,
      });
    }

    // Navega na árvore exata do JSON retornado pelo modelo v1 estável
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (answer) {
      return res.status(200).json({ success: true, answer });
    } else {
      return res
        .status(500)
        .json({ error: "O modelo não retornou um bloco de texto válido." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Erro no servidor da rota: ${error.message}` });
  }
};
