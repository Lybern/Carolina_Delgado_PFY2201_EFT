/**
 * Banner Hero y destacados promocionales de EriGamesStore
 */
export const HeroBanner = () => {
  return (
    <section id="inicio" className="py-5" style={{ background: 'linear-gradient(180deg, #111a2e 0%, #0a0f1d 100%)' }}>
      <div className="container py-4">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-7">
            <span className="badge bg-primary text-uppercase px-3 py-2 rounded-pill fw-bold mb-3 shadow-sm">
              <i className="bi bi-lightning-charge-fill me-1 text-warning"></i> Nivel Épico • Temporada 2026
            </span>
            <h1 className="display-4 fw-extrabold text-white mb-3" style={{ lineHeight: '1.15' }}>
              Los mejores títulos al <span style={{ color: 'var(--accent-cyan)' }}>mejor precio gamer</span>
            </h1>
            <p className="lead text-secondary mb-4">
              Encuentra lanzamientos exclusivos para <strong>PlayStation 5</strong>, <strong>Nintendo Switch</strong>, <strong>Xbox Series X</strong> y <strong>PC</strong>. Entregas digitales y físicas garantizadas.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a href="#catalogo" className="btn btn-gamer-cyan">
                <i className="bi bi-controller me-2"></i> Explorar Catálogo
              </a>
              <a href="#destacados" className="btn btn-outline-light rounded-3 px-4 py-2 fw-semibold">
                <i className="bi bi-tag me-2 text-warning"></i> Ofertas Especiales
              </a>
            </div>

            {/* Badges de plataformas compatibles */}
            <div className="d-flex align-items-center gap-3 mt-4 pt-3 border-top border-secondary">
              <span className="small text-muted text-uppercase fw-bold">Plataformas:</span>
              <span className="badge bg-dark border border-secondary text-light">PS5</span>
              <span className="badge bg-dark border border-secondary text-light">Xbox Series</span>
              <span className="badge bg-dark border border-secondary text-light">Nintendo Switch</span>
              <span className="badge bg-dark border border-secondary text-light">PC Master Race</span>
            </div>
          </div>

          <div className="col-12 col-lg-5 text-center">
            <div className="position-relative p-2 rounded-4 overflow-hidden shadow-lg border border-primary" style={{ background: '#17223b' }}>
              <img
                src="./assets/img/zelda-totk.jpg"
                alt="Juego de la Semana en EriGamesStore"
                className="img-fluid rounded-3 shadow"
                style={{ maxHeight: '380px', objectFit: 'cover', width: '100%' }}
              />
              <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-dark bg-opacity-75 backdrop-blur">
                <span className="badge bg-warning text-dark fw-bold mb-1">Juego de la Semana</span>
                <h5 className="text-white mb-0">Zelda: Tears of the Kingdom</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
