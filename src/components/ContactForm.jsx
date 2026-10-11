import { useState } from 'react';

/**
 * Formulario de contacto interactivo para soporte gamer.
 * Gestiona validación de campos mediante useState y muestra alertas de feedback accesibles.
 */
export const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    plataforma: 'PS5',
    asunto: '',
    mensaje: '',
  });

  const [estadoMensaje, setEstadoMensaje] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.asunto.trim() || !formData.mensaje.trim()) {
      setEstadoMensaje({
        tipo: 'danger',
        texto: '⚠️ Por favor completa todos los campos requeridos para enviar tu mensaje.',
      });
      return;
    }

    // Validación básica de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.correo)) {
      setEstadoMensaje({
        tipo: 'warning',
        texto: '⚠️ Por favor ingresa una dirección de correo electrónico válida (ej: jugador@gamer.cl).',
      });
      return;
    }

    setEstadoMensaje({
      tipo: 'success',
      texto: `✅ ¡Excelente ${formData.nombre}! Tu consulta sobre "${formData.asunto}" para ${formData.plataforma} fue enviada con éxito. Te responderemos a ${formData.correo} en menos de 24 horas hábiles.`,
    });

    setFormData({
      nombre: '',
      correo: '',
      plataforma: 'PS5',
      asunto: '',
      mensaje: '',
    });
  };

  return (
    <section id="contacto" className="py-5" style={{ background: '#0a0f1d' }} aria-label="Formulario de contacto gamer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="contact-card-gamer">
              <div className="text-center mb-4">
                <span className="badge bg-primary px-3 py-2 fw-bold text-uppercase mb-2">
                  <i className="bi bi-headset me-1"></i> Soporte & Preventas
                </span>
                <h2 className="fw-bold text-white">¿Tienes dudas o buscas un título especial?</h2>
                <p className="text-muted">
                  Escríbenos y nuestro equipo técnico gamer te responderá a la brevedad.
                </p>
              </div>

              {/* Alerta de feedback controlado por React */}
              {estadoMensaje && (
                <div className={`alert alert-${estadoMensaje.tipo} shadow-sm mb-4`} role="alert">
                  {estadoMensaje.texto}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label text-light fw-semibold small">
                      Nombre de Jugador / Cliente *
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-gamer"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej: Carolina Delgado"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="correo" className="form-label text-light fw-semibold small">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-gamer"
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="gamer@ejemplo.com"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="plataforma" className="form-label text-light fw-semibold small">
                      Tu Plataforma Principal
                    </label>
                    <select
                      className="form-select form-control-gamer"
                      id="plataforma"
                      name="plataforma"
                      value={formData.plataforma}
                      onChange={handleChange}
                    >
                      <option value="PS5">PlayStation 5</option>
                      <option value="Nintendo Switch">Nintendo Switch</option>
                      <option value="Xbox Series X|S">Xbox Series X|S</option>
                      <option value="PC">PC Master Race</option>
                      <option value="Retro / Otra">Retro / Otra</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="asunto" className="form-label text-light fw-semibold small">
                      Asunto o Título del Mensaje *
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-gamer"
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      placeholder="Ej: Consulta por stock de Zelda"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label text-light fw-semibold small">
                      Detalle de tu Mensaje *
                    </label>
                    <textarea
                      className="form-control form-control-gamer"
                      id="mensaje"
                      name="mensaje"
                      rows="4"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos qué necesitas..."
                      required
                    ></textarea>
                  </div>

                  <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-gamer-cyan px-5 py-2">
                      <i className="bi bi-send-fill me-2"></i> Enviar Mensaje
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
