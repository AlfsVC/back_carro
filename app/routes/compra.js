const router = require('express').Router();
const authMiddleware = require('../http/middleware/authMiddleware');
const { Store, Update } = require('../http/validator/compra');
const Compra = require('../http/controller/compraController');

router.route('/')
    .get(authMiddleware, Compra.index)   // Listar todas las compras (requiere autenticación)
    .post(authMiddleware, Store, Compra.store);  // Crear compra con validación

router.route('/:id_compra(\\d+)')
    .get(authMiddleware, Compra.show)    // Obtener una compra específica
    .put(authMiddleware, Update, Compra.update)  // Actualizar compra
    .delete(authMiddleware, Compra.destroy);     // Eliminar compra

module.exports = router;
