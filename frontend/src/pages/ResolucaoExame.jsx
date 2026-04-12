// src/pages/ResolucaoExame.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "./ResolucaoExame.css";

const config = {
    loader: {
        load: [
            "input/tex",
            "output/chtml",
            "[tex]/ams",
            "[tex]/color",
            "[tex]/textmacros"
        ]
    },
    tex: {
        packages: { "[+]": ["ams", "color", "textmacros"] }
    }
};

function ResolucaoExame() {
    const { disciplina, ano, versao } = useParams();
    const [exame, setExame] = useState(null);
    const [conteudos, setConteudos] = useState({});

    useEffect(() => {
        fetch(`/api/resolucoes/${disciplina}/${ano}/${versao}`)
            .then(res => res.json())
            .then(async data => {
                setExame(data);

                const loaded = {};
                for (const ex of data.conteudo) {
                    if (ex.resolucao_file) {
                        const res = await fetch(
                            `/resolucoes/${disciplina}/${ano}/${versao}/${ex.resolucao_file}`
                        );
                        loaded[ex.numero] = await res.text();
                    } else if (ex.resolucao) {
                        loaded[ex.numero] = ex.resolucao;
                    }
                }
                setConteudos(loaded);
            })
            .catch(err => console.error("Erro ao carregar exame:", err));
    }, [disciplina, ano, versao]);

    if (!exame) return <p>Carregando...</p>;

    return (
        <MathJaxContext config={config}>
            <div>
                <h2>
                    Exame {exame.ano} — {exame.disciplina} (Versão {exame.versao})
                </h2>
                {exame.conteudo.map((ex) => (
                    <div key={ex.numero} className="exercicio">
                        <h3>Exercício {ex.numero}</h3>
                        <div className="solucao">
                            <MathJax dynamic>{conteudos[ex.numero]}</MathJax>
                        </div>
                    </div>
                ))}
            </div>
        </MathJaxContext>
    );
}

export default ResolucaoExame;
