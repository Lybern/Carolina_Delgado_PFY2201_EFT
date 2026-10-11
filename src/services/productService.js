/**
 * SERVICIO DE PRODUCTOS (ERIGAMESSTORE - EFT)
 * ============================================================================
 * Separa la lógica de acceso a datos del componente visual.
 * Consume de manera asíncrona la lista de videojuegos disponibles en /data/productos.json
 * cumpliendo con la pauta de evaluación y notas de la sesión sincrónica.
 */

const LOCAL_PRODUCTS_URL = './data/productos.json';

/**
 * Obtiene el catálogo de videojuegos de EriGamesStore.
 * @async
 * @returns {Promise<Array<Object>>} Lista de videojuegos.
 */
export async function getProductos() {
  try {
    // Simulación de latencia de red (500ms) para renderizar el Spinner solicitado
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch(LOCAL_PRODUCTS_URL);
    if (!response.ok) {
      throw new Error(`Error HTTP al cargar el catálogo gamer: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al cargar productos de EriGamesStore:', error);
    throw new Error('No se pudo cargar el catálogo de videojuegos. Por favor, intenta nuevamente.');
  }
}
