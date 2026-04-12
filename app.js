const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("dotenv").config();

const app = express();

// Debug para verificar se a variável está carregada
console.log("MONGO_URI:", process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Models
const Postagem = require("./models/Postagem");
const Categoria = require("./models/Categoria");
const Exame = require("./models/Exame");

// ✅ Rotas para resoluções de exames
// Inserir nova resolução
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

// Consultar resolução
app.get("/api/resolucoes/:disciplina/:ano/:versao", async (req, res) => {
    try {
        const { disciplina, ano, versao } = req.params;
        const exame = await Exame.findOne({ disciplina, ano, versao }).lean();
        if (!exame) return res.status(404).json({ error: "Resolução não encontrada" });
        res.json(exame);
    } catch (err) {
        console.error("Erro ao carregar resolução:", err);
        res.status(500).json({ error: "Erro interno ao carregar resolução" });
    }
});

app.use("/resolucoes", express.static(path.join(__dirname, "src/resolucoes")));


// Rotas customizadas
const usuarios = require("./routes/usuario");
const admin = require("./routes/admin");
const quiz = require("./routes/quiz");

app.use("/usuarios", usuarios);
app.use("/admin", admin);
app.use("/quiz", quiz);

// Rotas API simples (React consome estas)
app.get("/api/quizzes", (req, res) => {
    res.json([
        { id: 1, titulo: "Quiz de Matemática" },
        { id: 2, titulo: "Quiz de Física" }
    ]);
});

// Autenticação
require("./config/auth")(passport);

// Sessão
app.use(session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true
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

// Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado ao MongoDB Atlas"))
    .catch((err) => console.log("Erro ao se conectar: " + err));

// Public (para servir assets estáticos, se necessário)
app.use(express.static(path.join(__dirname, "public")));

// ✅ Rotas API (React consome estas)
app.get("/api/postagens", async (req, res) => {
    try {
        const postagens = await Postagem.find()
            .populate("categoria")
            .sort({ data: "desc" })
            .lean();
        res.json(postagens);
    } catch (err) {
        res.status(500).json({ error: "Erro interno ao listar postagens" });
    }
});

app.get("/api/categorias", async (req, res) => {
    try {
        const categorias = await Categoria.find().lean();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ error: "Erro interno ao listar categorias" });
    }
});

app.get("/api/categorias/:slug", async (req, res) => {
    try {
        const categoria = await Categoria.findOne({ slug: req.params.slug }).lean();
        if (!categoria) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }
        const postagens = await Postagem.find({ categoria: categoria._id }).lean();
        res.json({ categoria, postagens });
    } catch (err) {
        res.status(500).json({ error: "Erro interno ao carregar categoria" });
    }
});

// Rota de erro
app.get("/api/404", (req, res) => {
    res.status(404).json({ error: "Erro 404!" });
});
// Servir frontend build
app.use(express.static(path.join(__dirname, "../Frontend/build")));



// Servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("SERVIDOR RODANDO na porta " + PORT);
});
