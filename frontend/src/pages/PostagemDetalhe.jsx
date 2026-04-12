import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function PostagemDetalhe() {
    const { slug } = useParams();
    const [postagem, setPostagem] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/categorias/${slug}`)
            .then(res => res.json())
            .then(data => setPostagem(data))
            .catch(err => console.error("Erro ao carregar postagem:", err));
    }, [slug]);

    if (!postagem) return <p>Carregando...</p>;

    return (
        <div>
            <h2>{postagem.categoria.nome}</h2>
            <ul>
                {postagem.postagens.map(p => (
                    <li key={p._id}>
                        <strong>{p.titulo}</strong>
                        <p>{p.conteudo}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostagemDetalhe;
