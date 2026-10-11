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
  countProducts = 0,
  searchTerm = '',
  setSearchTerm = () => {},
  categoriaSeleccionada = 'Todos',
  setCategoriaSeleccionada = () => {},
}) => {
  const [active, setActive] = useState(false);
  const [dropdownCategorias, setDropdownCategorias] = useState(false);
  const cartRef = useRef(null);
  const dropdownRef = useRef(null);

  const listaCategorias = [
    { label: 'Todos los Títulos', icon: 'bi-controller', value: 'Todos' },
    { label: 'Aventura y Acción', icon: 'bi-compass', value: 'Aventura y Acción' },
    { label: 'Rol (RPG)', icon: 'bi-shield-shaded', value: 'Rol (RPG)' },
    { label: 'Plataformas', icon: 'bi-boxes', value: 'Plataformas' },
    { label: 'Deportes', icon: 'bi-trophy', value: 'Deportes' },
    { label: 'Survival Horror', icon: 'bi-radioactive', value: 'Survival Horror' },
  ];

  const handleSelectCategoria = (cat) => {
    setCategoriaSeleccionada(cat);
    setDropdownCategorias(false);
    const section = document.getElementById('catalogo');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cerrar el carrito o dropdown si se hace clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setActive(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownCategorias(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Eliminar un producto individual del carrito (total y cantidad se recalculan automáticamente)
  const onDeleteProduct = (product) => {
    setAllProducts(allProducts.filter((item) => item.id !== product.id));
  };

  // Incrementar cantidad del producto
  const onIncreaseQuantity = (product) => {
    setAllProducts(
      allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrementar cantidad del producto o remover si llega a 0
  const onDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      setAllProducts(
        allProducts.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      onDeleteProduct(product);
    }
  };

  // Vaciar completamente el carrito
  const onCleanCart = () => {
    setAllProducts([]);
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 gap-1">
              <li className="nav-item">
                <a className="nav-link nav-link-gamer" href="#inicio">
                  <i className="bi bi-house-door me-1 text-primary"></i> Inicio
                </a>
              </li>

              {/* Menú Desplegable de Categorías (Interactividad con Mouse Hover y Click) */}
              <li
                className="nav-item dropdown position-relative"
                ref={dropdownRef}
                onMouseEnter={() => setDropdownCategorias(true)}
                onMouseLeave={() => setDropdownCategorias(false)}
              >
                <button
                  type="button"
                  className={`nav-link nav-link-gamer dropdown-toggle btn btn-link text-decoration-none border-0 ${dropdownCategorias ? 'active show text-info' : ''}`}
                  onClick={() => setDropdownCategorias(!dropdownCategorias)}
                  aria-expanded={dropdownCategorias}
                >
                  <i className="bi bi-grid-3x3-gap me-1 text-info"></i> Categorías
                </button>

                {dropdownCategorias && (
                  <ul className="dropdown-menu dropdown-menu-gamer show position-absolute animate-fade-in shadow-lg">
                    {listaCategorias.map((item) => (
                      <li key={item.value}>
                        <button
                          type="button"
                          className={`dropdown-item dropdown-item-gamer ${categoriaSeleccionada === item.value ? 'active' : ''}`}
                          onClick={() => handleSelectCategoria(item.value)}
                        >
                          <i className={`bi ${item.icon} text-info`}></i>
                          <span>{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              <li className="nav-item">
                <a className="nav-link nav-link-gamer" href="#destacados">
                  <i className="bi bi-tag-fill me-1" style={{ color: '#fb923c' }}></i> Ofertas
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-gamer" href="#servicios">
                  <i className="bi bi-shield-check me-1 text-info"></i> Beneficios
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-link-gamer" href="#contacto">
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
