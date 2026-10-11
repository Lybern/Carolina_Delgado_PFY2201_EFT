import { useState } from 'react';

/**
 * Banner de promociones y ofertas especiales con renderizado condicional mediante useState.
 */
export const OffersBanner = () => {
  const [mostrarOfertas, setMostrarOfertas] = useState(false);

  return (
    <section id="destacados" className="py-4 my-2" aria-label="Promociones y ofertas">
      <div className="container">
        <div className="card offers-card border-0 p-4 p-md-4 text-light">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-lg-8">
              <div className="d-flex align-items-center gap-3 mb-2 flex-wrap">
                <img
                  src="./assets/img/erigames-cat-icon-hd.png"
                  alt="EriGames Logo"
                  className="banner-cat-icon-glow"
                />
                <h2 className="display-6 fw-bold mb-0 text-orange-gamer">
                  OFERTAS IMPERDIBLES DE LA SEMANA
                </h2>
              </div>
              <p className="lead mb-0 text-secondary">
                Aprovecha descuentos de temporada, preventas y beneficios exclusivos para la comunidad gamer.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button
                type="button"
                className="btn btn-gamer-orange px-4 py-2"
                onClick={() => setMostrarOfertas(!mostrarOfertas)}
              >
                {mostrarOfertas ? '✖ Ocultar Ofertas' : 'Ver Ofertas Imperdibles'}
              </button>
            </div>
          </div>

          {/* Renderizado condicional de la sección de ofertas especiales */}
          {mostrarOfertas && (
            <div
              id="seccion-ofertas"
              className="mt-4 p-3 p-md-4 rounded-3 shadow-sm border border-warning"
              style={{ background: 'rgba(15, 23, 42, 0.95)' }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div>
                  <h3 className="h5 fw-bold text-white mb-1">
                    <span className="text-warning me-2">⚡</span> ¡Descuentos Destacados en Videojuegos!
                  </h3>
                  <p className="mb-0 text-muted">
                    Aprovecha hasta un <strong className="text-warning">25% de descuento</strong> en títulos seleccionados para Nintendo Switch, PS5 y PC.
                  </p>
                </div>
                <span className="badge bg-warning text-dark fw-bold fs-6 p-2">Válido hasta agotar stock</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OffersBanner;
