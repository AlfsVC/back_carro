const { validationResult } = require('express-validator');
const { DetalleCompra, Compra, Carro } = require('../../model');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');

class DetalleCompraController {
    // Listar todos los detalles de compra
    index = async (req, res) => {
        try {
            const detalles = await DetalleCompra.findAll({
                include: [
                    {
                        model: Compra,
                        as: 'compra',
                        attributes: ['id_compra', 'fecha_compra', 'total'],
                        required: false,
                    },
                    {
                        model: Carro,
                        as: 'carro',
                        attributes: ['id_carro', 'id_marca', 'id_modelo'],
                        required: false,
                    },
                ],
            });

            return success(res, 'ok!.', 200, detalles);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Obtener un detalle de compra por ID
    show = async (req, res) => {
        try {
            const { id_detalle } = req.params;

            const detalle = await DetalleCompra.findOne({
                where: { id_detalle },
                include: [
                    {
                        model: Compra,
                        as: 'compra',
                        attributes: ['id_compra', 'fecha_compra', 'total'],
                        required: false,
                    },
                    {
                        model: Carro,
                        as: 'carro',
                        attributes: ['id_carro', 'id_marca', 'id_modelo'],
                        required: false,
                    },
                ],
            });

            if (!detalle) {
                return error(res, 'El detalle de compra no existe!.', 404);
            }

            return success(res, 'ok!.', 200, detalle);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Crear un nuevo detalle de compra
    store = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }

            const { id_compra, id_carro, cantidad, precio_unitario } = req.body;

            // Verificar que la compra exista
            const compra = await Compra.findByPk(id_compra);
            if (!compra) {
                return error(res, 'La compra especificada no existe.', 404);
            }

            // Verificar que el carro exista
            const carro = await Carro.findByPk(id_carro);
            if (!carro) {
                return error(res, 'El carro especificado no existe.', 404);
            }

            const detalle = await DetalleCompra.create({
                id_compra,
                id_carro,
                cantidad,
                precio_unitario,
            });

            return success(res, 'Detalle de compra creado con éxito!.', 201, detalle);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Actualizar un detalle de compra por ID
    update = async (req, res) => {
        try {
            const { id_detalle } = req.params;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }

            const detalle = await DetalleCompra.findByPk(id_detalle);
            if (!detalle) {
                return error(res, 'El detalle de compra no existe!.', 404);
            }

            const { id_compra, id_carro, cantidad, precio_unitario } = req.body;

            // Verificar si se cambió la compra y si existe
            if (id_compra) {
                const compra = await Compra.findByPk(id_compra);
                if (!compra) {
                    return error(res, 'La compra especificada no existe.', 404);
                }
            }

            // Verificar si se cambió el carro y si existe
            if (id_carro) {
                const carro = await Carro.findByPk(id_carro);
                if (!carro) {
                    return error(res, 'El carro especificado no existe.', 404);
                }
            }

            await detalle.update({
                id_compra,
                id_carro,
                cantidad,
                precio_unitario,
            });

            return success(res, 'Detalle de compra actualizado con éxito!.', 200, detalle);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Eliminar un detalle de compra por ID
    destroy = async (req, res) => {
        try {
            const { id_detalle } = req.params;

            const detalle = await DetalleCompra.findByPk(id_detalle);
            if (!detalle) {
                return error(res, 'El detalle de compra no existe!.', 404);
            }

            await detalle.destroy();

            return success(res, 'Detalle de compra eliminado con éxito!.', 200, detalle);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };
}

module.exports = new DetalleCompraController();
