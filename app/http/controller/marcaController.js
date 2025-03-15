const { validationResult } = require('express-validator');
const { Marca } = require('../../model');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');
class MarcaController {
    // Listar todas las marcas
    index = async (req, res) => {
        try {
            const marcas = await Marca.findAll();
            return success(res, 'Listado obtenido con éxito.', 200, marcas);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Mostrar una marca por ID
    show = async (req, res) => {
        try {
            const { id_marca } = req.params;
            const marca = await Marca.findByPk(id_marca);
            if (!marca) {
                return error(res, 'La marca no existe.', 404);
            }
            return success(res, 'Marca encontrada.', 200, marca);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Crear una nueva marca
    store = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación.', 422, myErrors);
            }

            const { detalle } = req.body;
            const marca = await Marca.create({ detalle });

            return success(res, 'Marca creada con éxito.', 201, marca);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Actualizar una marca por ID
    update = async (req, res) => {
        try {
            const { id_marca } = req.params;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación.', 422, myErrors);
            }

            const marca = await Marca.findByPk(id_marca);
            if (!marca) {
                return error(res, 'La marca no existe.', 404);
            }

            const { detalle } = req.body;
            await marca.update({ detalle });

            return success(res, 'Marca actualizada con éxito.', 200, marca);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Eliminar una marca por ID
    destroy = async (req, res) => {
        try {
            const { id_marca } = req.params;
            const marca = await Marca.findByPk(id_marca);
            if (!marca) {
                return error(res, 'La marca no existe.', 404);
            }

            await marca.destroy();
            return success(res, 'Marca eliminada con éxito.', 200, marca);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };
}

module.exports = new MarcaController();
