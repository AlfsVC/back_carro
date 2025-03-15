const { body } = require('express-validator');
const { Usuario, Carro } =  require('../../model');

exports.Store = [
    body('id_usuario')
        .not().isEmpty().withMessage('El id_usuario es requerido')
        .isInt().withMessage('El id_usuario debe ser un número entero')
        .custom(async (value) => {
            const usuario = await Usuario.findByPk(value);
            if (!usuario) {
                throw new Error('El usuario especificado no existe');
            }
            return true;
        }),

    body('id_carro')
        .not().isEmpty().withMessage('El id_carro es requerido')
        .isInt().withMessage('El id_carro debe ser un número entero')
        .custom(async (value) => {
            const carro = await Carro.findByPk(value);
            if (!carro) {
                throw new Error('El carro especificado no existe');
            }
            return true;
        }),

    body('cantidad')
        .not().isEmpty().withMessage('La cantidad es requerida')
        .isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1')
];

exports.Update = [
    body('id_usuario')
        .optional()
        .isInt().withMessage('El id_usuario debe ser un número entero')
        .custom(async (value) => {
            if (value) {
                const usuario = await Usuario.findByPk(value);
                if (!usuario) {
                    throw new Error('El usuario especificado no existe');
                }
            }
            return true;
        }),

    body('id_carro')
        .optional()
        .isInt().withMessage('El id_carro debe ser un número entero')
        .custom(async (value) => {
            if (value) {
                const carro = await Carro.findByPk(value);
                if (!carro) {
                    throw new Error('El carro especificado no existe');
                }
            }
            return true;
        }),

    body('cantidad')
        .optional()
        .isInt({ min: 1 }).withMessage('La cantidad debe ser al menos 1')
];
