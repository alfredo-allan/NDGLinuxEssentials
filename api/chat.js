// api/chat.js
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Cabeçalhos de CORS para permitir a comunicação com o front-end
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const { question, context } = req.body;

  if (!apiKey) {
    return res
      .status(500)
      .json({
        error:
          "Chave de API GEMINI_API_KEY não localizada nas variáveis de ambiente.",
      });
  }

  // Inicializa o cliente oficial do Google usando a sua chave do GCP
  const ai = new GoogleGenAI({ apiKey: apiKey });

  const systemPrompt = `Você é o "Pinguim IA", tutor oficial do curso NDG Linux Essentials.
Responda usando EXCLUSIVAMENTE o contexto dos módulos abaixo. Se o assunto não estiver no contexto, diga rigorosamente que não localizou nos módulos atuais do curso.
Responda em português brasileiro. Use tags html simples como <code>comando</code> para dar destaque a códigos.

CONTEXTO DO CURSO:
${context}`;

  try {
    // A SDK oficial abstrai os problemas de endpoint v1/v1beta e resolve a chamada do modelo
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `${systemPrompt}\n\nPergunta do Aluno: ${question}`,
      config: {
        temperature: 0.2,
        maxOutputTokens: 800,
      },
    });

    // A SDK entrega o texto diretamente na propriedade .text
    if (response && response.text) {
      return res.status(200).json({ success: true, answer: response.text });
    } else {
      return res
        .status(500)
        .json({
          error:
            "A SDK do Gemini retornou uma resposta sem conteúdo de texto válida.",
        });
    }
  } catch (error) {
    console.error("Erro crítico na SDK do Gemini:", error);
    return res
      .status(500)
      .json({ error: `Erro na SDK do Google: ${error.message}` });
  }
}
