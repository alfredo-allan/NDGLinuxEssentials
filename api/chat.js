// api/chat.js
export default async function handler(req, res) {
  // Configuração de CORS para permitir requisições do seu front-end
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  // Resgata a chave oculta configurada no painel da Vercel
  const API_KEY = process.env.GEMINI_API_KEY;
  const { question, context } = req.body;

  const systemPrompt = `Você é o "Pinguim IA", tutor oficial do curso NDG Linux Essentials.
Responda usando EXCLUSIVAMENTE o contexto dos módulos abaixo. Se o assunto não estiver no contexto, diga rigorosamente que não localizou nos módulos atuais do curso.
Responda em português brasileiro. Use tags html simples como <code>comando</code> para dar destaque a códigos.

CONTEXTO DO CURSO:
${context}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: `${systemPrompt}\n\nPergunta do Aluno: ${question}` },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: data.error?.message || "Erro na API Gemini" });
    }

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return res.status(200).json({ success: true, answer });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
