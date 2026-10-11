import { useState, useEffect, useRef } from 'react';

/**
 * Componente Header para EriGamesStore.
 * Integra barra de navegación responsiva, buscador en tiempo real
 * y menú desplegable interactivo del carrito de compras (Felimiau pattern).
 */
export const Header = ({
  allProducts = [],
  setAllProducts,
  total = 0,
  setTotal,
  countProducts = 0,
  setCountProducts,
  searchTerm = '',
  setSearchTerm = () => {},
}) => {
  const [active, setActive] = useState(false);
  const cartRef = useRef(null);

  // Cerrar el carrito si se hace clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setActive(false);
      }
    };
    if (active) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [active]);

  // Eliminar un producto individual del carrito
  const onDeleteProduct = (product) => {
    const updated = allProducts.filter((item) => item.id !== product.id);
    const precio = product.precio || product.price || 0;
    setTotal(Math.max(0, total - precio * product.quantity));
    setCountProducts(Math.max(0, countProducts - product.quantity));
    setAllProducts(updated);
  };

  // Incrementar cantidad
  const onIncreaseQuantity = (product) => {
    const updated = allProducts.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    const precio = product.precio || product.price || 0;
    setTotal(total + precio);
    setCountProducts(countProducts + 1);
    setAllProducts(updated);
  };

  // Decrementar cantidad
  const onDecreaseQuantity = (product) => {
    const precio = product.precio || product.price || 0;
    if (product.quantity > 1) {
      const updated = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setTotal(Math.max(0, total - precio));
      setCountProducts(Math.max(0, countProducts - 1));
      setAllProducts(updated);
    } else {
      onDeleteProduct(product);
    }
  };

  // Vaciar carrito
  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  return (
    <header className="sticky-top navbar-custom">
      <nav className="navbar navbar-expand-lg navbar-dark py-2" aria-label="Navegación principal">
        <div className="container">
          {/* Brand / Logo */}
          <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
            <img
              src="./assets/img/erigames-cat-icon-hd.png"
              alt="Logo EriGamesStore"
              className="brand-logo-img"
            />
            <span className="brand-text">EriGamesStore</span>
          </a>

          {/* Botón Toggler para móvil */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuGamer"
            aria-controls="menuGamer"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú de navegación y controles */}
          <div className="collapse navbar-collapse" id="menuGamer">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3">
              <li className="nav-item">
                <a className="nav-link text-light fw-semibold" href="#inicio">
                  <i className="bi bi-house-door me-1 text-primary"></i> Inicio
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light fw-semibold" href="#catalogo">
                  <i className="bi bi-controller me-1 text-info"></i> Videojuegos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light fw-semibold" href="#destacados">
                  <i className="bi bi-fire me-1 text-warning"></i> Ofertas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-light fw-semibold" href="#contacto">
                  <i className="bi bi-envelope me-1 text-success"></i> Contacto
                </a>
              </li>
            </ul>

            {/* Buscador reactivo en tiempo real */}
            <form
              className="d-flex me-lg-3 my-2 my-lg-0 flex-grow-1 flex-lg-grow-0"
              style={{ maxWidth: '320px' }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-info">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  className="form-control form-control-gamer border-start-0"
                  type="search"
                  placeholder="Buscar videojuego..."
                  aria-label="Buscar videojuego"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>

            {/* Carrito de Compras Desplegable (Felimiau Structure) */}
            <div className="container-icon my-2 my-lg-0" ref={cartRef}>
              <div
                className="container-cart-icon"
                onClick={() => setActive(!active)}
                title="Ver carrito de compras gamer"
                role="button"
                tabIndex={0}
              >
                <i className="bi bi-cart3 fs-5 text-info"></i>
                <div className="count-products">
                  <span>{countProducts}</span>
                </div>
              </div>

              {/* Menú Flotante del Carrito */}
              <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
                <div className="cart-header">
                  <span className="fw-bold text-white small d-flex align-items-center gap-2">
                    <i className="bi bi-bag-check text-info"></i> Carrito Gamer ({countProducts})
                  </span>
                  {allProducts.length > 0 && (
                    <button
                      className="btn btn-sm btn-link text-danger text-decoration-none p-0 small"
                      onClick={onCleanCart}
                    >
                      <i className="bi bi-trash3 me-1"></i> Vaciar
                    </button>
                  )}
                </div>

                {allProducts.length > 0 ? (
                  <>
                    <div className="cart-items-scroll">
                      {allProducts.map((product) => {
                        const img = product.img || product.imagen?.src || './assets/img/zelda-totk.jpg';
                        const nombre = product.nombre || product.nameProduct;
                        const precio = product.precio || product.price || 0;
                        return (
                          <div className="row-product" key={product.id}>
                            <img src={img} alt={nombre} className="cart-thumb-img" />
                            <div className="cart-item-info">
                              <p className="cart-item-title">{nombre}</p>
                              <span className="cart-item-price">
                                ${precio.toLocaleString('es-CL')}
                              </span>
                            </div>

                            {/* Controles + / - */}
                            <div className="cart-qty-controls">
                              <button
                                type="button"
                                className="btn-qty"
                                onClick={() => onDecreaseQuantity(product)}
                                title="Disminuir cantidad"
                              >
                                -
                              </button>
                              <span className="cart-qty-display">{product.quantity}</span>
                              <button
                                type="button"
                                className="btn-qty"
                                onClick={() => onIncreaseQuantity(product)}
                                title="Aumentar cantidad"
                              >
                                +
                              </button>
                            </div>

                            {/* Botón Eliminar */}
                            <button
                              type="button"
                              className="btn-delete-cart-item"
                              onClick={() => onDeleteProduct(product)}
                              title="Quitar videojuego"
                            >
                              <i className="bi bi-x-circle-fill"></i>
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="cart-footer">
                      <div className="cart-total-row">
                        <span className="text-muted small">Total estimado:</span>
                        <span className="cart-total-amount">
                          ${total.toLocaleString('es-CL')}
                        </span>
                      </div>
                      <button
                        className="btn btn-gamer-cyan w-100"
                        onClick={() => {
                          alert(`¡Excelente elección! Redirigiendo a pasarela segura de pago por $${total.toLocaleString('es-CL')} CLP.`);
                        }}
                      >
                        <i className="bi bi-credit-card me-2"></i> Finalizar Compra
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="cart-empty-message">
                    <i className="bi bi-controller fs-1 text-muted d-block mb-2"></i>
                    <p className="mb-0">El carrito gamer está vacío.</p>
                    <small className="text-secondary">¡Agrega tus títulos favoritos!</small>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
