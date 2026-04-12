const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../models/Usuario");
const passport = require("passport");
const Usuario = mongoose.model("usuarios");
const Postagem = require("../models/Postagem");

// rota registro de usuário
router.post("/registro", async (req, res) => {
    let erros = [];

    if (!req.body.nome) erros.push("Nome inválido");
    if (!req.body.email) erros.push("Email inválido");
    if (!req.body.senha) erros.push("Senha inválida");
    if (req.body.senha && req.body.senha.length < 4) erros.push("Senha muito curta");
    if (req.body.senha !== req.body.senha2) erros.push("As senhas são diferentes");

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    try {
        const usuarioExistente = await Usuario.findOne({ email: req.body.email });
        if (usuarioExistente) {
            return res.status(400).json({ error: "Já existe uma conta com este email." });
        }

        const novoUsuario = new Usuario({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        });

        const salt = await bcrypt.genSalt(10);
        novoUsuario.senha = await bcrypt.hash(novoUsuario.senha, salt);
        await novoUsuario.save();

        res.json({ success: "Usuário registrado com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao registrar usuário: " + err.message });
    }
});

// rota login
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json({ error: "Erro interno" });
        if (!user) return res.status(400).json({ error: "Credenciais inválidas" });

        req.logIn(user, (err) => {
            if (err) return res.status(500).json({ error: "Erro ao autenticar" });
            res.json({ success: "Login realizado com sucesso", user });
        });
    })(req, res, next);
});

// rota logout
router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.json({ success: "Deslogado com sucesso!" });
    });
});

// rota detalhe da postagem
router.get("/postagem/:id", async (req, res) => {
    try {
        const postagem = await Postagem.findById(req.params.id)
            .populate("categoria")
            .lean();
        if (!postagem) return res.status(404).json({ error: "Postagem não encontrada" });
        res.json(postagem);
    } catch (err) {
        res.status(500).json({ error: "Erro no servidor" });
    }
});

// rota principal de exames: lista todos os anos
router.get("/exames", (req, res) => {
    const anos = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];
    res.json({ anos });
});

// rota para exames de um ano específico
router.get("/exames/:ano", (req, res) => {
    const ano = req.params.ano;
    res.json({ ano });
});

// Matemática I
router.get("/exames/:ano/matematica1", (req, res) => {
    const ano = req.params.ano;
    res.json({ ano, exame: "Matemática I UEM" });
});

// Matemática II
router.get("/exames/:ano/matematica2", (req, res) => {
    const ano = req.params.ano;
    res.json({ ano, exame: "Matemática II UEM" });
});

// Matemática III
router.get("/exames/:ano/matematica3", (req, res) => {
    const ano = req.params.ano;
    res.json({ ano, exame: "Matemática III UEM" });
});

module.exports = router;
