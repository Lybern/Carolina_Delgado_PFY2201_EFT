import { useState } from 'react';

/**
 * Banner de promociones y ofertas especiales con renderizado condicional mediante useState.
 */
export const OffersBanner = () => {
  const [mostrarOfertas, setMostrarOfertas] = useState(false);

  return (
    <section className="py-4 my-2">
      <div className="container">
        <div className="card offers-card border-0 p-4 p-md-4 text-light">
          <div className="row align-items-center justify-content-between g-3">
            <div className="col-lg-8">
              <h2 className="display-6 fw-bold text-info mb-2">🔥 Promociones y Ofertas Especiales</h2>
              <p className="lead mb-0 text-secondary">
                Aprovecha descuentos de temporada, preventas y beneficios exclusivos para la comunidad gamer.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <button
                type="button"
                className="btn btn-gamer-cyan px-4 py-2"
                onClick={() => setMostrarOfertas(!mostrarOfertas)}
              >
                {mostrarOfertas ? '✖ Ocultar Ofertas' : '🔥 Ver Ofertas Especiales'}
              </button>
            </div>
          </div>

          {/* Renderizado condicional de la sección de ofertas especiales */}
          {mostrarOfertas && (
            <div
              id="seccion-ofertas"
              className="mt-4 p-3 p-md-4 rounded-3 shadow-sm border border-info"
              style={{ background: '#111a2e' }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                <div>
                  <h3 className="h5 fw-bold text-white mb-1">🎉 ¡Descuentos de la Semana para Gamers!</h3>
                  <p className="mb-0 text-muted">
                    Aprovecha hasta un <strong>25% de descuento</strong> en títulos seleccionados para Nintendo Switch y PS5.
                  </p>
                </div>
                <span className="badge bg-danger fs-6 p-2">Válido hasta agotar stock</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OffersBanner;
