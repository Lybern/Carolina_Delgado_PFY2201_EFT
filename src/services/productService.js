/**
 * ============================================================================
 * SERVICIO DE PRODUCTOS (API & BACKEND) - ERIGAMESSTORE
 * ============================================================================
 * Este módulo desacopla la lógica de acceso a datos del catálogo de la vista.
 *
 * Estrategia de Carga:
 * 1. Intenta conectarse al backend local de Node/Express (http://localhost:3000/api/productos).
 * 2. Si el servidor backend está apagado o no responde, utiliza automáticamente
 *    el archivo estático /data/productos.json como respaldo transparente.
 * 3. Incluye simulación de tiempo de respuesta para visualización del Spinner en la UI.
 */

const BACKEND_API_URL = 'http://localhost:3000/api/productos';
const LOCAL_FALLBACK_URL = `${import.meta.env.BASE_URL}data/productos.json`;

/**
 * Opciones de configuración para la carga de productos.
 * Permite ajustar tiempos y reintentos para evaluar el comportamiento ante distintas condiciones de red.
 * @typedef {Object} FetchProductsOptions
 * @property {number} [timeoutMs=2500] - Tiempo máximo de espera por intento con el backend (en ms).
 * @property {number} [retries=1] - Cantidad de reintentos hacia el backend antes de activar el respaldo local.
 * @property {number} [delaySimuladoMs=400] - Tiempo de latencia simulada para apreciar transiciones y spinner.
 * @property {string} [apiUrl=BACKEND_API_URL] - Endpoint del backend Express a consultar.
 */

/**
 * Obtiene la lista completa de videojuegos desde el backend Express o fallback local.
 * Soporta configuración de timeout, reintentos y latencia para pruebas flexibles.
 * @async
 * @param {FetchProductsOptions} [options={}] - Parámetros configurables de conexión.
 * @returns {Promise<Array<Object>>} Lista de productos de la tienda gamer.
 * @throws {Error} Si no fue posible cargar los productos desde ninguna fuente.
 */
export async function getProductos({
  timeoutMs = 2500,
  retries = 1,
  delaySimuladoMs = 400,
  apiUrl = BACKEND_API_URL,
} = {}) {
  let backendError = null;

  // 1. Intentos de conexión con el backend Express con timeout y reintentos configurables
  for (let intento = 0; intento <= retries; intento++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      if (intento > 0) {
        console.warn(
          `🔄 [productService] Reintentando conexión con el backend (intento ${intento} de ${retries})...`
        );
      }

      const response = await fetch(apiUrl, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        console.log(
          '✅ [productService] Videojuegos cargados exitosamente desde el backend Express (localhost:3000)'
        );
        return data;
      }
      throw new Error(`Respuesta no válida del backend (Status HTTP ${response.status})`);
    } catch (err) {
      clearTimeout(timeoutId);
      backendError = err;
      // Pausa breve entre reintentos si aún quedan intentos disponibles
      if (intento < retries) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
  }

  // 2. Si fallaron los intentos con el backend, activar respaldo transparente desde JSON local
  console.warn(
    `⚠️ [productService] Backend Express no disponible tras timeout de ${timeoutMs}ms y ${retries} reintento(s). Activando respaldo local...`,
    backendError?.message
  );

  try {
    // Simulación de latencia configurable para visualización del Spinner en la UI
    if (delaySimuladoMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delaySimuladoMs));
    }

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
