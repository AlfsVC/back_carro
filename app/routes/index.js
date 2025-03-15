const router = require('express').Router();

const usuario = require('./usuario.js');
const authenticate = require('./authenticate.js');
const marca = require('./marca.js');
const modelo = require('./modelo.js');
const carro = require('./carro.js');
const compra = require('./compra.js');
const detalleCompra = require('./detalleCompra.js');
const carritoCompra = require('./carritoCompra.js');

router.use(`/${process.env.API_PATH}/usuario`, usuario);
router.use(`/${process.env.API_PATH}/autenticar`, authenticate);
router.use(`/${process.env.API_PATH}/marca`, marca);
router.use(`/${process.env.API_PATH}/modelo`, modelo);
router.use(`/${process.env.API_PATH}/carro`, carro);
router.use(`/${process.env.API_PATH}/compra`, compra);
router.use(`/${process.env.API_PATH}/detalle-compra`, detalleCompra);
router.use(`/${process.env.API_PATH}/carrito-compra`, carritoCompra);

module.exports = router;
