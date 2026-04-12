// src/pages/Home.jsx
function Home() {
    return (
        <div style={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",   // puxa conteúdo para cima
            padding: "60px 40px 40px",
            backgroundColor: "#f5f5f5",
            boxSizing: "border-box"
        }}>
            <h2 style={{
                color: "#e64a19",
                fontSize: "2.5rem",
                marginBottom: "40px",
                textAlign: "center",
                fontWeight: "bold"
            }}>
                Bem-vindo ao Moz-Gondza
            </h2>

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                width: "100%",
                maxWidth: "900px"
            }}>
                {/* Bloco Quizzes */}
                <a href="/quizzes" style={{
                    flex: "1 1 150px",
                    height: "130px",              // quadrado menor
                    backgroundColor: "#ff7043",   // laranja vivo
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    transition: "transform 0.2s, box-shadow 0.2s"
                }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
                    }}>
                    Quizzes
                </a>

                {/* Bloco Resultados */}
                <a href="/resultados" style={{
                    flex: "1 1 150px",
                    height: "130px",
                    backgroundColor: "#e64a19",   // vermelho alaranjado
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    transition: "transform 0.2s, box-shadow 0.2s"
                }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
                    }}>
                    Resultados de Quizzes
                </a>

                {/* Bloco Exames Resolvidos */}
                <a href="/exames" style={{
                    flex: "1 1 150px",
                    height: "130px",
                    backgroundColor: "#d84315",   // tom mais escuro
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    textDecoration: "none",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    transition: "transform 0.2s, box-shadow 0.2s"
                }}
                    onMouseEnter={e => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.25)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.15)";
                    }}>
                    Exames Resolvidos
                </a>
            </div>
        </div>
    );
}

export default Home;
