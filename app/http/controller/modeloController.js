const { validationResult } = require('express-validator');
const { Modelo, Marca } = require('../../model');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');

class ModeloController {
    // Listar todos los modelos
    index = async (req, res) => {
        try {
            const modelos = await Modelo.findAll({
                include: [
                    {
                        model: Marca,
                        as: 'marca',
                        attributes: ['id_marca', 'detalle'],
                        required: false,
                    },
                ],
            });
            return success(res, 'ok!.', 200, modelos);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };
    
    // Obtener un modelo por ID con su marca asociada
    show = async (req, res) => {
        try {
            const { id_modelo } = req.params;

            const modelo = await Modelo.findOne({
                where: { id_modelo },
                include: [
                    {
                        model: Marca,
                        as: 'marca',
                        attributes: ['id_marca', 'detalle'],
                        required: false,
                    },
                ],
            });

            if (!modelo) {
                return error(res, 'El modelo no existe!.', 404);
            }

            return success(res, 'ok!.', 200, modelo);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Crear un nuevo modelo
    store = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }

            const { id_marca, detalle } = req.body;

            // Verificar que la marca exista
            const marca = await Marca.findByPk(id_marca);
            if (!marca) {
                return error(res, 'La marca especificada no existe.', 404);
            }

            const modelo = await Modelo.create({ id_marca, detalle });
            return success(res, 'Creado con éxito!.', 201, modelo);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Actualizar un modelo por ID
    update = async (req, res) => {
        try {
            const { id_modelo } = req.params;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }

            const modelo = await Modelo.findByPk(id_modelo);
            if (!modelo) {
                return error(res, 'El modelo no existe!.', 404);
            }

            const { id_marca, detalle } = req.body;

            // Verificar si se cambió la marca y si existe
            if (id_marca) {
                const marca = await Marca.findByPk(id_marca);
                if (!marca) {
                    return error(res, 'La marca especificada no existe.', 404);
                }
            }

            await modelo.update({ id_marca, detalle });

            return success(res, 'Actualizado con éxito!.', 200, modelo);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Eliminar un modelo por ID
    destroy = async (req, res) => {
        try {
            const { id_modelo } = req.params;

            const modelo = await Modelo.findByPk(id_modelo);
            if (!modelo) {
                return error(res, 'El modelo no existe!.', 404);
            }

            await modelo.destroy();

            return success(res, 'Eliminado con éxito!.', 200, modelo);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };
}

module.exports = new ModeloController();
