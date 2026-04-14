import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    aceitarTermos: false,
  });

  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();

    // Validação básica de senha (lógica que estava no seu app.js)
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log("Dados de cadastro:", formData);
    alert("Conta criada com sucesso! (Simulação)");
    navigate("/login");
  };

  return (
    <main className="auth-main">
      {/* Note a classe extra auth-card--cadastro conforme seu HTML */}
      <div className="auth-card auth-card--cadastro">
        <img
          src="/images/1 logo img.jpeg"
          alt="The Organizator"
          className="auth-logo"
        />
        <h1 className="auth-titulo">Crie sua conta grátis</h1>
        <p className="auth-subtitulo">Comece a organizar sua vida hoje mesmo</p>

        <form className="auth-form" onSubmit={handleCadastro}>
          <div className="form-grupo">
            <label htmlFor="nome" className="form-label form-label--claro">
              Nome Completo
            </label>
            <input
              type="text"
              id="nome"
              className="form-input form-input--claro"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              required
            />
          </div>

          <div className="form-grupo">
            <label htmlFor="email" className="form-label form-label--claro">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="form-input form-input--claro"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-grupo">
            <label htmlFor="senha" className="form-label form-label--claro">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              className="form-input form-input--claro"
              placeholder="Mínimo 8 caracteres"
              minlength="8"
              value={formData.senha}
              onChange={(e) =>
                setFormData({ ...formData, senha: e.target.value })
              }
              required
            />
          </div>

          <div className="form-grupo">
            <label
              htmlFor="confirmar_senha"
              className="form-label form-label--claro"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmar_senha"
              className="form-input form-input--claro"
              placeholder="Repita a senha"
              minlength="8"
              value={formData.confirmarSenha}
              onChange={(e) =>
                setFormData({ ...formData, confirmarSenha: e.target.value })
              }
              required
            />
          </div>

          <div className="form-grupo form-grupo--checkbox">
            <input
              type="checkbox"
              id="aceitar_termos"
              className="form-checkbox"
              checked={formData.aceitarTermos}
              onChange={(e) =>
                setFormData({ ...formData, aceitarTermos: e.target.checked })
              }
              required
            />
            <label htmlFor="aceitar_termos" className="form-label-checkbox">
              Concordo com os{" "}
              <Link to="/termos" className="auth-link">
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link to="/privacidade" className="auth-link">
                Política de Privacidade
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-create-account btn-form-submit"
          >
            Criar Conta Gratuita
          </button>
        </form>

        <div className="auth-divisor">
          <span>ou</span>
        </div>

        <p className="auth-redirect">
          Já tem uma conta?{" "}
          <Link to="/login" className="auth-link auth-link--destaque">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Cadastro;
