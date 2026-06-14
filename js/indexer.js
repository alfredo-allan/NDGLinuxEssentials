const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const PAGES_DIR = path.join(__dirname, "../pages");
const OUTPUT_FILE = path.join(__dirname, "../data/index.json");

const modules = [
  { file: "modulo_1.html", module: "Módulo 1" },
  { file: "modulo_2.html", module: "Módulo 2" },
  { file: "modulo_3.html", module: "Módulo 3" },
  { file: "modulo_4.html", module: "Módulo 4" },
  { file: "modulo_5.html", module: "Módulo 5" },
  { file: "modulo_6.html", module: "Módulo 6" },
  { file: "modulo_7.html", module: "Módulo 7" },
  { file: "modulo_8.html", module: "Módulo 8" },
  { file: "modulo_9.html", module: "Módulo 9" },
  { file: "modulo_10.html", module: "Módulo 10" },
  { file: "modulo_11.html", module: "Módulo 11" },
  { file: "modulo_12.html", module: "Módulo 12" },
  { file: "modulo_13.html", module: "Módulo 13" },
  { file: "modulo_14.html", module: "Módulo 14" },
  { file: "modulo_15.html", module: "Módulo 15" },
  { file: "modulo_16.html", module: "Módulo 16" },
  { file: "modulo_17.html", module: "Módulo 17" },
  { file: "modulo_18.html", module: "Módulo 18" },
];

const chunks = [];

function splitText(text, size = 500) {
  const result = [];

  for (let i = 0; i < text.length; i += size) {
    result.push(text.slice(i, i + size));
  }

  return result;
}

console.log("🐧 Iniciando indexação...\n");

for (const mod of modules) {
  const filePath = path.join(PAGES_DIR, mod.file);

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Arquivo não encontrado: ${mod.file}`);
    continue;
  }

  console.log(`📖 Processando ${mod.file}`);

  const html = fs.readFileSync(filePath, "utf8");

  const $ = cheerio.load(html);

  $("script, style").remove();

  const text = $("body").text().replace(/\s+/g, " ").trim();

  const pieces = splitText(text);

  pieces.forEach((piece, index) => {
    chunks.push({
      id: `${mod.module}-${index}`,
      module: mod.module,
      content: piece,
    });
  });

  console.log(`   ${pieces.length} chunks gerados`);
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(chunks, null, 2), "utf8");

console.log("\n✅ Indexação concluída!");
console.log(`📦 ${chunks.length} chunks salvos`);
console.log(`💾 ${OUTPUT_FILE}`);
