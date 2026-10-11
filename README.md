# 🎮 EriGamesStore (EGS) — Evaluación Final Transversal (EFT)

**Asignatura:** Desarrollo Frontend I (PFY2201)  
**Institución:** Duoc UC — Escuela de Informática y Telecomunicaciones  
**Estudiante:** Carolina Delgado  
**Tecnologías:** React 19, Vite, Bootstrap 5.3, Bootstrap Icons, JavaScript (ES6+), CSS3  
**Entrega:** Single Page Application (SPA) modularizada en componentes React.

---

## 📌 1. Descripción del Proyecto

**EriGamesStore (EGS)** es una plataforma eCommerce moderna y responsiva de venta de videojuegos y artículos gamer, diseñada con temática *Dark Gamer* de alto contraste.

Evolucionando desde la versión inicial de la Semana 6 (JavaScript Vanilla y manipulación manual del DOM), esta versión para la **Evaluación Final Transversal (EFT)** fue refactorizada completamente a una **Single Page Application (SPA)** modular utilizando **React** y el empaquetador **Vite**, eliminando el uso de librerías en tiempo de ejecución en el navegador (*No Babel Standalone*), empaquetando dependencias localmente y optimizando el ciclo de vida de los componentes con Hooks nativos (`useState`, `useEffect`).

---

## 🚀 2. Características y Funcionalidades Principales

1. **Catálogo Dinámico de Videojuegos:**
   - Carga asíncrona mediante `fetch` y `useEffect` desde `./data/productos.json`.
   - Renderizado condicional con **Spinner de carga** y gestión amigable de errores con botón interactivo de reintento.
2. **Filtrado Reactivo por Categorías:**
   - Botones tipo *Nav-Pills* para alternar entre categorías (*Todos, Aventura y Acción, Rol (RPG), Plataformas, Deportes, Survival Horror*).
3. **Búsqueda en Tiempo Real:**
   - Barra de búsqueda reactiva en la cabecera que filtra instantáneamente por título, plataforma o descripción.
4. **Selector Interactivo de Visualización:**
   - Botones para alternar la visualización del catálogo entre formato de **Cuadrícula (Grid)** y **Lista (List)** mediante estado de React.
5. **Carrito de Compras Flotante e Interactivo:**
   - Desplegable integrado en el encabezado con contador dinámico de unidades (*badge*).
   - Control granular de cantidades (`+` y `-`) con eliminación automática al llegar a cero.
   - Eliminación de ítems individuales y botón de vaciado total.
   - Cálculo del monto acumulado en tiempo real en pesos chilenos ($ CLP).
   - **Persistencia en LocalStorage:** Sincronización continua de los productos, unidades y montos para conservar la sesión del usuario.
6. **Modal de Ficha Técnica (`ProductDetailModal`):**
   - Ventana modal accesible de Bootstrap que presenta carátula, sinopsis, especificaciones técnicas (género, idiomas, desarrollador, espacio) y comparativa de precio normal vs. oferta.
7. **Notificación Flotante Toast (`ToastNotification`):**
   - Notificación contextual que aparece automáticamente al agregar un título al carrito con cierre temporizado (3.2 segundos).
8. **Formulario de Contacto Validado (`ContactForm`):**
   - Formulario con campos controlados (`useState`), validación de campos obligatorios y formato de email, emitiendo alertas dinámicas de éxito o advertencia.
9. **Botón Flotante Scroll to Top (`ScrollToTop`):**
   - Botón interactivo para regresar suavemente al inicio tras desplazarse por el sitio.

---

## 🧱 3. Arquitectura Modular de Componentes React

```
src/
├── components/
│   ├── ContactForm.jsx          # Formulario de soporte con validaciones
│   ├── Footer.jsx               # Pie de página con información institucional
│   ├── Header.jsx               # Barra de navegación, buscador y carrito flotante
│   ├── HeroBanner.jsx           # Banner principal y títulos destacados
│   ├── ProductDetailModal.jsx   # Ventana modal de especificaciones técnicas
│   ├── ProductList.jsx          # Catálogo, selector de vista y filtros
│   ├── ScrollToTop.jsx          # Botón flotante para regresar arriba
│   └── ToastNotification.jsx   # Notificación temporal al agregar al carrito
├── services/
│   └── productService.js       # Servicio desacoplado para consumo asíncrono (fetch)
├── App.css                      # Estilos de componentes, carrito flotante y estética gamer
├── App.jsx                      # Componente raíz y orquestador del estado global
├── index.css                    # Variables CSS, paleta de colores y estilos base
└── main.jsx                     # Punto de entrada de React con Bootstrap 5
```

---

## ⚙️ 4. Instalación y Ejecución Local

### Prerrequisitos
- **Node.js** (versión 18 o superior recomendada, testeado en v24)
- **npm** (versión 9 o superior)

### Pasos de Instalación:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Lybern/Carolina_Delgado_PFY2201_EFT.git
   cd Carolina_Delgado_PFY2201_EFT
   ```

2. **Instalar dependencias locales:**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *El sitio estará disponible en `http://localhost:5173`.*

4. **Generar compilación optimizada para producción:**
   ```bash
   npm run build
   ```
   *Genera los archivos estáticos en la carpeta `dist/` listos para desplegar.*

5. **Previsualizar la compilación de producción:**
   ```bash
   npm run preview
   ```

---

## 📋 5. Cumplimiento de la Pauta de Evaluación (EFT Duoc UC)

| Criterio Evaluado | Implementación en EriGamesStore |
|---|---|
| **Estructura y Tecnologías** | Proyecto SPA construido con React y Vite; Bootstrap 5.3 y Bootstrap Icons instalados como dependencias locales. |
| **Diseño y Maquetación** | Interfaz responsiva *Dark Gamer* adaptada para escritorio y móvil con grillas de Bootstrap y CSS3. |
| **Manipulación del DOM y Reactividad** | Renderizado declarativo con `useState` y mapeo `.map()` de tarjetas y elementos del carrito, sin manipulación directa manual. |
| **Flujo de Datos (Props y Callbacks)** | Comunicación unidireccional de datos (props hacia componentes hijos) y funciones callback para mutar el estado global en `App.jsx`. |
| **Consumo Asíncrono de Datos** | Módulo `productService.js` con llamada `fetch` y `useEffect`, gestión de Spinner de carga y manejo de fallos. |
| **Validación de Formularios** | `ContactForm` valida campos vacíos y formato de correo electrónico antes de emitir feedback. |
| **Buenas Prácticas e Industria** | Código modularizado, comentarios JSDoc, persistencia en `localStorage`, `README.md` exhaustivo y exclusión de artefactos innecesarios en `.gitignore`. |

---
**Desarrollado por Carolina Delgado — Duoc UC 2026**
