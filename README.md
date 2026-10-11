# EriGamesStore (EGS)

- **Desarrollo:** Carolina Delgado
- **Proyecto:** Tienda de Videojuegos Online (EriGamesStore)
- **Tecnologías:** React 19, Vite, Bootstrap 5.3, Bootstrap Icons, JavaScript (ES6+), Express (Backend API)

---

## 1. Descripción del Proyecto

EriGamesStore es una aplicación web para una tienda online de videojuegos construida como una Single Page Application (SPA) modular con React y Vite, diseñada con estética gamer de alto contraste.

La aplicación utiliza el modelo declarativo de React, gestionando el ciclo de vida, la reactividad de la interfaz y la sincronización del catálogo mediante hooks nativos (`useState`, `useEffect`) y paso de propiedades (`props`).

---

## 2. Arquitectura y Características del Sistema

Principales aspectos técnicos y funcionalidades implementadas en la plataforma:

1. **Estructura HTML, CSS y Bootstrap 5:**
   - Maquetación con etiquetas semánticas (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
   - Sistema de grillas responsivo de Bootstrap 5 combinado con estilos propios para la estética gamer.
   - Navegación fluida y adaptabilidad completa para dispositivos móviles, tablets y pantallas de escritorio.

2. **Manipulación Dinámica del DOM con React:**
   - El catálogo de videojuegos se renderiza dinámicamente mediante el método `.map()`, asignando keys únicas a cada elemento para optimizar la reconciliación del Virtual DOM.
   - Filtrado en tiempo real por categorías (Todos, Aventura y Acción, Rol, Plataformas, Deportes, Survival Horror) a través de un estado controlado con `useState`.
   - Alternancia de vista en cuadrícula (grid) y lista (list).

3. **Consumo Asíncrono de Datos:**
   - La información del catálogo de productos se consume de forma asíncrona mediante `fetch` dentro de un hook `useEffect` en `productService.js`.
   - El servicio intenta primero consultar la API REST local (`http://localhost:3000/api/productos`) y, en caso de que el backend no esté activo, conmuta de forma automática y transparente a los datos estáticos locales (`/data/productos.json`).
   - Incluye spinner de carga condicional y mensaje de reintento ante posibles errores de conexión.

4. **Flujo de Datos y Modularidad:**
   - **Datos hacia abajo (Data Down):** El componente raíz `App.jsx` distribuye el catálogo, filtros y estado del carrito a los componentes secundarios mediante `props`.
   - **Eventos hacia arriba (Events Up):** Las acciones del usuario (agregar juego, cambiar categoría, actualizar unidades) se notifican mediante callbacks hacia el estado central.

5. **Formulario de Contacto con Validación:**
   - Campos controlados con `useState` para nombre, correo electrónico y mensaje.
   - Validación antes del envío para evitar campos en blanco o correos con formato inválido.
   - Notificación de confirmación no invasiva mediante componentes de Bootstrap, sin recurrir a alertas bloqueantes del navegador (`alert()`).

6. **Carrito de Compras y Persistencia:**
   - Carrito interactivo que calcula subtotales, totales en pesos chilenos ($ CLP) y cantidades en tiempo real.
   - Notificaciones contextuales flotantes (Toast) al añadir productos.
   - Persistencia de los datos en `localStorage` para conservar la compra si el usuario recarga la página.

7. **Uso de Vite vs. Babel Standalone (Estándar Profesional):**
   - El proyecto prescinde del uso de librerías CDN y compiladores pesados en el navegador (Babel Standalone). Todas las dependencias se gestionan localmente con `npm` y se compilan a producción con Vite en una carpeta `dist/`, asegurando un rendimiento óptimo.

---

## 3. Estructura del Proyecto

```text
Carolina_Delgado_PFY2201_EFT/
├── backend/                       # Servidor API REST con Express (opcional)
│   ├── data/
│   │   └── productos.json         # Catálogo de videojuegos servido vía API
│   ├── app.js                     # Configuración de Express, CORS y endpoint /api/productos
│   └── package.json               # Dependencias del backend
├── docs/                          # Documentación y capturas de evidencia
│   └── screenshots/
├── public/                        # Recursos estáticos
│   ├── data/
│   │   └── productos.json         # Respaldo estático para fallback y GitHub Pages
│   ├── img/                       # Portadas e iconografía gamer
│   └── icons.svg                  # Sprites SVG
├── src/
│   ├── components/                # Componentes modulares de React
│   │   ├── Carousel.jsx           # Carrusel accesible con pausa/reanudación y desenfoque
│   │   ├── OffersBanner.jsx       # Banner de ofertas semanales con toggle interactivo
│   │   ├── ProductList.jsx        # Catálogo, buscador en tiempo real, nav-pills y selector de vista
│   │   ├── Services.jsx           # Sección de beneficios y garantías gamer
│   │   ├── ContactForm.jsx        # Formulario de contacto con validación y alertas
│   │   ├── Header.jsx             # Barra de navegación, búsqueda y carrito desplegable
│   │   ├── ProductDetailModal.jsx # Modal con especificaciones y ficha técnica
│   │   ├── ToastNotification.jsx  # Alerta contextual flotante temporal
│   │   ├── Footer.jsx             # Pie de página institucional
│   │   └── ScrollToTop.jsx        # Botón flotante para regresar al inicio
│   ├── services/
│   │   └── productService.js      # Servicio asíncrono (API Express + Fallback local)
│   ├── data.js                    # Dataset de videojuegos
│   ├── App.css                    # Estilos visuales del proyecto y tema gamer
│   ├── App.jsx                    # Componente raíz y orquestador del estado
│   ├── index.css                  # Variables CSS globales
│   └── main.jsx                   # Montaje de React 19 y Bootstrap
├── eslint.config.js               # Configuración de linter
├── index.html                     # Archivo HTML base
├── package.json                   # Dependencias y scripts de Vite
└── vite.config.js                 # Configuración del empaquetador
```

---

## 4. Instrucciones de Instalación y Ejecución

### Prerrequisitos
- Node.js versión 18 o superior instalada.
- npm (incluido con Node.js).

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/Lybern/Carolina_Delgado_PFY2201_EFT.git
cd Carolina_Delgado_PFY2201_EFT
```

### Paso 2: Ejecutar el Frontend
1. Instalar dependencias del proyecto:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abrir en el navegador:
   `http://localhost:5173`

*(Nota: La aplicación funciona de manera autónoma consumiendo `./data/productos.json` si no se inicia el backend).*

### Paso 3: Ejecutar el Backend (Opcional)
Si deseas levantar la API REST de Express:
1. Abrir una segunda terminal e ingresar a la carpeta `backend`:
   ```bash
   cd backend
   npm install
   npm start
   ```
2. La API quedará escuchando en `http://localhost:3000/api/productos`. El frontend detectará automáticamente el servidor y consumirá los datos desde allí.

### Paso 4: Generar Compilación de Producción
Para verificar que el código compila limpiamente para despliegue:
```bash
npm run build
```
Los archivos optimizados se generarán dentro de la carpeta `dist/`.

---

## 5. Control de Versiones

El desarrollo del proyecto se gestionó mediante Git y GitHub siguiendo buenas prácticas de control de versiones, realizando commits atómicos y descriptivos que documentan progresivamente la evolución del código:

- `feat: refactorizar EriGamesStore a SPA modular en React con Vite y carrito reactivo`
- `feat: configurar servidor backend Express y endpoints REST para productos`
- `feat: actualizar productService con consumo de API REST y fallback offline`
- `feat: incorporar componentes Carousel, OffersBanner y Services con estilos cinematicos`
- `chore: agregar configuracion de ESLint y documentacion de soporte`
