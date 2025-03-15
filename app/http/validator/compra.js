const { body } = require('express-validator');
const { Usuario } = require('../../model');

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

    body('total')
        .not().isEmpty().withMessage('El total de la compra es requerido')
        .isFloat({ min: 0.01 }).withMessage('El total debe ser mayor a 0')
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

    body('total')
        .optional()
        .isFloat({ min: 0.01 }).withMessage('El total debe ser mayor a 0')
];
