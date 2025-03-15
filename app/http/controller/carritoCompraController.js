const { validationResult } = require('express-validator');
const { CarritoCompra, Usuario, Carro } = require('../../model');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');
class CarritoCompraController {
    // Listar el carrito de un usuario
    index = async (req, res) => {
        try {
            const { id_usuario } = req.params;
    
            // Verificar si el usuario existe
            const usuario = await Usuario.findByPk(id_usuario);
            if (!usuario) {
                return error(res, 'El usuario no existe!', 404);
            }
    
            // Obtener todos los productos en el carrito del usuario
            const carrito = await CarritoCompra.findAll({
                where: { id_usuario },
                include: [
                    {
                        model: Carro,
                        as: 'carro',
                        attributes: ['id_carro', 'nombre', 'descripcion', 'precio', 'stock', 'imagen']
                    }
                ]
            });
    
            if (!carrito.length) {
                return success(res, 'El carrito está vacío.', 200, []);
            }
    
            return success(res, 'Lista de productos en el carrito.', 200, carrito);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };
    

    // Obtener un solo producto del carrito de compras
    show = async (req, res) => {
        try {
            const { id_carrito } = req.params;

            const carrito = await CarritoCompra.findByPk(id_carrito, {
                include: [
                    {
                        model: Carro,
                        as: 'carro',
                        attributes: ['id_carro', 'nombre', 'descripcion', 'precio', 'stock', 'imagen']
                    }
                ]
            });

            if (!carrito) {
                return error(res, 'El producto en el carrito no existe!', 404);
            }

            return success(res, 'Producto encontrado en el carrito.', 200, carrito);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    store = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }
    
            const { id_usuario, id_carro, cantidad } = req.body;
    
            // Verificar que el usuario exista
            const usuario = await Usuario.findByPk(id_usuario);
            if (!usuario) {
                return error(res, 'El usuario no existe.', 404);
            }
    
            // Verificar que el carro exista y tenga suficiente stock
            const carro = await Carro.findByPk(id_carro);
            if (!carro) {
                return error(res, 'El carro no existe.', 404);
            }
    
            // Verificar si el carro ya está en el carrito del usuario
            let carrito = await CarritoCompra.findOne({ where: { id_usuario, id_carro } });
    
            if (carrito) {
                // **Nueva cantidad incluyendo la existente**
                const nuevaCantidad = carrito.cantidad + cantidad;
    
                // **Validar que la nueva cantidad no supere el stock**
                if (nuevaCantidad > carro.stock) {
                    return error(res, 'Stock insuficiente para actualizar la cantidad.', 400);
                }
    
                // **Actualizar la cantidad en el carrito**
                await carrito.update({ cantidad: nuevaCantidad });
            } else {
                // **Validar que la cantidad inicial no supere el stock**
                if (cantidad > carro.stock) {
                    return error(res, 'Stock insuficiente.', 400);
                }
    
                // **Crear el registro en el carrito**
                carrito = await CarritoCompra.create({ id_usuario, id_carro, cantidad });
            }
    
            // **Actualizar el stock después de la compra**
            await carro.update({ stock: carro.stock - cantidad });
    
            return success(res, 'Carro agregado al carrito con éxito!', 201, carrito);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };
    


    // Actualizar cantidad de un carro en el carrito
    update = async (req, res) => {
        try {
            const { id_carrito } = req.params;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }

            const { cantidad } = req.body;

            const carrito = await CarritoCompra.findByPk(id_carrito);
            if (!carrito) {
                return error(res, 'El carrito no existe!.', 404);
            }

            // Verificar el stock del carro
            const carro = await Carro.findByPk(carrito.id_carro);
            if (!carro) {
                return error(res, 'El carro no existe.', 404);
            }
            if (carro.stock < cantidad) {
                return error(res, 'Stock insuficiente.', 400);
            }

            await carrito.update({ cantidad });

            return success(res, 'Cantidad actualizada con éxito!.', 200, carrito);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Eliminar un carro del carrito
    destroy = async (req, res) => {
        try {
            const { id_carrito } = req.params;

            const carrito = await CarritoCompra.findByPk(id_carrito);
            if (!carrito) {
                return error(res, 'El carrito no existe!.', 404);
            }

            await carrito.destroy();

            return success(res, 'Carro eliminado del carrito con éxito!.', 200);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Vaciar el carrito de un usuario
    clear = async (req, res) => {
        try {
            const { id_usuario } = req.params;

            const usuario = await Usuario.findByPk(id_usuario);
            if (!usuario) {
                return error(res, 'El usuario no existe!.', 404);
            }

            await CarritoCompra.destroy({ where: { id_usuario } });

            return success(res, 'Carrito vaciado con éxito!.', 200);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };
}

module.exports = new CarritoCompraController();
