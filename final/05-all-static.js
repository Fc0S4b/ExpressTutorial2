const express = require('express');
const path = require('path');

const app = express();

// setup static and middleware
app.use(express.static('./public'));
// si index.html está en public entonces se seguirá renderizando todos los archivos estáticos sin necesidad de invocar sendFile
// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
//   adding to static assets
//   SSR (serving side rendering)
// })

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});

app.listen(5000, () => {
  console.log('server is listening on port 5000....');
});
