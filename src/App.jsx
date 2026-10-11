import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductList } from './components/ProductList';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';
import { ScrollToTop } from './components/ScrollToTop';
import { getProductos } from './services/productService';

/**
 * Componente raíz de EriGamesStore (EGS) - Evaluación Final Transversal (EFT).
 * Orquesta el estado global de la SPA:
 * - Catálogo asíncrono con useEffect y estados de carga / error / éxito.
 * - Carrito de compras con persistencia automática en localStorage.
 * - Modal dinámico de especificaciones técnicas.
 * - Notificaciones flotantes contextuales (Toast).
 * - Búsqueda reactiva y filtrado multicriterio.
 */
function App() {
  // 1. Estados para carga asíncrona del catálogo de videojuegos
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // 2. Estados del carrito de compras con persistencia en localStorage
  const [allProducts, setAllProducts] = useState(() => {
    try {
      const savedCart = localStorage.getItem('egs_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [total, setTotal] = useState(() => {
    try {
      const savedTotal = localStorage.getItem('egs_cart_total');
      return savedTotal ? Number(savedTotal) : 0;
    } catch {
      return 0;
    }
  });

  const [countProducts, setCountProducts] = useState(() => {
    try {
      const savedCount = localStorage.getItem('egs_cart_count');
      return savedCount ? Number(savedCount) : 0;
    } catch {
      return 0;
    }
  });

  // 3. Estados de búsqueda y notificación contextual Toast
  const [searchTerm, setSearchTerm] = useState('');
  const [toastProduct, setToastProduct] = useState(null);

  // Función de reintento de carga
  const reintentarCarga = () => {
    setCargando(true);
    setError(null);
    getProductos()
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message || 'Error al conectar con el servidor.');
        setCargando(false);
      });
  };

  // Carga inicial del catálogo mediante useEffect
  useEffect(() => {
    let isMounted = true;
    getProductos()
      .then((data) => {
        if (isMounted) {
          setProductos(data);
          setCargando(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Error al cargar catálogo gamer.');
          setCargando(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sincronización continua de persistencia en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('egs_cart', JSON.stringify(allProducts));
      localStorage.setItem('egs_cart_total', total.toString());
      localStorage.setItem('egs_cart_count', countProducts.toString());
    } catch (err) {
      console.error('Error al persistir en localStorage:', err);
    }
  }, [allProducts, total, countProducts]);

  // Manejo de adición de productos al carrito
  const onAddProduct = (product) => {
    // Activar Toast Notification
    setToastProduct(null);
    setTimeout(() => setToastProduct(product), 60);

    const precioUnitario = product.precio || product.price || 0;

    // Si ya existe en el carrito, se incrementa cantidad
    if (allProducts.find((item) => item.id === product.id)) {
      const updated = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + precioUnitario);
      setCountProducts(countProducts + 1);
      setAllProducts(updated);
      return;
    }

    // Si es nuevo, se agrega con cantidad 1
    setTotal(total + precioUnitario);
    setCountProducts(countProducts + 1);
    setAllProducts([
      ...allProducts,
      {
        ...product,
        quantity: 1,
        precio: precioUnitario,
      },
    ]);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      {/* 1. Encabezado con navegación, búsqueda reactiva y Carrito flotante */}
      <Header
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* 2. Contenido Principal */}
      <main className="flex-grow-1">
        {/* Banner Hero */}
        <HeroBanner />

        {/* Renderizado condicional: Carga con Spinner */}
        {cargando && (
          <section className="py-5 text-center" style={{ background: '#0a0f1d' }}>
            <div className="container py-5">
              <div
                className="spinner-border text-info"
                style={{ width: '3.5rem', height: '3.5rem' }}
                role="status"
              >
                <span className="visually-hidden">Cargando videojuegos...</span>
              </div>
              <h4 className="fw-bold text-white mt-3">Cargando catálogo EriGamesStore...</h4>
              <p className="text-muted small">Consultando disponibilidad de títulos gamer...</p>
            </div>
          </section>
        )}

        {/* Renderizado condicional: Error de carga con botón de reintento */}
        {error && (
          <section className="py-5" style={{ background: '#0a0f1d' }}>
            <div className="container py-4">
              <div className="alert alert-danger text-center max-w-lg mx-auto p-4 rounded-4 shadow">
                <i className="bi bi-exclamation-triangle-fill fs-1 d-block mb-2 text-danger"></i>
                <h4 className="alert-heading fw-bold">No fue posible cargar el catálogo</h4>
                <p className="text-secondary">{error}</p>
                <button
                  type="button"
                  className="btn btn-danger px-4 py-2 fw-bold"
                  onClick={reintentarCarga}
                >
                  <i className="bi bi-arrow-clockwise me-1"></i> Reintentar carga
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Renderizado condicional: Catálogo interactivo de videojuegos */}
        {!cargando && !error && (
          <ProductList
            productos={productos}
            allProducts={allProducts}
            onAddProduct={onAddProduct}
            onVerProducto={setProductoSeleccionado}
            searchTerm={searchTerm}
          />
        )}

        {/* Formulario de Contacto interactivo */}
        <ContactForm />
      </main>

      {/* 3. Pie de página */}
      <Footer />

      {/* 4. Modal centralizado de especificaciones técnicas */}
      <ProductDetailModal
        product={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
        onAddToCart={onAddProduct}
      />

      {/* 5. Notificación flotante Toast al agregar juego */}
      <ToastNotification
        product={toastProduct}
        onClose={() => setToastProduct(null)}
      />

      {/* 6. Botón flotante para regresar arriba */}
      <ScrollToTop />
    </div>
  );
}

export default App;
