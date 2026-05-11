// src/pages/Exames.jsx
import { Link } from "react-router-dom";
import "../styles/Exames.css";

function Exames() {
    const disciplinas = [
        "Matematica", "Fisica", "Quimica", "Biologia",
        "Historia", "Geografia", "Portugues", "Ingles"
    ];

    return (
        <div className="exames-container">
            <h2 className="exames-title">Exames por Disciplina</h2>
            <div className="exames-grid">
                {disciplinas.map((disciplina) => (
                    <Link
                        key={disciplina}
                        to={`/exames/${disciplina.toLowerCase()}`}
                        className="exame-link"
                    >
                        {disciplina}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Exames;
