import express from 'express';

// Controladores
import Chat from '../controllers/Chat.js';

export default (io) => {
    const router = express.Router();

    router.post('/new-msg', function(req, res) {
        console.log(req.body);
        let msg = new Chat().sendMsg({email: req.body.email, msg: req.body.msg});
        io.emit('new-msg', msg);
        res.send('success');
    });

    return router;
}