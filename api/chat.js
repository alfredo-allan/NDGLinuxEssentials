// api/chat.js (Ajustado especificamente para chaves GCP/Vertex que começam com AQ)
module.exports = async (req, res) => {
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
    // 💡 MUDANÇA CRÍTICA: Rota v1beta usando o parâmetro correto para chaves baseadas em projetos numéricos
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

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
        temperature: 0.1, // Mais baixo para evitar que a IA tente "inventar" caminhos fora do contexto
        maxOutputTokens: 1000,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      // Retorna o erro estruturado do Google para sabermos exatamente o motivo se falhar
      return res.status(response.status).json({
        error:
          data.error?.message ||
          `Erro ${response.status} retornado pelo Google.`,
      });
    }

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (answer) {
      return res.status(200).json({ success: true, answer });
    } else {
      return res
        .status(500)
        .json({
          error: "O modelo respondeu, mas não gerou um bloco de texto válido.",
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Erro interno de rede na rota: ${error.message}` });
  }
};
