function Registro() {
    return (
        <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
            <h2 style={{ textAlign: "center", color: "#1a73e8" }}>Registro</h2>
            <form style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input type="text" placeholder="Nome" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
                <input type="email" placeholder="Email" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
                <input type="password" placeholder="Senha" style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }} />
                <button style={{ padding: "10px", backgroundColor: "#1a73e8", color: "#fff", border: "none", borderRadius: "6px" }}>
                    Registrar
                </button>
            </form>
        </div>
    );
}

export default Registro;
