/**
 * Modal accesible de ficha técnica y detalles del videojuego.
 * Adaptado de Felimiau con temática Dark Gamer.
 */
export const ProductDetailModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const precio = product.precio || product.price || 0;
  const precioNormal = product.precioNormal || Math.round(precio * 1.15);
  const descuento = product.precioNormal
    ? Math.round(((product.precioNormal - precio) / product.precioNormal) * 100)
    : 15;
  const img = product.img || product.imagen?.src || './assets/img/zelda-totk.jpg';
  const nombre = product.nombre || product.nameProduct;

  return (
    <>
      <div
        className="modal fade show d-block modal-dialog-custom"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modalTituloGamer"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content modal-content-gamer text-light">
            {/* Header del Modal */}
            <div className="modal-header modal-header-gamer">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-controller fs-4 text-info"></i>
                <h5 className="modal-title fw-bold text-white mb-0" id="modalTituloGamer">
                  Ficha Técnica del Videojuego
                </h5>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Cerrar modal"
                onClick={onClose}
              ></button>
            </div>

            {/* Cuerpo del Modal */}
            <div className="modal-body p-4">
              <div className="row g-4 align-items-center">
                {/* Portada */}
                <div className="col-12 col-md-5 text-center">
                  <div className="position-relative rounded-3 overflow-hidden shadow-lg border border-secondary">
                    {product.badge && (
                      <span className={`badge bg-${product.badgeColor || 'primary'} position-absolute top-0 start-0 m-2 z-1 fw-bold`}>
                        {product.badge}
                      </span>
                    )}
                    {descuento > 0 && (
                      <span className="badge bg-danger position-absolute top-0 end-0 m-2 z-1 fw-bold">
                        -{descuento}% OFF
                      </span>
                    )}
                    <img
                      src={img}
                      alt={nombre}
                      className="img-fluid rounded-2"
                      style={{ maxHeight: '340px', objectFit: 'cover', width: '100%' }}
                    />
                  </div>
                </div>

                {/* Detalles y Ficha Técnica */}
                <div className="col-12 col-md-7">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-primary text-uppercase">{product.plataforma}</span>
                    <span className="badge bg-secondary text-uppercase">{product.categoria}</span>
                  </div>

                  <h3 className="h4 fw-bold text-white mb-2">{nombre}</h3>
                  <p className="text-muted small mb-3">{product.descripcion}</p>

                  {/* Precios */}
                  <div className="d-flex align-items-baseline gap-3 mb-3 p-3 bg-dark rounded-3 border border-secondary">
                    <span className="text-muted text-decoration-line-through small">
                      Normal: ${precioNormal.toLocaleString('es-CL')}
                    </span>
                    <span className="h4 fw-bold text-info mb-0">
                      ${precio.toLocaleString('es-CL')} CLP
                    </span>
                  </div>

                  {/* Ficha Técnica */}
                  {product.especificaciones && (
                    <div className="modal-spec-box small">
                      <h6 className="fw-bold text-info border-bottom border-secondary pb-2 mb-2">
                        <i className="bi bi-info-circle me-1"></i> Especificaciones del Juego
                      </h6>
                      <ul className="list-unstyled mb-0 d-flex flex-column gap-1 text-secondary">
                        <li>
                          <strong className="text-light">Género:</strong> {product.especificaciones.genero}
                        </li>
                        <li>
                          <strong className="text-light">Desarrollador:</strong> {product.especificaciones.desarrollador}
                        </li>
                        <li>
                          <strong className="text-light">Idiomas:</strong> {product.especificaciones.idioma}
                        </li>
                        <li>
                          <strong className="text-light">Espacio Requerido:</strong> {product.especificaciones.tamano}
                        </li>
                        <li>
                          <strong className="text-light">Clasificación:</strong> {product.especificaciones.clasificacion}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer de Acciones */}
            <div className="modal-footer border-top border-secondary p-3 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-secondary px-4 fw-semibold"
                onClick={onClose}
              >
                Volver al catálogo
              </button>
              <button
                type="button"
                className="btn btn-gamer-cyan px-4"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                <i className="bi bi-cart-plus-fill me-2"></i> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="modal-backdrop fade show modal-backdrop-custom" onClick={onClose}></div>
    </>
  );
};

export default ProductDetailModal;
