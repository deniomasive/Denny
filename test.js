const fs = require("fs");
const path = require("path");

const filePath = path.join(
    __dirname,
    "src",
    "resolucoes",
    "matematica",
    "2025",
    "1",
    "numero1.tex"
);

console.log("Tentando ler:", filePath);

try {
    const conteudo = fs.readFileSync(filePath, "utf8");
    console.log("Conteúdo do ficheiro:\n", conteudo);
} catch (err) {
    console.error("Erro ao ler ficheiro:", err.message);
}
