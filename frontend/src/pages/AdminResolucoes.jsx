import { useState } from "react";

function AdminResolucoes() {
    const [disciplina, setDisciplina] = useState("");
    const [ano, setAno] = useState("");
    const [versao, setVersao] = useState("");
    const [conteudo, setConteudo] = useState([{ numero: 1, enunciado: "", resolucao: "" }]);

    const handleAddExercicio = () => {
        setConteudo([...conteudo, { numero: conteudo.length + 1, enunciado: "", resolucao: "" }]);
    };

    const handleChange = (index, field, value) => {
        const newConteudo = [...conteudo];
        newConteudo[index][field] = value;
        setConteudo(newConteudo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const exame = { disciplina, ano: Number(ano), versao: Number(versao), conteudo };

        const res = await fetch("/api/resolucoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exame)
        });

        const data = await res.json();
        alert(data.success ? "Resolução salva com sucesso!" : "Erro ao salvar resolução");
    };

    return (
        <div>
            <h2>Inserir Resolução de Exame</h2>
            <form onSubmit={handleSubmit}>
                <label>Disciplina:</label>
                <input value={disciplina} onChange={(e) => setDisciplina(e.target.value)} required />

                <label>Ano:</label>
                <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} required />

                <label>Versão:</label>
                <input type="number" value={versao} onChange={(e) => setVersao(e.target.value)} required />

                <h3>Exercícios</h3>
                {conteudo.map((ex, i) => (
                    <div key={i} style={{ marginBottom: "10px" }}>
                        <label>Enunciado {ex.numero}:</label>
                        <textarea
                            value={ex.enunciado}
                            onChange={(e) => handleChange(i, "enunciado", e.target.value)}
                            required
                        />
                        <label>Resolução {ex.numero} (LaTeX avançado):</label>
                        <textarea
                            value={ex.resolucao}
                            onChange={(e) => handleChange(i, "resolucao", e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddExercicio}>+ Adicionar Exercício</button>
                <br /><br />
                <button type="submit">Salvar Resolução</button>
            </form>
        </div>
    );
}

export default AdminResolucoes;
