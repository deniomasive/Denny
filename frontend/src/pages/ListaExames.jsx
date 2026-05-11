// src/pages/ListaExames.jsx
import { useParams, Link } from "react-router-dom";
import "../styles/ListaExames.css";

function ListaExames() {
    const { disciplina } = useParams();
    const anos = Array.from({ length: 2026 - 2004 + 1 }, (_, i) => 2026 - i);

    return (
        <div className="lista-container">
            <h2 className="lista-title">
                Exames de {disciplina.charAt(0).toUpperCase() + disciplina.slice(1)}
            </h2>
            <div className="anos-grid">
                {anos.map((ano) => (
                    <Link
                        key={ano}
                        to={`/exames/${disciplina}/${ano}`}   // ✅ bate com App.jsx
                        className="ano-link"
                    >
                        {ano}
                    </Link>

                ))}
            </div>
        </div>
    );
}

export default ListaExames;
