const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const { Usuario } = require('../../model/');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');

class UsuarioController {    
    async login (req, res) {
        try {
            // Validación de entradas
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }
            
            const { correo, password } = req.body;
            
            // Autenticación de usuario
            const autenticar = await Usuario.scope('withPassword').findOne({ where: { correo } });
            if (!autenticar) { return error(res, 'El usuario no existe!.', 404); }
            
            const passwordValid = await autenticar.comparePassword(password);
            if (!passwordValid) { return error(res, 'Clave incorrecta!.', 401); }

            // Desestructuración de datos del usuario
            const { id_usuario, nombre, apellido } = autenticar;

            // Concatenación de nombre y apellido
            const nombreCompleto = `${nombre} ${apellido}`;

            // Generación del token JWT
            const token = jwt.sign(
                { id_usuario, nombre_completo: nombreCompleto }, 
                process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_TTL }
            );

            // Respuesta de éxito
            return success(res, 'Acceso exitoso!.', 200, { token, nombre_completo: nombreCompleto });
        } catch (e) {
            // Manejo de errores
            return error(res, e.message, 500);
        }
    }
}

module.exports = new UsuarioController()