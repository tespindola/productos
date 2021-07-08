import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Controladores
import Producto from './controllers/Producto.js';

const PUERTO = process.env.PORT || 8080;

const server = app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en el puerto: ${server.address().port}`);
});
server.on('error', error => console.log(`Error al iniciar el servidor: ${error}`));

const routerProductos = express.Router();

routerProductos.get('/productos/', function(req, res) {
    let productos = new Producto().index();
    res.send(productos);
});

routerProductos.get('/productos/:id', function(req, res) {
    let producto = new Producto().index(req.params.id);
    res.send(producto);
});

routerProductos.post('/productos', function(req, res) {
    res.send(new Producto().create({title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail}));
});

routerProductos.put('/productos/:id', function(req, res) {
    res.send(new Producto().update({title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail, id: req.params.id}));
});

routerProductos.delete('/productos/:id', function(req, res) {
    res.send(new Producto().delete(req.params.id));
});

app.use('/api', routerProductos);

app.get('/', function(req, res) {
    res.sendFile(`${path.resolve()}/views/index.html`);
});