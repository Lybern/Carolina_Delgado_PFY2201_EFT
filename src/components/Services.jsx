/**
 * Componente Services para destacar los beneficios y garantías de la tienda gamer.
 */
export const Services = () => {
  return (
    <section id="servicios" className="py-5 border-top border-bottom border-secondary" style={{ background: '#0a0f1d' }} aria-label="Beneficios de EriGamesStore">
      <div className="container">
        <div className="row text-center g-4">
          <div className="col-12 col-md-4">
            <article className="p-4 rounded-3 shadow-sm h-100 border-top border-info border-4" style={{ background: '#111a2e' }}>
              <div className="display-6 mb-2">🚀</div>
              <h3 className="h4 fw-bold text-white">Despacho Gamer Express</h3>
              <p className="text-muted mb-0">
                Despacho garantizado en 24 a 48 horas en todo Chile y entrega digital inmediata de códigos oficiales.
              </p>
            </article>
          </div>
          <div className="col-12 col-md-4">
            <article className="p-4 rounded-3 shadow-sm h-100 border-top border-info border-4" style={{ background: '#111a2e' }}>
              <div className="display-6 mb-2">🛡️</div>
              <h3 className="h4 fw-bold text-white">Garantía & Claves Oficiales</h3>
              <p className="text-muted mb-0">
                Todos nuestros títulos son 100% licenciados y cuentan con respaldo técnico directo de distribuidores.
              </p>
            </article>
          </div>
          <div className="col-12 col-md-4">
            <article className="p-4 rounded-3 shadow-sm h-100 border-top border-info border-4" style={{ background: '#111a2e' }}>
              <div className="display-6 mb-2">💳</div>
              <h3 className="h4 fw-bold text-white">Compra 100% Segura</h3>
              <p className="text-muted mb-0">
                Paga con Webpay, tarjetas de débito o crédito bancario con encriptación SSL de nivel financiero.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
