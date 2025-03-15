const { body } = require('express-validator');
const { Compra, Carro } = require('../../model');

exports.Store = [
    body('id_compra')
        .not().isEmpty().withMessage('El id_compra es requerido')
        .isInt().withMessage('El id_compra debe ser un número entero')
        .custom(async (value) => {
            const compra = await Compra.findByPk(value);
            if (!compra) {
                throw new Error('La compra especificada no existe');
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
        .isInt({ min: 1 }).withMessage('La cantidad debe ser mayor a 0'),

    body('precio_unitario')
        .not().isEmpty().withMessage('El precio unitario es requerido')
        .isFloat({ min: 0.01 }).withMessage('El precio unitario debe ser mayor a 0')
];

exports.Update = [
    body('id_compra')
        .optional()
        .isInt().withMessage('El id_compra debe ser un número entero')
        .custom(async (value) => {
            if (value) {
                const compra = await Compra.findByPk(value);
                if (!compra) {
                    throw new Error('La compra especificada no existe');
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
        .isInt({ min: 1 }).withMessage('La cantidad debe ser mayor a 0'),

    body('precio_unitario')
        .optional()
        .isFloat({ min: 0.01 }).withMessage('El precio unitario debe ser mayor a 0')
];
