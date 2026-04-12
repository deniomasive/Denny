// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";

// componentes básicos
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// páginas
import ListaPostagens from "./pages/ListaPostagens";
import ListaCategorias from "./pages/ListaCategorias";
import PostagemDetalhe from "./pages/PostagemDetalhe";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Exames from "./pages/Exames";
import ListaExames from "./pages/ListaExames";
import VersoesExame from "./pages/VersoesExame";
import ResolucaoExame from "./pages/ResolucaoExame";
import ListaQuizzes from "./pages/ListaQuizzes";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <MathJaxContext>
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />

          <div style={{ flex: 1, padding: "20px" }}>
            <Routes>
              {/* Página inicial */}
              <Route path="/" element={<Home />} />

              {/* Quizzes */}
              <Route path="/quiz" element={<ListaQuizzes />} />
              <Route path="/quiz/:id" element={<QuizPage />} />

              {/* Login e Registro */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />

              {/* Postagens e Categorias */}
              <Route path="/postagens/:slug" element={<PostagemDetalhe />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/categorias" element={<ListaCategorias />} />



              {/* Exames */}
              <Route path="/exames" element={<Exames />} />
              <Route path="/exames/:disciplina" element={<ListaExames />} />
              <Route path="/exames/:disciplina/:ano" element={<VersoesExame />} />
              <Route path="/exames/:disciplina/:ano/:versao" element={<ResolucaoExame />} />

              {/* Rota fallback */}
              <Route path="*" element={<h2>Página não encontrada</h2>} />
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </MathJaxContext>
  );
}

export default App;
