import { useState, useEffect } from 'react';

/**
 * Botón flotante para regresar suavemente al inicio de la página.
 */
export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      className="btn-scroll-top"
      onClick={scrollToTop}
      title="Volver al inicio"
      aria-label="Volver arriba"
    >
      <i className="bi bi-chevron-up fs-5"></i>
    </button>
  );
};

export default ScrollToTop;
