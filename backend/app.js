const express = require('express');
const cors = require('cors');
const productos = require('./data/productos.json');

const app = express();
app.use(cors());

// Ruta raíz: redirige automáticamente a la API de productos
app.get('/', (req, res) => {
  res.redirect('/api/productos');
});

// Endpoint REST del catálogo de productos
app.get('/api/productos', (req, res) => {
  res.status(200).json(productos);
});

// Ruta alternativa de conveniencia
app.get('/productos', (req, res) => {
  res.status(200).json(productos);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor EriGamesStore API escuchando en http://localhost:${PORT}`);
});
