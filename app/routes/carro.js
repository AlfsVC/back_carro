const router = require('express').Router();
const authMiddleware = require('../http/middleware/authMiddleware');
const { Store, Update } = require('../http/validator/carro');
const Carro = require('../http/controller/carroController');

router.route('/')
    .get(authMiddleware, Carro.index)   // Listar todos los carros
    .post(authMiddleware, Store, Carro.store);  // Crear un nuevo carro

router.route('/:id_carro(\\d+)')
    .get(authMiddleware, Carro.show)    // Obtener un carro específico
    .put(authMiddleware, Update, Carro.update)  // Actualizar un carro
    .delete(authMiddleware, Carro.destroy);     // Eliminar un carro

module.exports = router;
