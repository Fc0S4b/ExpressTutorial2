//http messages, ciclo de request/response:
// http request: data que va desde el navegador al servior node/express
// http response: data que va desde node/express al navegador
// existirá una respuesta mientras el servidor esté activo
// cloud server: conjunto de serviores
// estructura de http messages:
// ambos tienen una línea de inicio que contiene lo siguiente: método, una url y la versión de http
// ambos tienen headers opcionales
// un mensaje que indica que la info fué enviada de forma efectiva.
// headers son la info y un body opcional
// request messages es lo que envía el usuario
// response messages es lo que configuraremos en node/express
// http methods son: get, post, put, delete. GET es default.
// headers son info opcional que apoyan al request, son key value pairs
// si solo quieres el recurso en el request, entonces no hay body, pero si quieres actualizar un recurso, entonces si hay body, esto también es llamado payload
// response message tiene también la versión http, status code y status test
// status code 200 es que la request fue buena. 400 algún tipo de error
// response message tiene headers con info sobre la response. Obtenemos de vuelta un JSON con la data que nos entrega la api
const http = require('http');

const server = http.createServer((req, res) => {
  // console.log(req.method)
  const url = req.url;
  // home page
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<h1>home page</h1>');
    res.end();
  }
  // about page
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<h1>about page</h1>');
    res.end();
  }
  // 404
  else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('<h1>page not found</h1>');
    res.end();
  }
});

server.listen(5000);
