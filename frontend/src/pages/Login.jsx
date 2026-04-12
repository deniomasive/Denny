// src/pages/Login.jsx
function Login() {
    return (
        <div style={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            padding: "20px"
        }}>
            <h2 style={{ color: "#1a73e8", marginBottom: "20px", fontSize: "2rem" }}>
                Login
            </h2>
            <form style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
                maxWidth: "400px"   // limita só o formulário para não ficar gigante em telas largas
            }}>
                <input
                    type="email"
                    placeholder="Email"
                    style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
                />
                <button
                    style={{
                        padding: "12px",
                        backgroundColor: "#1a73e8",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;
