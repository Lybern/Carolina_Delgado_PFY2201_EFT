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

  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [estadoMensaje, setEstadoMensaje] = useState(null);

  // Expresiones regulares de validación
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,80}$/;

  const validarCampos = (datos) => {
    const errs = {};

    // 1. Nombre: Obligatorio, solo letras y espacios, mín 3 caracteres
    if (!datos.nombre.trim()) {
      errs.nombre = 'El nombre de jugador es obligatorio.';
    } else if (!regexNombre.test(datos.nombre.trim())) {
      errs.nombre = 'Debe contener solo letras y al menos 3 caracteres.';
    }

    // 2. Correo: Obligatorio y formato válido con RegEx
    if (!datos.correo.trim()) {
      errs.correo = 'El correo electrónico es obligatorio.';
    } else if (!regexEmail.test(datos.correo.trim())) {
      errs.correo = 'Ingresa un correo electrónico válido (ej: jugador@gamer.cl).';
    }

    // 3. Asunto: Obligatorio y mín 3 caracteres
    if (!datos.asunto.trim()) {
      errs.asunto = 'El asunto de tu consulta es obligatorio.';
    } else if (datos.asunto.trim().length < 3) {
      errs.asunto = 'El asunto debe tener al menos 3 caracteres.';
    }

    // 4. Mensaje: Obligatorio y mín 10 caracteres
    if (!datos.mensaje.trim()) {
      errs.mensaje = 'El detalle de tu mensaje es obligatorio.';
    } else if (datos.mensaje.trim().length < 10) {
      errs.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevosDatos = { ...formData, [name]: value };
    setFormData(nuevosDatos);

    if (enviado) {
      setErrores(validarCampos(nuevosDatos));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);

    const erroresDetectados = validarCampos(formData);
    setErrores(erroresDetectados);

    if (Object.keys(erroresDetectados).length > 0) {
      setEstadoMensaje({
        tipo: 'danger',
        texto: '⚠️ Por favor corrige los campos requeridos marcados en rojo antes de enviar.',
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
    setErrores({});
    setEnviado(false);
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
                      className={`form-control form-control-gamer ${enviado ? (errores.nombre ? 'is-invalid' : 'is-valid') : ''}`}
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ej: Carolina Delgado"
                      required
                    />
                    {errores.nombre && (
                      <div className="invalid-feedback d-block small mt-1">{errores.nombre}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="correo" className="form-label text-light fw-semibold small">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      className={`form-control form-control-gamer ${enviado ? (errores.correo ? 'is-invalid' : 'is-valid') : ''}`}
                      id="correo"
                      name="correo"
                      value={formData.correo}
                      onChange={handleChange}
                      placeholder="gamer@ejemplo.com"
                      required
                    />
                    {errores.correo && (
                      <div className="invalid-feedback d-block small mt-1">{errores.correo}</div>
                    )}
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
                      className={`form-control form-control-gamer ${enviado ? (errores.asunto ? 'is-invalid' : 'is-valid') : ''}`}
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      placeholder="Ej: Consulta por stock de Zelda"
                      required
                    />
                    {errores.asunto && (
                      <div className="invalid-feedback d-block small mt-1">{errores.asunto}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="mensaje" className="form-label text-light fw-semibold small">
                      Detalle de tu Mensaje *
                    </label>
                    <textarea
                      className={`form-control form-control-gamer ${enviado ? (errores.mensaje ? 'is-invalid' : 'is-valid') : ''}`}
                      id="mensaje"
                      name="mensaje"
                      rows="4"
                      value={formData.mensaje}
                      onChange={handleChange}
                      placeholder="Cuéntanos qué necesitas (mínimo 10 caracteres)..."
                      required
                    ></textarea>
                    {errores.mensaje && (
                      <div className="invalid-feedback d-block small mt-1">{errores.mensaje}</div>
                    )}
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
