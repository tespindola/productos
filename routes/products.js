import express from 'express';

// Controladores
import Producto from '../controllers/Producto.js';

const router = express.Router();

router.get('/productos/:id', function(req, res) {
    let producto = new Producto().index(req.params.id);
    res.send(producto);
});

router.post('/productos', function(req, res) {
    new Producto().create({title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail})
    res.redirect('/productos');
});

router.put('/productos/:id', function(req, res) {
    res.send(new Producto().update({title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail, id: req.params.id}));
});

router.delete('/productos/:id', function(req, res) {
    res.send(new Producto().delete(req.params.id));
});

export default router;