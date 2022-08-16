const express = require('express');
const app = express();

// es mejor tener logger en un segundo archivo
const logger = require('./logger');

const authorize = require('./authorize');
//  req => middleware => res
// con app.use usamos los middlewares para cada ruta, el orden importa donde se invoca app.use, si la usas después de un home, entonces home no tendrá el middleware
// se puede agregar rutas para aplicar middleware app.use('/api', logger) como base de ruta
app.use([logger, authorize]);
// Middleware se aplicará a todo lo que esté después de api
// api/home/about/products
app.get('/', (req, res) => {
  res.send('Home');
});
app.get('/about', (req, res) => {
  res.send('About');
});
app.get('/api/products', (req, res) => {
  res.send('Products');
});
app.get('/api/items', (req, res) => {
  console.log(req.user);
  res.send('Items');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
