import { useState } from 'react';

/**
 * Componente ProductList para EriGamesStore.
 * Integra:
 * - Filtro reactivo por categorías (Aventura, RPG, Plataformas, Deportes, Survival Horror).
 * - Búsqueda reactiva en tiempo real.
 * - Selector interactivo de vista (Cuadrícula / Lista) con useState.
 * - Tarjetas interactivas con modal de detalles y adición al carrito.
 */
export const ProductList = ({
  productos = [],
  onAddProduct,
  onVerProducto,
  searchTerm = '',
}) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [vista, setVista] = useState('grid'); // 'grid' | 'list'

  const categorias = [
    'Todos',
    'Aventura y Acción',
    'Rol (RPG)',
    'Plataformas',
    'Deportes',
    'Survival Horror',
  ];

  // Filtrado reactivo combinado por categoría y búsqueda
  const productosFiltrados = productos.filter((item) => {
    const coincideCategoria =
      categoriaSeleccionada === 'Todos' || item.categoria === categoriaSeleccionada;
    const nombre = (item.nombre || item.nameProduct || '').toLowerCase();
    const desc = (item.descripcion || '').toLowerCase();
    const plataforma = (item.plataforma || '').toLowerCase();
    const query = searchTerm.trim().toLowerCase();
    const coincideBusqueda =
      query === '' ||
      nombre.includes(query) ||
      desc.includes(query) ||
      plataforma.includes(query);

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <section id="catalogo" className="py-5">
      <div className="container">
        {/* Cabecera del Catálogo */}
        <div className="text-center mb-4 pb-2">
          <div className="d-inline-flex align-items-center gap-3 px-4 py-3 rounded-pill catalog-official-badge">
            <i className="bi bi-controller fs-3"></i>
            <span className="fs-3 fw-bold text-uppercase">Catálogo Oficial</span>
          </div>
          <p className="text-muted lead mt-3 mb-0">
            Selecciona tu próxima aventura con entrega inmediata y garantía oficial.
          </p>
        </div>

        {/* Barra de Controles: Filtros de Categorías y Selector de Vista */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4 pb-2">
          {/* Botones de Categorías (Pills) */}
          <div className="d-flex flex-wrap justify-content-center gap-2" role="group" aria-label="Filtro de categorías">
            {categorias.map((cat) => {
              const isActive = categoriaSeleccionada === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`btn-pill-category ${isActive ? 'active' : ''}`}
                  onClick={() => setCategoriaSeleccionada(cat)}
                >
                  {cat === 'Todos' ? '🎮 Todos los Juegos' : cat}
                </button>
              );
            })}
          </div>

          {/* Selector de visualización (Grid / List) */}
          <div className="btn-group bg-dark p-1 rounded-3 border border-secondary shadow-sm" role="group">
            <button
              type="button"
              className={`btn btn-sm ${vista === 'grid' ? 'btn-primary' : 'btn-outline-dark text-muted'}`}
              onClick={() => setVista('grid')}
              title="Vista de cuadrícula"
            >
              <i className="bi bi-grid-3x3-gap-fill me-1"></i> Cuadrícula
            </button>
            <button
              type="button"
              className={`btn btn-sm ${vista === 'list' ? 'btn-primary' : 'btn-outline-dark text-muted'}`}
              onClick={() => setVista('list')}
              title="Vista de lista"
            >
              <i className="bi bi-list-ul me-1"></i> Lista
            </button>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
          <span>
            Mostrando <strong>{productosFiltrados.length}</strong> de {productos.length} videojuegos
          </span>
          {searchTerm && (
            <span className="text-info">
              Filtro activo por: "<strong>{searchTerm}</strong>"
            </span>
          )}
        </div>

        {/* Grilla / Lista de Videojuegos */}
        {productosFiltrados.length > 0 ? (
          <div className={vista === 'grid' ? 'row g-4' : 'd-flex flex-column gap-3'}>
            {productosFiltrados.map((juego) => {
              const img = juego.img || juego.imagen?.src || './assets/img/zelda-totk.jpg';
              const alt = juego.imagen?.alt || juego.nombre;
              const precioNormal = juego.precioNormal || Math.round(juego.precio * 1.15);
              const descuento = juego.precioNormal
                ? Math.round(((juego.precioNormal - juego.precio) / juego.precioNormal) * 100)
                : 15;

              return (
                <div
                  key={juego.id}
                  className={vista === 'grid' ? 'col-12 col-md-6 col-lg-4' : 'col-12'}
                >
                  <div className={`gamer-card ${vista === 'list' ? 'gamer-card-list' : ''}`}>
                    {/* Imagen y Badges */}
                    <div className="card-img-wrapper">
                      <span className="badge-platform">{juego.plataforma}</span>
                      {juego.badge && (
                        <span className={`badge-promo bg-${juego.badgeColor || 'primary'} text-white`}>
                          {juego.badge}
                        </span>
                      )}
                      <img src={img} alt={alt} className="card-img-top-gamer" />
                    </div>

                    {/* Cuerpo de la tarjeta */}
                    <div className="card-body-gamer">
                      <div className="d-flex justify-content-between align-items-start mb-1">
                        <span className="badge bg-secondary bg-opacity-50 text-light small">
                          {juego.categoria}
                        </span>
                        {descuento > 0 && (
                          <span className="badge bg-danger text-white small">
                            -{descuento}% OFF
                          </span>
                        )}
                      </div>

                      <h3 className="card-title-gamer">{juego.nombre || juego.nameProduct}</h3>
                      <p className="card-desc-gamer">{juego.descripcion}</p>

                      {/* Stock y Precios */}
                      <div className="d-flex justify-content-between align-items-baseline mb-3 mt-auto">
                        <div>
                          <div className="card-price-gamer">
                            ${(juego.precio || juego.price).toLocaleString('es-CL')}
                          </div>
                          <div className="card-old-price">
                            Normal: ${precioNormal.toLocaleString('es-CL')}
                          </div>
                        </div>
                        <span className="badge bg-success bg-opacity-25 text-success border border-success border-opacity-25 small">
                          <i className="bi bi-check2-circle me-1"></i> Stock: {juego.stock}
                        </span>
                      </div>

                      {/* Botones de Acción */}
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-outline-info flex-grow-1 btn-sm fw-semibold"
                          onClick={() => onVerProducto(juego)}
                        >
                          <i className="bi bi-eye me-1"></i> Detalles
                        </button>
                        <button
                          type="button"
                          className="btn btn-gamer-primary flex-grow-1 btn-sm"
                          onClick={() => onAddProduct(juego)}
                        >
                          <i className="bi bi-cart-plus me-1"></i> Añadir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Estado Vacío / Sin Resultados */
          <div className="text-center py-5 my-4 bg-dark rounded-4 border border-secondary p-4">
            <i className="bi bi-search fs-1 text-muted d-block mb-3"></i>
            <h4 className="text-white">No se encontraron videojuegos</h4>
            <p className="text-muted">
              Intenta con otra palabra clave o selecciona otra categoría de la barra de filtros.
            </p>
            <button
              className="btn btn-outline-info"
              onClick={() => {
                setCategoriaSeleccionada('Todos');
              }}
            >
              Ver todos los títulos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
