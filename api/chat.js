// api/chat.js
export default async function handler(req, res) {
  // Configuração de cabeçalhos CORS para segurança e tráfego local/nuvem
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
      .json({ error: "Chave de API não configurada no servidor Vercel." });
  }

  const systemPrompt = `Você é o "Pinguim IA", tutor oficial do curso NDG Linux Essentials.
Responda usando EXCLUSIVAMENTE o contexto dos módulos abaixo. Se o assunto não estiver no contexto, diga rigorosamente que não localizou nos módulos atuais do curso.
Responda em português brasileiro. Use tags html simples como <code>comando</code> para dar destaque a códigos.

CONTEXTO DO CURSO:
${context}`;

  try {
    // URL estável do endpoint oficial de Texto do Google Generative Language
    const targetUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro detalhado do Google API:", data);
      return res.status(response.status).json({
        error:
          data.error?.message || `Erro ${response.status} na API do Gemini.`,
      });
    }

    // Validação da árvore de resposta do payload do Google
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (answer) {
      return res.status(200).json({ success: true, answer });
    } else {
      return res
        .status(500)
        .json({
          error: "A API retornou uma estrutura de dados sem texto válido.",
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Erro interno no servidor do agente: ${error.message}` });
  }
}
