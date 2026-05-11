import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/ListaExames.css";

function VersoesExame() {
    const { disciplina, ano } = useParams();
    const [versoes, setVersoes] = useState([]);

    useEffect(() => {
        fetch(`/api/exames/${disciplina}/${ano}`)
            .then(res => res.json())
            .then(data => setVersoes(data.versoes || []))
            .catch(err => console.error("Erro ao carregar versões:", err));
    }, [disciplina, ano]);

    return (
        <div className="lista-container">
            <h2 className="lista-title">
                {disciplina.charAt(0).toUpperCase() + disciplina.slice(1)} - {ano}
            </h2>
            <div className="anos-grid">
                {versoes.length > 0 ? (
                    versoes.map(v => (
                        <Link
                            key={v}
                            to={`/exames/${disciplina}/${ano}/${v}`}
                            className="ano-link"
                        >
                            Versão {v}
                        </Link>
                    ))
                ) : (
                    <p> Nenhuma versão encontrada para este ano. </p>
                )}


            </div>
        </div>
    );
}

export default VersoesExame;
