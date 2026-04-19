import { Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import Cadastro from "./pages/Cadastro"; // No topo

// Estilos
import "./assets/style.css";

function App() {
  return (
    <div id="root-container">
      {/* NAVBAR FIXA */}
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          <img
            src="/images/1 logo img.jpeg"
            alt="Img Logo"
            className="logo-icon"
          />
          <span className="brand-name">The_Organizator</span>
        </Link>

        <ul className="navbar-nav">
          <li>
            <NavLink to="/" className="nav-link" end>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/sobre" className="nav-link">
              SOBRE NÓS
            </NavLink>
          </li>
          <li>
            <NavLink to="/contato" className="nav-link">
              CONTATO
            </NavLink>
          </li>
        </ul>

        <div className="navbar-actions">
          <Link to="/login" className="btn btn-login">
            LOGIN
          </Link>
          <Link to="/cadastro" className="btn btn-create-account">
            CRIE SUA CONTA GRATUITA
          </Link>
        </div>
      </nav>

      {/* ÁREA DINÂMICA */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>

      {/* FOOTER FIXO - Agora com 2 colunas para alinhar certo */}
      <footer className="footer">
        <div className="footer-column">
          <h3 className="footer-title">Sobre nós</h3>
          <p className="footer-text">
            Ajudamos as pessoas a organizarem suas vidas através de um
            gerenciador de tarefas simples, prático e bonito.
          </p>
        </div>

        <div className="footer-column footer-column--right">
          <h3 className="footer-title">Contato</h3>
          <p className="footer-text">
            <strong>Dúvidas ou sugestões?</strong>
          </p>
          <p className="footer-text footer-email">contato@theorganizator.app</p>

          <div className="social-icons">
            <a href="#" className="social-link" title="Facebook">
              <img src="/images/2 facebook.png" alt="Facebook" />
            </a>
            <a href="#" className="social-link" title="Instagram">
              <img src="/images/3 instagram.png" alt="Instagram" />
            </a>
            <a href="#" className="social-link" title="WhatsApp">
              <img src="/images/5 whatsapp.png" alt="WhatsApp" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
