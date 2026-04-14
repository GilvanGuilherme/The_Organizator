import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulação de login para teste local
    console.log("Login enviado:", { email, senha });

    // Credenciais de teste
    if (email === "teste@teste.com" && senha === "123456") {
      navigate("/dashboard");
    } else {
      alert("Para testar, use:\nE-mail: teste@teste.com\nSenha: 123456");
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-card">
        {/* Logo vinda da pasta public/images/ */}
        <img
          src="/images/1 logo img.jpeg"
          alt="The Organizator"
          className="auth-logo"
        />

        <h1 className="auth-titulo">Bem-vindo de volta!</h1>
        <p className="auth-subtitulo">Faça login para acessar suas tarefas</p>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-grupo">
            <label htmlFor="email" className="form-label form-label--claro">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input form-input--claro"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              name="senha"
              className="form-input form-input--claro"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <div className="auth-forgot">
            <Link
              to="/recuperar-senha"
              title="Esqueci minha senha"
              className="auth-link"
            >
              Esqueci minha senha
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-create-account btn-form-submit"
          >
            Entrar
          </button>
        </form>

        <div className="auth-divisor">
          <span>ou</span>
        </div>

        <p className="auth-redirect">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="auth-link auth-link--destaque">
            Crie grátis agora
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
