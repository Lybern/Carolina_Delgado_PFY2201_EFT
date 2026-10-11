import { useState, useEffect } from 'react';

/**
 * Componente Carousel animado y accesible (cumple pautas WCAG 2.1).
 * Implementa rotación automática cíclica con temporizador y botón de pausa/reanudación,
 * además de una capa ambiental con efecto desenfocado cinemático (idéntico a S7/S8).
 * @component
 * @returns {JSX.Element} Carrusel de novedades interactivo.
 */
export const Carousel = () => {
  // Estado para la diapositiva activa actual
  const [currentSlide, setCurrentSlide] = useState(0);

  // Estado para pausar la rotación automática (Accesibilidad WCAG)
  const [pausado, setPausado] = useState(false);

  // Definición de las diapositivas con recursos oficiales de EriGamesStore
  const slides = [
    {
      id: 1,
      img: './img/zelda-totk.jpg',
      titulo: '¡Bienvenido a EriGamesStore! 🎮',
      bajada: 'Tu tienda especializada con los mejores títulos para Nintendo Switch, PS5, Xbox y PC.',
      alt: 'The Legend of Zelda Tears of the Kingdom',
    },
    {
      id: 2,
      img: './img/cyberpunk-2077.jpg',
      titulo: 'Cyberpunk 2077: Phantom Liberty 🔥',
      bajada: 'Adéntrate en Dogtown en una experiencia futurista de espionaje y acción electrizante.',
      alt: 'Cyberpunk 2077 Phantom Liberty',
    },
    {
      id: 3,
      img: './img/ffvii-rebirth.jpg',
      titulo: 'Final Fantasy VII Rebirth ⚡',
      bajada: 'La inolvidable odisea de Cloud y sus camaradas continúa a través de un vasto mundo abierto.',
      alt: 'Final Fantasy VII Rebirth',
    },
  ];

  // Efecto para la rotación automática del carrusel cada 3.5 segundos
  useEffect(() => {
    if (pausado) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [pausado, slides.length]);

  // Funciones controladoras de avance y retroceso
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="inicio" aria-label="Promociones y Novedades EriGamesStore" className="position-relative">
      <div id="carruselEriGames" className="carousel slide">
        {/* Botón de control de rotación para accesibilidad */}
        <button
          type="button"
          className="btn-carrusel-control"
          onClick={() => setPausado(!pausado)}
          aria-label={pausado ? 'Reanudar carrusel' : 'Pausar carrusel'}
        >
          {pausado ? '▶️ Reanudar' : '⏸️ Pausar'}
        </button>

        {/* Indicadores inferiores interactivos */}
        <div className="carousel-indicators">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={index === currentSlide ? 'active' : ''}
              aria-current={index === currentSlide ? 'true' : undefined}
              aria-label={`Ir a diapositiva ${index + 1}: ${slide.titulo}`}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

        {/* Slides con imagen subyacente que cubre todo el ancho con desenfoque cinematográfico */}
        <div className="carousel-inner">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`carousel-item ${isActive ? 'active' : ''}`}
              >
                {/* Capa subyacente desenfocada que cubre todo el ancho */}
                <div
                  className="carousel-bg-blur"
                  style={{ backgroundImage: `url(${slide.img})` }}
                  aria-hidden="true"
                ></div>

                {/* Capa de contraste */}
                <div className="carousel-overlay"></div>

                {/* Imagen principal centrada y nítida */}
                <img
                  src={slide.img}
                  className="carousel-main-img d-block"
                  alt={slide.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Cuadro de texto flotante */}
                <div className="carousel-caption d-block">
                  <h2 className="fw-bold">{slide.titulo}</h2>
                  <p className="lead">{slide.bajada}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controles de navegación manual anterior y siguiente */}
        <button
          className="carousel-control-prev"
          type="button"
          onClick={prevSlide}
          aria-label="Diapositiva anterior"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={nextSlide}
          aria-label="Diapositiva siguiente"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
