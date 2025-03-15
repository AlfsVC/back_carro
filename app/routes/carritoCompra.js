const router = require('express').Router();
const authMiddleware = require('../http/middleware/authMiddleware');
const { Store, Update } = require('../http/validator/carritoCompra');
const CarritoCompra = require('../http/controller/carritoCompraController');

// Listar todos los carritos de compra
router.route('/')
    .get(authMiddleware, CarritoCompra.index)   // Listar todos los carritos de compra
    .post(authMiddleware, Store, CarritoCompra.store);  // Agregar un carro al carrito

// Obtener un solo producto del carrito y actualizar/eliminar un carrito específico
router.route('/:id_carrito(\\d+)')
    .get(authMiddleware, CarritoCompra.show)   // Obtener un solo producto del carrito
    .put(authMiddleware, Update, CarritoCompra.update)  // Actualizar un carrito
    .delete(authMiddleware, CarritoCompra.destroy);     // Eliminar un carrito

// Nueva ruta para listar todos los productos en el carrito de un usuario específico
router.get('/usuario/:id_usuario(\\d+)', authMiddleware, CarritoCompra.index);  

module.exports = router;
