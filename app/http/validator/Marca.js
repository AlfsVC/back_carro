const { body } = require('express-validator');
const { Marca } =  require('../../model');

exports.Store = [
    body('detalle')
        .trim()
        .not().isEmpty().withMessage('El detalle es requerido')
        .isLength({ min: 3, max: 50 }).withMessage('El detalle debe tener entre 3 y 50 caracteres')
        .custom(async (value) => {
            const marca = await Marca.findOne({ where: { detalle: value } });
            if (marca) {
                throw new Error('El detalle ya está en uso');
            }
            return true;
        }),
];

exports.Update = [
    body('detalle')
        .trim()
        .not().isEmpty().withMessage('El detalle es requerido')
        .isLength({ min: 3, max: 50 }).withMessage('El detalle debe tener entre 3 y 50 caracteres')
        .custom(async (value, { req }) => {
            const { id_marca } = req.params;
            const marca = await Marca.findOne({ where: { detalle: value } });
            if (marca && marca.id_marca != id_marca) {
                throw new Error('El detalle ya está en uso');
            }
            return true;
        }),
];
