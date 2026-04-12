import { useEffect, useState } from "react";

function ListaCategorias() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/categorias")
            .then(res => res.json())
            .then(data => setCategorias(data))
            .catch(err => console.error("Erro ao carregar categorias:", err));
    }, []);

    return (
        <div>
            <h2>Categorias</h2>
            <ul>
                {categorias.map(c => (
                    <li key={c._id}>{c.nome} — slug: {c.slug}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListaCategorias;
