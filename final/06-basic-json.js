const express = require('express');
const app = express();
const { products } = require('./data');
app.get('/', (req, res) => {
  res.json(products); //ahora estás sirviendo products del archivo data como api en el port 5000
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
