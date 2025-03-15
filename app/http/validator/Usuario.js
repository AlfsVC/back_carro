const { body } = require('express-validator');
const { Usuario } = require('../../model');

exports.Store = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El campo es requerido')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Solo puede contener letras y espacios')
        .isLength({ min: 5, max: 20 }).withMessage('Debe tener entre 5 y 20 caracteres'),

    body('apellido')
        .trim()
        .notEmpty().withMessage('El campo es requerido')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Solo puede contener letras y espacios')
        .isLength({ min: 5, max: 20 }).withMessage('Debe tener entre 5 y 20 caracteres'),

    body('correo')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('El campo es requerido')
        .isEmail().withMessage('Debe ser un correo válido')
        .isLength({ max: 100 }).withMessage('Debe tener máximo 100 caracteres')
        .custom(async (value) => {
            const user = await Usuario.findOne({ where: { correo: value } });
            if (user) {
                throw new Error('El correo ya está en uso');
            }
            return true;
        }),

    body('password')
        .notEmpty().withMessage('El campo es requerido')
        .isLength({ min: 5, max: 10 }).withMessage('Debe tener entre 5 y 10 caracteres'),

    body('telefono')
        .trim()
        .notEmpty().withMessage('El campo es requerido')
        .matches(/^\d+$/).withMessage('Debe ser numérico')
        .isLength({ min: 7, max: 15 }).withMessage('Debe tener entre 7 y 15 caracteres'),

    body('edad')
        .optional()
        .isInt({ min: 18 }).withMessage('Debe ser un número entero mayor o igual a 18')
];

exports.Update = [
    body('nombre')
        .trim()
        .notEmpty().withMessage('El campo es requerido')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Solo puede contener letras y espacios')
        .isLength({ min: 5, max: 20 }).withMessage('Debe tener entre 5 y 20 caracteres'),

    body('apellido')
        .trim()
        .notEmpty().withMessage('El campo es requerido')
        .matches(/^[a-zA-Z\s]+$/).withMessage('Solo puede contener letras y espacios')
        .isLength({ min: 5, max: 20 }).withMessage('Debe tener entre 5 y 20 caracteres'),

    body('correo')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('El campo es requerido')
        .isEmail().withMessage('Debe ser un correo válido')
        .isLength({ max: 100 }).withMessage('Debe tener máximo 100 caracteres')
        .custom(async (value, { req }) => {
            const { id_usuario } = req.params;
            const user = await Usuario.findOne({ where: { correo: value } });
            if (user && user.id_usuario !== parseInt(id_usuario, 10)) {
                throw new Error('El correo ya está en uso por otro usuario');
            }
            return true;
        }),

    body('telefono')
        .trim()
        .notEmpty().withMessage('El campo es requerido')
        .matches(/^\d+$/).withMessage('Debe ser numérico')
        .isLength({ min: 7, max: 15 }).withMessage('Debe tener entre 7 y 15 caracteres'),

    body('edad')
        .optional()
        .isInt({ min: 18 }).withMessage('Debe ser un número entero mayor o igual a 18')
];

exports.validateLogin = [
    body('correo')
        .trim()
        .toLowerCase()
        .notEmpty().withMessage('El campo es requerido')
        .isEmail().withMessage('Debe ser un correo válido'),

    body('password')
        .notEmpty().withMessage('El campo es requerido')
        .isLength({ min: 5, max: 10 }).withMessage('Debe tener entre 5 y 10 caracteres'),
];
