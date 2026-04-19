import { useState } from "react";

function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensagem enviada!");
  };

  return (
    <div id="root-container">
      <section className="hero-interno">
        <div className="hero-interno-content">
          <h1 className="hero-interno-title">Contato</h1>
          <p className="hero-interno-subtitle">
            Fale com a gente — adoramos ouvir você
          </p>
        </div>
      </section>

      <main className="pagina-conteudo">
        <section className="contato-section">
          <div className="contato-info">
            <h2 className="secao-titulo">Fale Conosco</h2>

            <div className="contato-item">
              {/* CAMINHO NOVO: Sem import, direto da public */}
              <img
                src="/images/email.png"
                alt="E-mail"
                className="contato-icone"
              />
              <div>
                <strong className="contato-label">E-mail</strong>
                <p className="contato-valor">contato@theorganizator.app</p>
              </div>
            </div>

            <div className="contato-item">
              <img
                src="/images/map.png"
                alt="Localização"
                className="contato-icone"
              />
              <div>
                <strong className="contato-label">Localização</strong>
                <p className="contato-valor">Brasil — 100% online</p>
              </div>
            </div>

            <div className="contato-social">
              <strong className="contato-label">Redes Sociais</strong>
              <div className="social-icons contato-social-icons">
                <a href="#" className="social-link">
                  <img src="/images/2 facebook.png" alt="FB" />
                </a>
                <a href="#" className="social-link">
                  <img src="/images/3 instagram.png" alt="IG" />
                </a>
                <a href="#" className="social-link">
                  <img src="/images/5 whatsapp.png" alt="WA" />
                </a>
              </div>
            </div>
          </div>

          <div className="contato-form-wrapper">
            <form className="contato-form" onSubmit={handleSubmit}>
              <div className="form-grupo">
                <label className="form-label">Nome Completo</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div className="form-grupo">
                <label className="form-label">E-mail</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div className="form-grupo">
                <label className="form-label">Mensagem</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Sua mensagem..."
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-create-account btn-form-submit"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Contato;
