const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
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

// Rotas API (exemplo)
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

// MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado ao MongoDB Atlas"))
    .catch((err) => console.log("Erro ao se conectar: " + err));

// Servir assets públicos
app.use(express.static(path.join(__dirname, "public")));

// ✅ Servir o frontend React build
app.use(express.static(path.join(__dirname, "../Frontend/build")));

// ✅ Rota catch-all para React Router
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/build/index.html"));
});

// Servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("SERVIDOR RODANDO na porta " + PORT);
});
