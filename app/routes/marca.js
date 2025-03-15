const router = require('express').Router();
const authMiddleware = require('../http/middleware/authMiddleware');
const { Store, Update } = require('../http/validator/Marca');
const Marca = require('../http/controller/marcaController');

router.route('/')
    .get(authMiddleware, Marca.index)   // Listar todas las marcas (requiere autenticación)
    .post(authMiddleware, Store, Marca.store);  // Crear una marca con validación

router.route('/:id_marca(\\d+)')
    .get(authMiddleware, Marca.show)    // Obtener una marca específica
    .put(authMiddleware, Update, Marca.update)  // Actualizar marca con validación
    .delete(authMiddleware, Marca.destroy);     // Eliminar marca

module.exports = router;
