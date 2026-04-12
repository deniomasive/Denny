const mongoose = require("mongoose");

const ExercicioSchema = new mongoose.Schema({
    numero: { type: Number, required: true },
    enunciado: { type: String, required: true },
    resolucao: { type: String },        // opcional: LaTeX direto
    resolucao_file: { type: String }    // opcional: ficheiro externo .tex
});

const ExameSchema = new mongoose.Schema({
    disciplina: { type: String, required: true },
    ano: { type: Number, required: true },
    versao: { type: Number, required: true },
    conteudo: [ExercicioSchema]
});

module.exports = mongoose.model("Exame", ExameSchema);
