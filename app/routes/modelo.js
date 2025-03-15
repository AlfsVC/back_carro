const router = require('express').Router();
const authMiddleware = require('../http/middleware/authMiddleware');
const { Store, Update } = require('../http/validator/Modelo');
const Modelo = require('../http/controller/modeloController');

router.route('/')
    .get(authMiddleware, Modelo.index)   // Listar todos los modelos
    .post(authMiddleware, Store, Modelo.store);  // Crear un nuevo modelo

router.route('/:id_modelo(\\d+)')
    .get(authMiddleware, Modelo.show)    // Obtener un modelo específico
    .put(authMiddleware, Update, Modelo.update)  // Actualizar un modelo
    .delete(authMiddleware, Modelo.destroy);     // Eliminar un modelo

module.exports = router;
