const router = require('express').Router();

const { Store, Update } = require('../http/validator/Usuario');
const authMiddleware = require('../http/middleware/authMiddleware');
const Usuario = require('../http/controller/usuarioController');

router.route('/')
    .get(authMiddleware, Usuario.index)
    .post(Store, Usuario.store)

router.route('/:id_usuario(\\d+)')
    .get(authMiddleware, Usuario.show)
    .put(Update, authMiddleware, Usuario.update)
    .delete(authMiddleware, Usuario.destroy)

module.exports = router;
