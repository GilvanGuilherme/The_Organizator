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

  const handleCadastro = async (e) => {
    e.preventDefault();

    // 1. Validação visual/simples antes de enviar
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      // 2. Chamada para o seu BACK-END real usando FETCH
      const resposta = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const dados = await resposta.json();

      // 3. Verificação da resposta do servidor
      if (resposta.ok) {
        alert("Conta criada com sucesso!");
        navigate("/login"); // Redireciona para o login
      } else {
        // Exibe o erro vindo do banco (ex: email já cadastrado)
        alert("Erro: " + (dados.erro || "Falha ao cadastrar"));
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("Não foi possível conectar ao servidor. O backend está ligado?");
    }
  };

  return (
    <main className="auth-main">
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
            <label className="form-label form-label--claro">
              Nome Completo
            </label>
            <input
              type="text"
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
            <label className="form-label form-label--claro">E-mail</label>
            <input
              type="email"
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
            <label className="form-label form-label--claro">Senha</label>
            <input
              type="password"
              className="form-input form-input--claro"
              placeholder="Mínimo 8 caracteres"
              value={formData.senha}
              onChange={(e) =>
                setFormData({ ...formData, senha: e.target.value })
              }
              required
            />
          </div>

          <div className="form-grupo">
            <label className="form-label form-label--claro">
              Confirmar Senha
            </label>
            <input
              type="password"
              className="form-input form-input--claro"
              placeholder="Repita a senha"
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
              <Link to="#" className="auth-link">
                Termos de Uso
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
