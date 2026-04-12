import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListaPostagens() {
    const [postagens, setPostagens] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/postagens")
            .then(res => res.json())
            .then(data => setPostagens(data))
            .catch(err => console.error("Erro ao carregar postagens:", err));
    }, []);

    return (
        <div>
            <h2>Postagens</h2>
            <ul>
                {postagens.map(p => (
                    <li key={p._id}>
                        <Link to={`/postagens/${p.slug}`}>
                            <strong>{p.titulo}</strong>
                        </Link>
                        <br />
                        {p.descricao}
                        <br />
                        Categoria: {p.categoria?.nome}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaPostagens;
