/**
 * ============================================================================
 * SERVICIO DE PRODUCTOS (API & BACKEND) - ERIGAMESSTORE
 * Evaluación Final Transversal (EFT) - Frontend I (PFY2201)
 * ============================================================================
 * Este módulo separa la lógica de acceso al backend / API REST de la vista,
 * cumpliendo con los estándares de arquitectura de la Semana 7 y 8.
 *
 * Estrategia de Carga:
 * 1. Intenta conectarse al backend local de Node/Express (http://localhost:3000/api/productos).
 * 2. Si el servidor backend está apagado o la app se encuentra desplegada en GitHub Pages,
 *    utiliza automáticamente el archivo estático /data/productos.json como respaldo.
 * 3. Incluye simulación de tiempo de respuesta para apreciar el Spinner de carga en la UI.
 */

const BACKEND_API_URL = 'http://localhost:3000/api/productos';
const LOCAL_FALLBACK_URL = `${import.meta.env.BASE_URL}data/productos.json`;

/**
 * Obtiene la lista completa de videojuegos desde el backend Express o fallback local.
 * @async
 * @returns {Promise<Array<Object>>} Lista de productos de la tienda gamer.
 * @throws {Error} Si no fue posible cargar los productos desde ninguna fuente.
 */
export async function getProductos() {
  try {
    // 1. Intentar consultar el backend de Express (puerto 3000) con timeout de 2.5s
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(BACKEND_API_URL, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      console.log('✅ [productService] Videojuegos cargados exitosamente desde el backend Express (localhost:3000)');
      return data;
    }
    throw new Error('Respuesta no válida del backend');
  } catch (backendError) {
    console.warn(
      '⚠️ [productService] Backend Express no disponible (o despliegue en GitHub Pages). Cargando respaldo local...',
      backendError.message
    );

    // 2. Respaldo (Fallback) desde archivo JSON local
    try {
      // Simulación de latencia de red (600ms) para visualizar el Spinner de carga solicitado
      await new Promise((resolve) => setTimeout(resolve, 600));

      const fallbackResponse = await fetch(LOCAL_FALLBACK_URL);
      if (!fallbackResponse.ok) {
        throw new Error(`Error HTTP al cargar JSON local: ${fallbackResponse.status}`, {
          cause: backendError,
        });
      }
      const fallbackData = await fallbackResponse.json();
      console.log('✅ [productService] Videojuegos cargados desde respaldo JSON local');
      return fallbackData;
    } catch (fallbackError) {
      console.error('❌ [productService] Error crítico al cargar productos:', fallbackError);
      throw new Error(
        'No se pudo conectar al servidor ni cargar los datos de respaldo. Por favor, verifica tu conexión.',
        { cause: fallbackError }
      );
    }
  }
}
