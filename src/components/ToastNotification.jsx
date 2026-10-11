import { useEffect } from 'react';

/**
 * Notificación Toast flotante de adición exitosa al carrito de compras.
 * Diseñada según la pauta de Bootstrap 5 con temporizador de 3.2s.
 */
export const ToastNotification = ({ product, onClose }) => {
  useEffect(() => {
    if (!product) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [product, onClose]);

  if (!product) return null;

  const img = product.img || product.imagen?.src || './assets/img/zelda-totk.jpg';
  const nombre = product.nombre || product.nameProduct;
  const precio = product.precio || product.price || 0;

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3 toast-container-custom"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        className="toast show toast-gamer text-white p-2"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header bg-transparent text-white border-bottom border-secondary d-flex align-items-center py-2 px-2">
          <span className="badge bg-success text-white me-2 fw-bold">
            <i className="bi bi-check2-circle me-1"></i> ¡Agregado!
          </span>
          <strong className="me-auto text-info small">EriGamesStore</strong>
          <small className="text-muted ms-2">Ahora</small>
          <button
            type="button"
            className="btn-close btn-close-white ms-2"
            aria-label="Cerrar notificación"
            onClick={onClose}
          ></button>
        </div>

        <div className="toast-body p-2 d-flex align-items-center gap-3">
          <img src={img} alt={nombre} className="toast-thumb-img border border-secondary" />
          <div className="flex-grow-1 min-w-0">
            <p className="mb-0 fw-bold text-white small text-truncate">{nombre}</p>
            <span className="small text-info">
              ${precio.toLocaleString('es-CL')} añadido a tu carrito gamer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
