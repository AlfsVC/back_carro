const { validationResult } = require('express-validator');
const { Compra, Usuario } = require('../../model');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');

class CompraController {
    // Listar todas las compras
    index = async (req, res) => {
        try {
            const compras = await Compra.findAll({
                include: [
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['id_usuario', 'nombre', 'apellido', 'correo'],
                        required: false,
                    },
                ],
            });

            return success(res, 'ok!.', 200, compras);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Obtener una compra por ID
    show = async (req, res) => {
        try {
            const { id_compra } = req.params;

            const compra = await Compra.findOne({
                where: { id_compra },
                include: [
                    {
                        model: Usuario,
                        as: 'usuario',
                        attributes: ['id_usuario', 'nombre', 'apellido', 'correo'],
                        required: false,
                    },
                ],
            });

            if (!compra) {
                return error(res, 'La compra no existe!.', 404);
            }

            return success(res, 'ok!.', 200, compra);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Crear una nueva compra
    store = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }

            const { id_usuario, total } = req.body;

            // Verificar que el usuario exista
            const usuario = await Usuario.findByPk(id_usuario);
            if (!usuario) {
                return error(res, 'El usuario especificado no existe.', 404);
            }

            const compra = await Compra.create({
                id_usuario,
                total,
            });

            return success(res, 'Compra creada con éxito!.', 201, compra);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Actualizar una compra por ID
    update = async (req, res) => {
        try {
            const { id_compra } = req.params;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }

            const compra = await Compra.findByPk(id_compra);
            if (!compra) {
                return error(res, 'La compra no existe!.', 404);
            }

            const { id_usuario, total } = req.body;

            // Verificar si se cambió el usuario y si existe
            if (id_usuario) {
                const usuario = await Usuario.findByPk(id_usuario);
                if (!usuario) {
                    return error(res, 'El usuario especificado no existe.', 404);
                }
            }

            await compra.update({
                id_usuario,
                total,
            });

            return success(res, 'Compra actualizada con éxito!.', 200, compra);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Eliminar una compra por ID
    destroy = async (req, res) => {
        try {
            const { id_compra } = req.params;

            const compra = await Compra.findByPk(id_compra);
            if (!compra) {
                return error(res, 'La compra no existe!.', 404);
            }

            await compra.destroy();

            return success(res, 'Compra eliminada con éxito!.', 200, compra);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };
}

module.exports = new CompraController();
