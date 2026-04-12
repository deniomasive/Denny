function Categorias() {
    const categorias = [
        { nome: "Matemática", anos: ["2023", "2024", "2025"] },
        { nome: "Física", anos: ["2023", "2024"] },
        { nome: "Química", anos: ["2022", "2023", "2024"] },
        { nome: "Biologia", anos: ["2023", "2024"] },
    ];

    return (
        <div style={{ maxWidth: "950px", margin: "20px auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center", color: "#1a73e8" }}>Categorias de Exames</h2>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
                Escolha uma disciplina e o ano para ver as resoluções detalhadas.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                {categorias.map((cat, i) => (
                    <div key={i} style={{ background: "#eef3fd", padding: "15px", borderRadius: "8px" }}>
                        <h3 style={{ color: "#0d47a1", marginBottom: "10px" }}>{cat.nome}</h3>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {cat.anos.map((ano, j) => (
                                <li key={j} style={{ marginBottom: "6px" }}>
                                    <a href={`/categorias/${cat.nome.toLowerCase()}/${ano}`} style={{ textDecoration: "none", color: "#1a73e8" }}>
                                        Exame {ano}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categorias;
