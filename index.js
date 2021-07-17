// Libraries
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import handlebars from 'express-handlebars';

// Routes
import routesProducts from './routes/products.js';

// Controladores
import Producto from './controllers/Producto.js';

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const PUERTO = process.env.PORT || 8000;

const server = app.listen(PUERTO, () => {
    console.log(`Servidor iniciado en el puerto: ${server.address().port}`);
});
server.on('error', error => console.log(`Error al iniciar el servidor: ${error}`));

app.engine("hbs", handlebars({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './views/hbs/');

/* app.set('views', './views/ejs/');
app.set('view engine', 'ejs'); */

/* app.set('views', './views/pug/');
app.set('view engine', 'pug'); */

app.use(express.static(`${path.resolve()}/public`));

app.use('/api', routesProducts);

app.get('/', function(req, res) {
    res.redirect('/productos');
});

app.get('/productos', function(req, res) {
    let productos = new Producto().index();
    res.render('products/index', {productos});
});

app.get('/productos/create', function(req, res) {
    res.render('products/create');
});