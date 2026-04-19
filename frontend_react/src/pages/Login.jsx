import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        // Salva o usuário (ID, Nome, Email) no navegador para usar no Dashboard
        localStorage.setItem("usuarioLogado", JSON.stringify(dados.usuario));

        alert(`Bem-vindo, ${dados.usuario.nome}!`);
        navigate("/dashboard");
      } else {
        // Exibe "E-mail ou senha inválidos" vindo do seu Controller
        alert(dados.erro);
      }
    } catch (error) {
      console.error("Erro ao conectar:", error);
      alert("Erro ao conectar com o servidor. O backend está ligado?");
    }
  };

  return (
    <main className="auth-main">
      <div className="auth-card">
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
              className="form-input form-input--claro"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
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
