const express = require('express');
const app = express();
const morgan = require('morgan');
const logger = require('./logger');
const authorize = require('./authorize');
//  req => middleware => res

// app.use([logger, authorize])
// app.use(express.static('./public'))
// morgan es un middleware de terceros
app.use(morgan('tiny')); // tiny arroja minimal output

app.get('/', (req, res) => {
  res.send('Home');
});
app.get('/about', (req, res) => {
  res.send('About');
});
app.get('/api/products', (req, res) => {
  res.send('Products');
});
// si queremos agregar middleware a solo una req, lo hacemos en el segundo argumento del get
// app.get('api/items', [logger, authorize], (req, res)=>{})
app.get('/api/items', (req, res) => {
  console.log(req.user);
  res.send('Items');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});

// opciones de middleware, usar las que creamos, usar las que tiene express o un tercero, para esto dos últimos puedes buscar referencias en docs
// un ejemplo de middleware de express es static en app.use(express.static('./public'))
// si es de un tercero, hay que instalarlo, en este ejemplo usamos morgan
