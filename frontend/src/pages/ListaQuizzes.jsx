import { useEffect, useState } from "react";

function ListaQuizzes() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/quizzes")
            .then(res => res.json())
            .then(data => setQuizzes(data))
            .catch(err => console.error("Erro ao carregar quizzes:", err));
    }, []);

    return (
        <div>
            <h2>Lista de Quizzes</h2>
            <ul>
                {quizzes.map(q => (
                    <li key={q.id}>{q.titulo}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListaQuizzes;
