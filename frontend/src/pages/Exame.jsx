// src/pages/Exame.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const config = {
    loader: {
        load: ["input/tex", "output/chtml", "[tex]/ams", "[tex]/color", "[tex]/textmacros"]
    },
    tex: {
        packages: { "[+]": ["ams", "color", "textmacros"] }
    }
};

function Exame() {
    const { disciplina, ano, versao } = useParams();
    const [exame, setExame] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/exames/${disciplina}/${ano}/${versao}`)
            .then(res => res.json())
            .then(data => setExame(data))
            .catch(err => console.error("Erro ao buscar exame:", err));
    }, [disciplina, ano, versao]);

    if (!exame) return <p>Carregando...</p>;

    return (
        <MathJaxContext config={config}>
            <div className="exame-container">
                <h2>
                    {exame.disciplina.toUpperCase()} — {exame.ano} (Versão {exame.versao})
                </h2>

                {exame.conteudo.map(ex => (
                    <div key={ex._id} className="exercicio">
                        <h3>Exercício {ex.numero}</h3>
                        <p className="enunciado">{ex.enunciado}</p>

                        {ex.resolucao && (
                            <div className="solucao">
                                <MathJax dynamic>{String(ex.resolucao)}</MathJax>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </MathJaxContext>
    );
}

export default Exame;
