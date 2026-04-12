const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Quiz");
const Quiz = mongoose.model("quizzes");

// GET - listar todos os quizzes
router.get("/", async (req, res) => {
    try {
        const quizzes = await Quiz.find().lean();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: "Erro ao carregar quizzes" });
    }
});

// GET - obter um quiz específico
router.get("/:id", async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).lean();
        if (!quiz) return res.status(404).json({ error: "Quiz não encontrado" });
        res.json(quiz);
    } catch (err) {
        res.status(500).json({ error: "Erro ao carregar quiz" });
    }
});

// POST - criar novo quiz
router.post("/novo", async (req, res) => {
    try {
        const { pergunta, opcoes, respostaCorreta } = req.body;
        const quiz = new Quiz({
            pergunta,
            opcoes: Array.isArray(opcoes) ? opcoes : opcoes.split(",").map(o => o.trim()),
            respostaCorreta: parseInt(respostaCorreta)
        });
        await quiz.save();
        res.json({ success: "Quiz criado com sucesso!", quiz });
    } catch (err) {
        res.status(500).json({ error: "Erro ao salvar quiz: " + err.message });
    }
});

// POST - responder quiz
router.post("/responder", async (req, res) => {
    try {
        const respostas = req.body;
        const perguntas = await Quiz.find().lean();
        let score = 0;

        perguntas.forEach((p, i) => {
            if (respostas[`q${i}`] !== undefined &&
                parseInt(respostas[`q${i}`]) === p.respostaCorreta) {
                score++;
            }
        });

        res.json({ score, total: perguntas.length });
    } catch (err) {
        res.status(500).json({ error: "Erro interno ao calcular resultado." });
    }
});

// GET - inserir perguntas iniciais
router.get("/seed", async (req, res) => {
    try {
        await Quiz.insertMany([
            { pergunta: "Qual comando inicia um projeto Node.js?", opcoes: ["npm init", "node start", "git init"], respostaCorreta: 0 },
            { pergunta: "Qual banco de dados é NoSQL?", opcoes: ["MySQL", "MongoDB", "PostgreSQL"], respostaCorreta: 1 },
            { pergunta: "Qual framework é usado com Express para templates?", opcoes: ["Handlebars", "Django", "Laravel"], respostaCorreta: 0 },
            { pergunta: "Qual comando instala pacotes no Node.js?", opcoes: ["node install", "npm install", "git install"], respostaCorreta: 1 },
            { pergunta: "Qual linguagem o Node.js executa?", opcoes: ["Python", "JavaScript", "Ruby"], respostaCorreta: 1 }
        ]);
        res.json({ success: "Perguntas inseridas com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao inserir perguntas: " + err.message });
    }
});

module.exports = router;
