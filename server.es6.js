// Libraries
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import handlebars from 'express-handlebars';
import http from 'http';
import {Server} from 'socket.io';

// Routes
import routesProducts from './routes/products.js';
import routesChats from './routes/chat.js';

// Controladores
import Producto from './controllers/Producto.js';
import Chat from './controllers/Chat.js';

const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new Server(server);

const PUERTO = process.env.PORT || 8000;

server.listen(PUERTO, () => {
    console.log(`Servidor iniciado en el puerto: ${server.address().port}`);
});
server.on('error', error => console.log(`Error al iniciar el servidor: ${error}`));

app.engine("hbs", handlebars({
    extname: 'hbs',
    partialsDir: `${path.resolve()}/views/hbs/products`,
}));

app.set('view engine', 'hbs');
app.set('views', './views/hbs/');

/* app.set('views', './views/ejs/');
app.set('view engine', 'ejs'); */

/* app.set('views', './views/pug/');
app.set('view engine', 'pug'); */

app.use(express.static(`${path.resolve()}/public`));

app.use('/api', routesProducts(io));
app.use('/api/chat', routesChats(io));

app.get('/', function(req, res) {
    res.redirect('/productos');
});

app.get('/productos', function(req, res) {
    let productos = new Producto().index();
    let chat = new Chat().index();
    res.render('products/index', {productos, chat});
});

app.get('/productos/create', function(req, res) {
    res.render('products/create');
});