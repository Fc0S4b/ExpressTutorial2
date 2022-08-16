// middleware son funciones que se ejecutan durante la solicitud al servidor. Cada middleware tiene acceso a la req y res del objeto
const express = require('express');
const app = express();
// ejemplo de middleware
//  req => middleware => res

const logger = (req, res, next) => {
  //podemos acceder al req, res y otro parámetro mas
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next(); //next es para dar el pase a la siguiente etapa del ciclo de request para llegar al response, no es necesario cuando estás respondiendo con res.send
};
// app.get para / y about y entremedio la función middleware logger
app.get('/', logger, (req, res) => {
  res.send('Home');
});
app.get('/about', logger, (req, res) => {
  res.send('About');
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
