import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function QuizPage() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/quiz/${id}`)
            .then(res => res.json())
            .then(data => setQuiz(data));
    }, [id]);

    if (!quiz) return <p>Carregando...</p>;

    return (
        <div>
            <h2>{quiz.pergunta}</h2>
            <ul>
                {quiz.opcoes.map((opcao, i) => (
                    <li key={i}>{opcao}</li>
                ))}
            </ul>
        </div>
    );
}

export default QuizPage;
