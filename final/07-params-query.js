const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>'); //agregamos un enlace a api/products
});
app.get('/api/products', (req, res) => {
  //configuramos el get para ese enlace
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });

  res.json(newProducts); //como response se verá id, name e image, no necesariamente tiene que ser todo el json
});
// ahora si es para un id específico: (recuerda usar :)
app.get('/api/products/:productID', (req, res) => {
  // console.log(req) //objeto gigante
  // console.log(req.params) // veremos el productID que estamos solicitando
  const { productID } = req.params; //destructuramos el productID que necesitamos

  const singleProduct = products.find(
    (product) => product.id === Number(productID) //verificamos con un find para que coincida con el product que buscamos
  );
  if (!singleProduct) {
    //en caso de que no exista esa coincidencia
    return res.status(404).send('Product Does Not Exist');
  }

  return res.json(singleProduct); //devolvemos la respuesta en formato json
});

// para búsquedas mas complejas se puede extender más la ruta
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params);
  res.send('hello world');
});
// query string, usamos un ejemplo de api de algolia versión 1
app.get('/api/v1/query', (req, res) => {
  // console.log(req.query)// tendremos todos los parámetros que se ven en la url después de query? en un objeto
  const { search, limit } = req.query; //parámetros que tiene la api para parámetros de búsqueda y de límite de resultados
  let sortedProducts = [...products]; //todos los datos de la data products

  if (search) {
    //buscamos si coincide la búsqueda con algún product
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    //manejamos la cantidad de resultados desde 0 hasta el límite indicado
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send('no products matched your search');
    return res.status(200).json({ success: true, data: [] }); //más común configurar este tipo de respuesta, con success true y un array vacío, ya que la solicitud fue exitosa pero se devuelve nada
    // si omitimos el return, javascript seguirá ejecutando la siguiente línea, es decir se verá mas de una respuesta para la misma solicitud (error en terminal)
  }
  res.status(200).json(sortedProducts); //si no hay query? se devuelve todo los productos
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
