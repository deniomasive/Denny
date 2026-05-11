import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./ResolucaoExame.css";

const config = {
    loader: { load: ["input/tex", "output/chtml", "[tex]/ams", "[tex]/color", "[tex]/textmacros"] },
    tex: { packages: { "[+]": ["ams", "color", "textmacros"] } }
};

function ResolucaoExame() {
    const { disciplina, ano, versao } = useParams();
    const [exame, setExame] = useState(null);

    useEffect(() => {
        fetch(`/exames/${disciplina}/${ano}/${versao}`)
            .then(res => res.json())
            .then(data => setExame(data))
            .catch(err => console.error("Erro ao carregar exame:", err));
    }, [disciplina, ano, versao]);

    if (!exame) return <p>Carregando...</p>;

    return (
        <MathJaxContext config={config}>
            <div>
                <h2>
                    Exame {exame.ano} — {exame.disciplina} (Versão {exame.versao})
                </h2>
                {exame.conteudo.map(ex => (
                    <div key={ex.numero} className="exercicio">
                        <h3>Exercício {ex.numero}</h3>
                        <p>{ex.enunciado}</p>
                        {ex.resolucao && (
                            <div className="solucao">
                                <MathJax dynamic>{`$$${ex.resolucao}$$`}</MathJax>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </MathJaxContext>
    );
}

export default ResolucaoExame;
