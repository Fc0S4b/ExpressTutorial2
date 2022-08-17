const express = require('express');
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));
// parse form data
app.use(express.urlencoded({ extended: false })); //middleware para decodificar el req del body
// parse json
app.use(express.json()); //convertimos a json para manejar req.body con el middleware

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post('/api/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' });
  }
  res.status(201).json({ success: true, person: name });
});
// en postman escribimos en el body { "name": "john"} y enviamos la solicitud usando método post, obtendremos todos los datos del array people ya que el name es true
app.post('/api/postman/people', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide name value' });
  }
  res.status(201).json({ success: true, data: [...people, name] });
});
// acá tratamos el login del form de index.html en methods public
app.post('/login', (req, res) => {
  const { name } = req.body; //destructurando body del req
  if (name) {
    return res.status(200).send(`Welcome ${name}`);
  }

  res.status(401).send('Please Provide Credentials');
});
// testeando el método put (para actualizar)
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params; //obtenemos el id desde el parámetro de la url
  const { name } = req.body; //se necesita enviar un name en el body request del postman para actualizar ese item, el body recoge el value a actualizar

  const person = people.find((person) => person.id === Number(id)); //buscamos si existe ese name que se pide en el req dentro del array people, se convierte en número el id ya que está en string

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name; //si person existe entonces le cambiamos el nombre al valor entregado de name en el body
    }
    return person;
  });
  res.status(200).json({ success: true, data: newPeople });
});
// método delete, similar a put a excepción de que no esperamos nada del body, solo eliminamos lo que piden en el req
app.delete('/api/people/:id', (req, res) => {
  const person = people.find((person) => person.id === Number(req.params.id)); //accediendo a los params directamente en vez de destructurar
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  const newPeople = people.filter(
    (person) => person.id !== Number(req.params.id)
  ); //buscamos si existe el person que se pide en el req
  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000....');
});
