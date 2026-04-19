function Sobre() {
  return (
    <div id="root-container">
      {/* HERO INTERNO - Barra azul compacta */}
      <section className="hero-interno">
        <div className="hero-interno-content">
          <h1 className="hero-interno-title">Sobre Nós</h1>
          <p className="hero-interno-subtitle">
            Conheça a nossa missão e quem está por trás do The Organizator
          </p>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="pagina-conteudo">
        {/* SEÇÃO: Quem Somos */}
        <section className="sobre-intro">
          <div className="sobre-intro-texto">
            <h2 className="secao-titulo">Quem Somos</h2>
            <p className="secao-texto">
              O <strong>The Organizator</strong> nasceu da necessidade real de
              pessoas que queriam organizar melhor sua rotina — sem complicação,
              sem excesso, sem aprender uma ferramenta nova a cada semana.
            </p>
            <p className="secao-texto">
              Somos uma equipe apaixonada por produtividade e design, dedicada a
              criar uma experiência de gerenciamento de tarefas que seja ao
              mesmo tempo poderosa e intuitiva.
            </p>
          </div>
        </section>

        {/* SEÇÃO: Nossa Equipe */}
        <section className="equipe-section">
          <h2 className="secao-titulo secao-titulo--centralizado">
            Nossa Equipe
          </h2>
          <p className="secao-texto secao-texto--centralizado">
            Pessoas reais, apaixonadas por organização e tecnologia.
          </p>

          <div className="equipe-grid">
            {/* Card 1: Gilvan */}
            <div className="equipe-card">
              <img
                src="/images/Gil.jpg"
                alt="Gilvan Silva"
                className="equipe-foto"
              />
              <h4 className="equipe-nome">Gilvan Silva</h4>
              <span className="equipe-cargo">
                Tech Lead / Desenvolvedor Full Stack
              </span>
              <p className="equipe-bio">
                Responsável pela arquitetura e integridade do código, atuando no
                desenvolvimento global para garantir um sistema robusto e
                organizado.
              </p>
            </div>

            {/* Card 2: Rafael */}
            <div className="equipe-card">
              <img
                src="/images/Rafael_Portela.jpeg"
                alt="Rafael Portela"
                className="equipe-foto"
              />
              <h4 className="equipe-nome">Rafael Portela</h4>
              <span className="equipe-cargo">Cargo / Função</span>
              <p className="equipe-bio">
                Breve descrição sobre o membro, sua experiência e paixão pelo
                projeto.
              </p>
            </div>

            {/* Card 3: Victor */}
            <div className="equipe-card">
              <img
                src="/images/Victor_mafra.jpeg"
                alt="Victor Mafra"
                className="equipe-foto"
              />
              <h4 className="equipe-nome">Victor Mafra</h4>
              <span className="equipe-cargo">Desenvolvedor Back-end</span>
              <p className="equipe-bio">
                Breve descrição sobre o membro, sua experiência e paixão pelo
                projeto.
              </p>
            </div>

            {/* Card 4: Rodrigo */}
            <div className="equipe-card">
              <img
                src="/images/Rodrigo.jpeg"
                alt="Rodrigo Alexandre"
                className="equipe-foto"
              />
              <h4 className="equipe-nome">Rodrigo Alexandre</h4>
              <span className="equipe-cargo">Desenvolvedor Front-end</span>
              <p className="equipe-bio">
                Responsável pela interface do sistema, focado em usabilidade e
                experiência do usuário.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Sobre;
