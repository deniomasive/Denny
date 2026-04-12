// src/pages/Exames.jsx
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
                    <a
                        key={disciplina}
                        href={`/exames/${disciplina.toLowerCase()}`}
                        className="exame-link"
                    >
                        {disciplina}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Exames;
