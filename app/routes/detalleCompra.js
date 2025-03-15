const router = require('express').Router();
const authMiddleware = require('../http/middleware/authMiddleware');
const { Store, Update } = require('../http/validator/detalleCompra');
const DetalleCompra = require('../http/controller/detalleCompraController');

router.route('/')
    .get(authMiddleware, DetalleCompra.index)   // Listar todos los detalles de compra
    .post(authMiddleware, Store, DetalleCompra.store);  // Crear un detalle de compra

router.route('/:id_detalle(\\d+)')
    .get(authMiddleware, DetalleCompra.show)    // Obtener un detalle de compra específico
    .put(authMiddleware, Update, DetalleCompra.update)  // Actualizar un detalle de compra
    .delete(authMiddleware, DetalleCompra.destroy);     // Eliminar un detalle de compra

module.exports = router;
