/**
 * Pie de página institucional y temático para EriGamesStore.
 */
export const Footer = () => {
  return (
    <footer className="py-5" style={{ background: '#070b14', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="container">
        <div className="row g-4 justify-content-between">
          <div className="col-12 col-md-5">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="./assets/img/erigames-cat-icon-hd.png"
                alt="Logo EriGamesStore"
                style={{ width: '36px', height: '36px', borderRadius: '10px' }}
              />
              <span className="brand-text fs-5">EriGamesStore</span>
            </div>
            <p className="text-muted small mb-3">
              Tu tienda online especializada en videojuegos originales, consolas y accesorios gamer con los mejores precios y despacho a todo Chile.
            </p>
            <p className="text-secondary small mb-0">
              Desarrollado con ❤️ por <strong>Carolina Delgado</strong>.
            </p>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-white fw-bold mb-3">Navegación Rápida</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>
                <a href="#inicio" className="text-muted text-decoration-none hover-cyan">Inicio</a>
              </li>
              <li>
                <a href="#catalogo" className="text-muted text-decoration-none hover-cyan">Catálogo de Juegos</a>
              </li>
              <li>
                <a href="#destacados" className="text-muted text-decoration-none hover-cyan">Promociones</a>
              </li>
              <li>
                <a href="#contacto" className="text-muted text-decoration-none hover-cyan">Soporte y Contacto</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="text-white fw-bold mb-3">Garantía Gamer</h6>
            <ul className="list-unstyled small text-muted d-flex flex-column gap-2">
              <li><i className="bi bi-shield-check text-info me-2"></i> 100% Productos Originales</li>
              <li><i className="bi bi-truck text-success me-2"></i> Despacho Rápido en Chile</li>
              <li><i className="bi bi-lock-fill text-warning me-2"></i> Pago Seguro Encriptado</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-muted small gap-2">
          <span>&copy; 2026 EriGamesStore (EGS). Todos los derechos reservados.</span>
          <span>Pasión por los videojuegos • Compra 100% segura</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
