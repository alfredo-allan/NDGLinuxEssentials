const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL = "llama3.2:3b";

const INDEX_PATH = path.join(__dirname, "../data/index.json");
const CACHE_PATH = path.join(__dirname, "../data/cache.json");

let index = [];
let cache = {};

/* ============================================
   CARREGAR ÍNDICE
============================================ */

try {
  index = JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));

  console.log(`📚 Índice carregado: ${index.length} chunks`);
} catch (error) {
  console.warn("⚠️ Não foi possível carregar index.json");
}

/* ============================================
   CARREGAR CACHE
============================================ */

try {
  cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));

  console.log(`⚡ Cache carregado: ${Object.keys(cache).length} perguntas`);
} catch {
  console.log("⚡ Criando cache.json");

  cache = {};

  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

/* ============================================
   EXPRESS
============================================ */

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

/* ============================================
   HEALTH
============================================ */

app.get("/health", async (req, res) => {
  try {
    const response = await fetch("http://localhost:11434/api/tags");

    const data = await response.json();

    res.json({
      success: true,
      ollama: true,
      model: MODEL,
      indexed_chunks: index.length,
      cached_answers: Object.keys(cache).length,
      models: data.models,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      ollama: false,
      error: error.message,
    });
  }
});

/* ============================================
   BUSCA LOCAL
============================================ */

function searchIndex(question) {
  const keywords = question
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  return index
    .map((chunk) => {
      let score = 0;

      const content = chunk.content.toLowerCase();

      keywords.forEach((keyword) => {
        const matches = content.split(keyword).length - 1;

        score += matches * 10;
      });

      return {
        ...chunk,
        score,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

/* ============================================
   CHAT
============================================ */

app.post("/api/chat", async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Pergunta inválida.",
      });
    }

    const normalizedQuestion = question.trim().toLowerCase();

    console.log("\n====================");
    console.log("Pergunta:");
    console.log(normalizedQuestion);
    console.log("====================");

    /* ===== CACHE ===== */

    if (cache[normalizedQuestion]) {
      console.log("⚡ Cache HIT");

      return res.json({
        success: true,
        answer: cache[normalizedQuestion],
        source: "cache",
      });
    }

    /* ===== BUSCA LOCAL ===== */

    const results = searchIndex(normalizedQuestion);

    console.log(`🔎 Chunks encontrados: ${results.length}`);

    if (results.length === 0) {
      return res.json({
        success: true,
        answer:
          "O material do NDG Linux Essentials não possui informações suficientes para responder essa pergunta.",
        source: "index",
      });
    }

    const context = results
      .map((chunk) => {
        return `[${chunk.module}]\n${chunk.content}`;
      })
      .join("\n\n");

    /* ===== PROMPT ===== */

    const prompt = `
Você é o Pinguim IA.

Tutor especialista do curso NDG Linux Essentials.

REGRAS:

- Utilize SOMENTE o contexto fornecido.
- Não utilize conhecimento externo.
- Não invente comandos.
- Se o material não possuir a resposta, informe isso claramente.
- Responda em português brasileiro.
- Seja didático e objetivo.

CONTEXTO:

${context}

PERGUNTA:

${question}

RESPOSTA:
`;

    console.log("🧠 Consultando Ollama...");

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, 180000);

    const ollamaResponse = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false,
        options: {
          temperature: 0.1,
          num_predict: 300,
        },
      }),
    });

    clearTimeout(timeout);

    const data = await ollamaResponse.json();

    if (!data.response) {
      throw new Error("Ollama não retornou resposta.");
    }

    const answer = data.response.trim();

    /* ===== SALVAR CACHE ===== */

    cache[normalizedQuestion] = answer;

    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));

    console.log("💾 Resposta salva");

    res.json({
      success: true,
      answer,
      source: "ollama",
      metadata: {
        model: data.model,
        prompt_tokens: data.prompt_eval_count,
        response_tokens: data.eval_count,
      },
    });
  } catch (error) {
    console.error(error);

    if (error.name === "AbortError") {
      return res.status(504).json({
        success: false,
        error: "Tempo limite excedido ao consultar o Ollama.",
      });
    }

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

/* ============================================
   START
============================================ */

app.listen(PORT, () => {
  console.log(`
🐧 Pinguim IA iniciado

Servidor : http://localhost:${PORT}
Health    : http://localhost:${PORT}/health
Modelo    : ${MODEL}
Ollama    : ${OLLAMA_URL}

Chunks    : ${index.length}
Cache     : ${Object.keys(cache).length}

Pronto para responder perguntas do NDG Linux Essentials.
`);
});
