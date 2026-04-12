// src/pages/exames/Matematica.jsx
function Matematica() {
    const anos = Array.from({ length: 2026 - 2004 + 1 }, (_, i) => 2004 + i);

    return (
        <div style={{ padding: "40px" }}>
            <h2 style={{ color: "#e64a19", marginBottom: "20px" }}>Exames de Matemática</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {anos.map((ano) => (
                    <li key={ano} style={{ marginBottom: "10px" }}>
                        <a href={`/exames/matematica/${ano}`} style={{ color: "#ff7043", textDecoration: "none" }}>
                            {ano}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Matematica;
