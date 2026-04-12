import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%"
        }}>
            <Navbar />
            <main style={{ flex: 1, width: "100%", padding: "20px" }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;
