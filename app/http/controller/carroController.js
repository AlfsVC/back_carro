const { validationResult } = require('express-validator');
const { Carro, Marca, Modelo } = require('../../model');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');
class CarroController {
    // Listar todos los carros
    index = async (req, res) => {
        try {
            const carros = await Carro.findAll({
                include: [
                    {
                        model: Marca,
                        as: 'marca',
                        attributes: ['id_marca', 'detalle']
                    },
                    {
                        model: Modelo,
                        as: 'modelo',
                        attributes: ['id_modelo', 'detalle']
                    }
                ]
            });

            return success(res, 'ok!.', 200, carros);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Obtener un carro por ID
    show = async (req, res) => {
        try {
            const { id_carro } = req.params;

            const carro = await Carro.findOne({
                where: { id_carro },
                include: [
                    {
                        model: Marca,
                        as: 'marca',
                        attributes: ['id_marca', 'detalle']
                    },
                    {
                        model: Modelo,
                        as: 'modelo',
                        attributes: ['id_modelo', 'detalle']
                    }
                ]
            });

            if (!carro) {
                return error(res, 'El carro no existe!.', 404);
            }

            return success(res, 'ok!.', 200, carro);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Crear un nuevo carro
    store = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }

            const { id_marca, id_modelo, nombre,descripcion, año, precio, motor, transmision, color, imagen, stock } = req.body;

            // Verificar que la marca y el modelo existan
            const marca = await Marca.findByPk(id_marca);
            if (!marca) {
                return error(res, 'La marca especificada no existe.', 404);
            }

            const modelo = await Modelo.findByPk(id_modelo);
            if (!modelo) {
                return error(res, 'El modelo especificado no existe.', 404);
            }

            const carro = await Carro.create({
                id_marca,
                id_modelo,
                nombre,descripcion,
                año,
                precio,
                motor,
                transmision,
                color,
                imagen,
                stock
            });

            return success(res, 'Carro creado con éxito!.', 201, carro);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Actualizar un carro por ID
    update = async (req, res) => {
        try {
            const { id_carro } = req.params;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }

            const carro = await Carro.findByPk(id_carro);
            if (!carro) {
                return error(res, 'El carro no existe!.', 404);
            }

            const { id_marca, id_modelo, nombre,descripcion, año, precio, motor, transmision, color, imagen, stock } = req.body;

            // Verificar si se cambiaron la marca o el modelo y si existen
            if (id_marca) {
                const marca = await Marca.findByPk(id_marca);
                if (!marca) {
                    return error(res, 'La marca especificada no existe.', 404);
                }
            }

            if (id_modelo) {
                const modelo = await Modelo.findByPk(id_modelo);
                if (!modelo) {
                    return error(res, 'El modelo especificado no existe.', 404);
                }
            }

            await carro.update({
                id_marca,
                id_modelo,
                nombre,descripcion,
                año,
                precio,
                motor,
                transmision,
                color,
                imagen,
                stock
            });

            return success(res, 'Carro actualizado con éxito!.', 200, carro);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };

    // Eliminar un carro por ID
    destroy = async (req, res) => {
        try {
            const { id_carro } = req.params;

            const carro = await Carro.findByPk(id_carro);
            if (!carro) {
                return error(res, 'El carro no existe!.', 404);
            }

            await carro.destroy();

            return success(res, 'Carro eliminado con éxito!.', 200, carro);
        } catch (e) {
            return error(res, e.message, 500);
        }
    };
}

module.exports = new CarroController();
