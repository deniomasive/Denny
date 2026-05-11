const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Models
const Postagem = require("./models/Postagem");
const Categoria = require("./models/Categoria");
const Exame = require("./models/Exame");

// --- Rotas API ---
app.post("/api/resolucoes", async (req, res) => {
    try {
        const { disciplina, ano, versao, conteudo } = req.body;
        if (!disciplina || !ano || !versao || !conteudo) {
            return res.status(400).json({ error: "Campos obrigatórios em falta" });
        }
        const exame = new Exame({ disciplina, ano, versao, conteudo });
        await exame.save();
        res.json({ success: true, exame });
    } catch (err) {
        console.error("Erro ao salvar resolução:", err);
        res.status(500).json({ error: "Erro ao salvar resolução" });
    }
});
// Rota de versões fixa
app.get("/api/exames/:disciplina/:ano", async (req, res) => {
    const { disciplina, ano } = req.params;
    try {
        // Se quiseres validar se existe pelo menos um exame no Mongo:
        const exames = await Exame.find({
            disciplina: normalizar(disciplina),
            ano: parseInt(ano)
        }).lean();

        if (!exames || exames.length === 0) {
            // Mesmo sem dados, devolve sempre 1,2,3
            return res.json({ disciplina, ano, versoes: [1, 2, 3] });
        }

        // Se houver dados, devolve as versões únicas
        const versoes = [...new Set(exames.map(e => e.versao))];
        // Garante que pelo menos 1,2,3 estão presentes
        const todas = [1, 2, 3].filter(v => !versoes.includes(v)).concat(versoes);
        res.json({ disciplina, ano, versoes: todas.sort() });
    } catch (err) {
        console.error("Erro ao buscar versões:", err);
        res.status(500).json({ error: "Erro ao buscar versões" });
    }
});



// ✅ Buscar exame específico (com validação de versao)
app.get("/api/exames/:disciplina/:ano/:versao", async (req, res) => {
    const { disciplina, ano, versao } = req.params;

    if (!versao || isNaN(parseInt(versao))) {
        return res.status(400).json({ error: "Versão inválida" });
    }

    try {
        const exame = await Exame.findOne({
            disciplina: normalizar(disciplina),
            ano: parseInt(ano),
            versao: parseInt(versao)
        }).lean();

        if (!exame) {
            return res.status(404).json({ error: "Exame não encontrado" });
        }

        res.json(exame);
    } catch (err) {
        console.error("Erro ao buscar exame:", err);
        res.status(500).json({ error: "Erro ao buscar exame" });
    }
});

app.get("/api/resolucoes", async (req, res) => {
    try {
        const exames = await Exame.find().lean();
        const examesComResolucoes = exames.map(exame => {
            const conteudoComTexto = exame.conteudo.map(ex => {
                let resolucao = null;
                if (ex.resolucao_file) {
                    const filePath = path.join(
                        __dirname,
                        "src",
                        "resolucoes",
                        exame.disciplina.toLowerCase(),
                        String(exame.ano),
                        String(exame.versao),
                        ex.resolucao_file
                    );
                    try {
                        resolucao = fs.readFileSync(filePath, "utf8");
                    } catch (err) {
                        console.error("Erro ao ler ficheiro:", filePath, err.message);
                    }
                }
                return { ...ex, resolucao };
            });
            return { ...exame, conteudo: conteudoComTexto };
        });
        res.json(examesComResolucoes);
    } catch (err) {
        console.error("Erro ao buscar resoluções:", err);
        res.status(500).json({ error: "Erro ao buscar resoluções" });
    }
});

const normalizar = str =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Rota antiga de exame com resoluções em ficheiros
app.get("/exames/:disciplina/:ano/:versao", async (req, res) => {
    try {
        const { disciplina, ano, versao } = req.params;
        const exame = await Exame.findOne({
            disciplina: normalizar(disciplina),
            ano: parseInt(ano),
            versao: parseInt(versao)
        }).lean();

        if (!exame) {
            return res.status(404).json({ error: "Exame não encontrado" });
        }

        const conteudoComTexto = exame.conteudo.map(ex => {
            let resolucao = null;
            if (ex.resolucao_file) {
                const filePath = path.join(
                    __dirname,
                    "src",
                    "resolucoes",
                    normalizar(disciplina),
                    String(ano),
                    String(versao),
                    ex.resolucao_file
                );
                try {
                    resolucao = fs.readFileSync(filePath, "utf8");
                } catch (err) {
                    console.error("Erro ao ler ficheiro:", filePath, err.message);
                }
            }
            return { ...ex, resolucao };
        });

        res.json({ ...exame, conteudo: conteudoComTexto });
    } catch (err) {
        console.error("Erro ao buscar exame:", err);
        res.status(500).json({ error: "Erro ao buscar exame" });
    }
});

// Autenticação
require("./config/auth")(passport);

// Sessão com connect-mongo
app.use(session({
    secret: "cursodenode",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 14 * 24 * 60 * 60
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware para mensagens flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.log("Erro ao se conectar: " + err));

mongoose.connection.on("error", err => {
    console.error("Erro de conexão Mongo:", err);
});
mongoose.connection.once("open", () => {
    console.log("Ligação ao Mongo aberta com sucesso");
});

// Servir frontend React buildado
app.use(express.static(path.join(__dirname, "frontend/dist")));

// ✅ Fallback para React Router (SPA)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

// Servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("SERVIDOR RODANDO na porta " + PORT);
});
