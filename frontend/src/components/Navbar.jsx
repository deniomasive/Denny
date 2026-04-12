// src/components/Navbar.jsx
function Navbar() {
    return (
        <nav style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#d65c30",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            color: "#fff",
            boxSizing: "border-box"
        }}>
            <h1 style={{ fontSize: "1.5rem", margin: 0 }}>Moz-Gondza</h1>
            <ul style={{
                display: "flex",
                flexWrap: "wrap",   // permite quebrar linha se não couber
                gap: "15px",        // reduz espaço entre links
                listStyle: "none",
                margin: 0,
                padding: 0
            }}>
                <li><a href="/" style={{ color: "#fff", textDecoration: "none" }}>Home</a></li>
                <li><a href="/exames" style={{ color: "#fff", textDecoration: "none" }}>Exames Resolvidos</a></li>
                <li><a href="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</a></li>
                <li><a href="/registro" style={{ color: "#fff", textDecoration: "none" }}>Registro</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
