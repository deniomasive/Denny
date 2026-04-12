// src/pages/VersoesExame.jsx
import { useParams } from "react-router-dom";
import "../styles/ListaExames.css";

function VersoesExame() {
    const { disciplina, ano } = useParams();
    const anoNum = parseInt(ano, 10);

    if (anoNum < 2020) {
        return (
            <div className="lista-container">
                <h2 className="lista-title">
                    {disciplina.charAt(0).toUpperCase() + disciplina.slice(1)} - {ano}
                </h2>
                <p style={{ marginTop: "20px", fontSize: "1.2rem", color: "#555" }}>
                    Exame único disponível para este ano.
                </p>
            </div>
        );
    }

    const versoes = ["1", "2", "3"];

    return (
        <div className="lista-container">
            <h2 className="lista-title">
                {disciplina.charAt(0).toUpperCase() + disciplina.slice(1)} - {ano}
            </h2>
            <div className="anos-grid">
                {versoes.map((v) => (
                    <a
                        key={v}
                        href={`/exames/${disciplina}/${ano}/${v}`}
                        className="ano-link"
                    >
                        {disciplina} {v}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default VersoesExame;
