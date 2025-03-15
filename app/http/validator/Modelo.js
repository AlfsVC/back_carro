const { body } = require('express-validator');
const { Modelo, Marca } = require('../../model');

exports.Store = [
    body('id_marca')
        .not().isEmpty().withMessage('El id_marca es requerido')
        .isInt().withMessage('El id_marca debe ser un número entero')
        .custom(async (value) => {
            const marca = await Marca.findByPk(value);
            if (!marca) {
                throw new Error('La marca especificada no existe');
            }
            return true;
        }),

    body('detalle')
        .trim()
        .not().isEmpty().withMessage('El detalle es requerido')
        .isLength({ min: 3, max: 50 }).withMessage('El detalle debe tener entre 3 y 50 caracteres')
        .custom(async (value) => {
            const modelo = await Modelo.findOne({ where: { detalle: value } });
            if (modelo) {
                throw new Error('El detalle ya está en uso');
            }
            return true;
        }),
];

exports.Update = [
    body('id_marca')
        .optional()
        .isInt().withMessage('El id_marca debe ser un número entero')
        .custom(async (value) => {
            if (value) {
                const marca = await Marca.findByPk(value);
                if (!marca) {
                    throw new Error('La marca especificada no existe');
                }
            }
            return true;
        }),

    body('detalle')
        .trim()
        .not().isEmpty().withMessage('El detalle es requerido')
        .isLength({ min: 3, max: 50 }).withMessage('El detalle debe tener entre 3 y 50 caracteres')
        .custom(async (value, { req }) => {
            const { id_modelo } = req.params;
            const modelo = await Modelo.findOne({ where: { detalle: value } });
            if (modelo && modelo.id_modelo != id_modelo) {
                throw new Error('El detalle ya está en uso');
            }
            return true;
        }),
];
