const express = require("express");
const router = express.Router();

const Postagem = require("../models/Postagem");
const Categoria = require("../models/Categoria");
const { eAdmin } = require("../helpers/eAdmin");

// rota inicial admin
router.get("/", (req, res) => {
    res.json({ message: "Área administrativa - API ativa" });
});

// rota listar categorias
router.get("/categorias", async (req, res) => {
    try {
        const categorias = await Categoria.find().sort({ date: "desc" }).lean();
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar categorias" });
    }
});

// rota salvar nova categoria
router.post("/categorias/nova", async (req, res) => {
    let erros = [];

    if (!req.body.nome || req.body.nome.length < 2) {
        erros.push("Nome inválido ou muito pequeno");
    }

    if (!req.body.slug || !req.body.slug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
        erros.push("Slug inválido, use minúsculas, números e hífen");
    }

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    try {
        const novaCategoria = { nome: req.body.nome, slug: req.body.slug };
        await new Categoria(novaCategoria).save();
        res.json({ success: "Categoria salva com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao salvar categoria: " + err });
    }
});

// rota editar categoria
router.put("/categorias/:id", async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }

        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;
        await categoria.save();

        res.json({ success: "Categoria editada com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao editar categoria" });
    }
});

// rota deletar categoria
router.delete("/categorias/:id", async (req, res) => {
    try {
        await Categoria.findByIdAndDelete(req.params.id);
        res.json({ success: "Categoria deletada com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar categoria" });
    }
});

// lista de postagens
router.get("/postagens", async (req, res) => {
    try {
        const postagens = await Postagem.find()
            .populate("categoria")
            .sort({ data: "desc" })
            .lean();
        res.json(postagens);
    } catch (err) {
        res.status(500).json({ error: "Erro ao listar postagens" });
    }
});

// rota salvar nova postagem
router.post("/postagens/nova", async (req, res) => {
    let erros = [];

    if (!req.body.titulo || req.body.titulo.trim().length < 3) {
        erros.push("Título inválido, mínimo 3 caracteres");
    }
    if (!req.body.slug || !req.body.slug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
        erros.push("Slug inválido, use minúsculas, números e hífen");
    }
    if (!req.body.descricao || req.body.descricao.trim().length < 5) {
        erros.push("Descrição inválida, mínimo 10 caracteres");
    }
    if (!req.body.conteudo || req.body.conteudo.trim().length < 5) {
        erros.push("Conteúdo inválido, mínimo 20 caracteres");
    }
    if (req.body.categoria == "0") {
        erros.push("Categoria inválida, registre uma categoria");
    }

    if (erros.length > 0) {
        return res.status(400).json({ erros });
    }

    try {
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        };

        await new Postagem(novaPostagem).save();
        res.json({ success: "Postagem criada com sucesso." });
    } catch (err) {
        res.status(500).json({ error: "Erro ao salvar postagem: " + err.message });
    }
});

// rota editar postagem
router.put("/postagens/:id", async (req, res) => {
    try {
        const postagem = await Postagem.findById(req.params.id);
        if (!postagem) {
            return res.status(404).json({ error: "Postagem não encontrada" });
        }

        postagem.titulo = req.body.titulo;
        postagem.slug = req.body.slug;
        postagem.descricao = req.body.descricao;
        postagem.conteudo = req.body.conteudo;
        postagem.categoria = req.body.categoria;

        await postagem.save();
        res.json({ success: "Postagem editada com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao editar postagem" });
    }
});

// rota deletar postagem
router.delete("/postagens/:id", async (req, res) => {
    try {
        await Postagem.findByIdAndDelete(req.params.id);
        res.json({ success: "Postagem deletada com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar postagem" });
    }
});

module.exports = router;
