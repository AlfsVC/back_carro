const { body } = require('express-validator');
const { Carro, Marca, Modelo } =  require('../../model');

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

    body('id_modelo')
        .not().isEmpty().withMessage('El id_modelo es requerido')
        .isInt().withMessage('El id_modelo debe ser un número entero')
        .custom(async (value) => {
            const modelo = await Modelo.findByPk(value);
            if (!modelo) {
                throw new Error('El modelo especificado no existe');
            }
            return true;
        }),

    body('nombre')
        .trim()
        .not().isEmpty().withMessage('El nombre del carro es requerido')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('descripcion')
        .trim()
        .not().isEmpty().withMessage('El nombre del carro es requerido')
        .isLength({ min: 3, max: 150 }).withMessage('El nombre debe tener entre 3 y 150 caracteres'),

    body('año')
        .not().isEmpty().withMessage('El año es requerido')
        .isInt({ min: 1886 }).withMessage('El año debe ser un número válido (mayor a 1885)'),

    body('precio')
        .not().isEmpty().withMessage('El precio es requerido')
        .isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0'),

    body('motor')
        .optional()
        .isLength({ max: 50 }).withMessage('El motor no debe exceder los 50 caracteres'),

    body('transmision')
        .not().isEmpty().withMessage('La transmisión es requerida')
        .isIn(['Manual', 'Automática']).withMessage('La transmisión debe ser "Manual" o "Automática"'),

    body('color')
        .optional()
        .isLength({ max: 50 }).withMessage('El color no debe exceder los 50 caracteres'),

    body('imagen')
        .optional()
        .isURL().withMessage('La imagen debe ser una URL válida'),

    body('stock')
        .not().isEmpty().withMessage('El stock es requerido')
        .isInt({ min: 0 }).withMessage('El stock no puede ser negativo')
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

    body('id_modelo')
        .optional()
        .isInt().withMessage('El id_modelo debe ser un número entero')
        .custom(async (value) => {
            if (value) {
                const modelo = await Modelo.findByPk(value);
                if (!modelo) {
                    throw new Error('El modelo especificado no existe');
                }
            }
            return true;
        }),

    body('nombre')
        .optional()
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('descripcion')
        .trim()
        .not().isEmpty().withMessage('El nombre del carro es requerido')
        .isLength({ min: 3, max: 150 }).withMessage('El nombre debe tener entre 3 y 150 caracteres'),
    body('año')
        .optional()
        .isInt({ min: 1886 }).withMessage('El año debe ser un número válido (mayor a 1885)'),

    body('precio')
        .optional()
        .isFloat({ min: 0.01 }).withMessage('El precio debe ser mayor a 0'),

    body('motor')
        .optional()
        .isLength({ max: 50 }).withMessage('El motor no debe exceder los 50 caracteres'),

    body('transmision')
        .optional()
        .isIn(['Manual', 'Automática']).withMessage('La transmisión debe ser "Manual" o "Automática"'),

    body('color')
        .optional()
        .isLength({ max: 50 }).withMessage('El color no debe exceder los 50 caracteres'),

    body('imagen')
        .optional()
        .isURL().withMessage('La imagen debe ser una URL válida'),

    body('stock')
        .optional()
        .isInt({ min: 0 }).withMessage('El stock no puede ser negativo')
];
