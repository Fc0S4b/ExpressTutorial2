const express = require('express');
// path viene con node, esto es para ir a la ruta de index.html de la navbar-app
const path = require('path');

const app = express();

// setup static and middleware
app.use(express.static('./public')); //de esta forma usa style.css, logo.svg sin tener que hacer la request con los content types. Recuerda usar app.use para setear el middleware. static significa que son archivos que el servidor no tiene que cambiarlos, lo común es dejar estos archivos en la carpeta en public (son estáticos en el server pero pueden ser dinámicos en el navegador)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html')); //puede ser resolve o join
});

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});

app.listen(5000, () => {
  console.log('server is listening on port 5000....');
});
