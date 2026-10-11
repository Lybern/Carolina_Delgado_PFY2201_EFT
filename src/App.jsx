import { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Carousel } from './components/Carousel';
import { OffersBanner } from './components/OffersBanner';
import { ProductList } from './components/ProductList';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Services } from './components/Services';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ToastNotification } from './components/ToastNotification';
import { ScrollToTop } from './components/ScrollToTop';
import { getProductos } from './services/productService';

/**
 * Componente raíz de la aplicación EriGamesStore (EGS).
 * Gestiona el estado global del catálogo, carrito de compras con persistencia en localStorage,
 * efectos secundarios asíncronos con useEffect, renderizado condicional y orquestación
 * centralizada de componentes y modal.
 *
 * Estructura y modularización idéntica a Carolina_Delgado_PFY2201_S7-main.
 *
 * @component
 * @returns {JSX.Element} Aplicación completa renderizada.
 */
function App() {
  // ==========================================================================
  // 1. ESTADOS PARA CARGA DINÁMICA DE PRODUCTOS (SEMANA 8)
  // ==========================================================================
  // Catálogo dinámico de productos traídos desde la API / backend o fallback
  const [productos, setProductos] = useState([]);

  // Estado booleano de carga para renderizado condicional del Spinner
  const [cargando, setCargando] = useState(true);

  // Estado para capturar mensajes de error en caso de fallo de red
  const [error, setError] = useState(null);

  // Estado centralizado para el producto visualizado en la ventana Modal
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // ==========================================================================
  // 2. ESTADOS DEL CARRITO DE COMPRAS Y BÚSQUEDA
  // ==========================================================================
  // Lista de productos en el carrito con persistencia en localStorage
  const [allProducts, setAllProducts] = useState(() => {
    try {
      const savedCart = localStorage.getItem('erigames_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error('Error al inicializar el carrito desde localStorage:', err);
      return [];
    }
  });

  // Monto total acumulado en $ CLP con persistencia
  const [total, setTotal] = useState(() => {
    try {
      const savedTotal = localStorage.getItem('erigames_cart_total');
      return savedTotal ? Number(savedTotal) : 0;
    } catch {
      return 0;
    }
  });

  // Cantidad total de unidades añadidas al carrito con persistencia
  const [countProducts, setCountProducts] = useState(() => {
    try {
      const savedCount = localStorage.getItem('erigames_cart_count');
      return savedCount ? Number(savedCount) : 0;
    } catch {
      return 0;
    }
  });

  // Estado para el buscador reactivo en tiempo real
  const [searchTerm, setSearchTerm] = useState('');

  // Notificación flotante Toast al añadir producto
  const [toastProduct, setToastProduct] = useState(null);

  // ==========================================================================
  // 3. EFECTOS SECUNDARIOS (useEffect)
  // ==========================================================================
  /**
   * Permite reintentar manualmente la carga de productos si ocurrió un error.
   */
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

  // Carga inicial de datos al montar la aplicación
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
          setError(err.message || 'Error al conectar con el servidor.');
          setCargando(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Sincronización continua de la persistencia en localStorage
  useEffect(() => {
    try {
      localStorage.setItem('erigames_cart', JSON.stringify(allProducts));
      localStorage.setItem('erigames_cart_total', total.toString());
      localStorage.setItem('erigames_cart_count', countProducts.toString());
    } catch (err) {
      console.error('Error al persistir el carrito en localStorage:', err);
    }
  }, [allProducts, total, countProducts]);

  // ==========================================================================
  // 4. FUNCIONES DE GESTIÓN DEL CARRITO
  // ==========================================================================
  /**
   * Agrega un producto al carrito con inmutabilidad y cálculo de totales.
   * @param {Object} product - Producto a agregar.
   */
  const onAddProduct = (product) => {
    // Disparar notificación flotante Toast
    setToastProduct(null);
    setTimeout(() => setToastProduct(product), 60);

    const precioUnitario = product.precioOferta || product.price || product.precio || 0;

    // Si ya existe en el carrito, se incrementa la cantidad
    if (allProducts.find((item) => item.id === product.id)) {
      const updated = allProducts.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setTotal(total + precioUnitario);
      setCountProducts(countProducts + 1);
      setAllProducts(updated);
      return;
    }

    // Si es nuevo en el carrito, se añade con cantidad 1
    setTotal(total + precioUnitario);
    setCountProducts(countProducts + 1);
    setAllProducts([
      ...allProducts,
      {
        ...product,
        quantity: 1,
        price: precioUnitario,
        precio: precioUnitario,
      },
    ]);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      {/* 1. Encabezado con barra de navegación, buscador reactivo y carrito de compras */}
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
        {/* Carrusel accesible con controles y rotación */}
        <Carousel />

        {/* Banner de Bienvenida y Ofertas con renderizado condicional */}
        <OffersBanner />

        {/* ==================================================================
            RENDERIZADO CONDICIONAL DE ESTADOS DE CARGA, ERROR Y CATÁLOGO
            ================================================================== */}
        {/* Caso A: Cargando datos (Spinner de Bootstrap) */}
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
              <p className="text-muted small">
                Consultando disponibilidad de títulos con el backend...
              </p>
            </div>
          </section>
        )}

        {/* Caso B: Error de conexión con botón interactivo de Reintento */}
        {error && (
          <section className="py-5" style={{ background: '#0a0f1d' }}>
            <div className="container py-4">
              <div
                className="alert alert-danger shadow-sm rounded-4 p-4 text-center max-w-lg mx-auto"
                role="alert"
              >
                <div className="fs-1 mb-2">🎮</div>
                <h4 className="alert-heading fw-bold">
                  No fue posible cargar el catálogo de videojuegos
                </h4>
                <p className="mb-3 text-muted">{error}</p>
                <button
                  type="button"
                  className="btn btn-danger px-4 py-2 fw-bold shadow-sm"
                  onClick={reintentarCarga}
                >
                  🔄 Reintentar carga de videojuegos
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Caso C: Carga exitosa (Catálogo dinámico de videojuegos) */}
        {!cargando && !error && (
          <ProductList
            productos={productos}
            allProducts={allProducts}
            onAddProduct={onAddProduct}
            onVerProducto={setProductoSeleccionado}
            searchTerm={searchTerm}
          />
        )}

        {/* Sección de Servicios / Beneficios */}
        <Services />

        {/* Sección de Formulario de Contacto */}
        <ContactForm />
      </main>

      {/* 3. Pie de página institucional */}
      <Footer />

      {/* 4. MODAL CENTRALIZADO: Controlado por estado en App.jsx */}
      <ProductDetailModal
        product={productoSeleccionado}
        onClose={() => setProductoSeleccionado(null)}
        onAddToCart={onAddProduct}
      />

      {/* 5. Notificación visual flotante (Toast de Bootstrap) */}
      <ToastNotification
        product={toastProduct}
        onClose={() => setToastProduct(null)}
      />

      {/* 6. Botón flotante para volver arriba suavemente */}
      <ScrollToTop />
    </div>
  );
}

export default App;
