const { validationResult } = require('express-validator');
const { Usuario } = require('../../model/');
const { error, success } = require('../helpers/httpResponse');
const { validationErrors } = require('../helpers/myHelper');
 
class UsuarioController {
    index = async (req, res) => {
        try {
            const usuariop = await Usuario.findAll();
            return success(res, 'ok!.', 200, usuariop);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
    
    show = async (req, res) => {
        try {
            const { id_usuario } = req.params;

            const usuariop = await Usuario.findByPk(id_usuario);
            if (!usuariop) { return error(res, 'El Usuario no existe!.', 404); }
            
            return success(res, 'ok!.', 200, usuariop);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
    
    store = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }
            
            const { nombre, apellido, telefono, correo, password } = req.body;
            const usuariop = await Usuario.create({
                nombre, 
                apellido, 
                telefono, 
                correo, 
                password
            });
            const userResponse = usuariop.toJSON();
            delete userResponse.password;

            return success(res, 'Creado con éxito!.', 201, userResponse);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
    
    update = async (req, res) => {        
        try {
            const { id_usuario } = req.params;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const myErrors = validationErrors(errors.array());
                return error(res, 'Error de validación!.', 422, myErrors);
            }
 
            const usuariop = await Usuario.findByPk(id_usuario);
            if (!usuariop) { return error(res, 'El Usuario no existe!.', 404); }
    
            const { nombre, apellido, telefono, correo, password } = req.body;
    
            await usuariop.update({
                nombre, 
                apellido, 
                telefono, 
                correo, 
                password
            });
            
            return success(res, 'Actualizado con éxito!.', 200,usuariop);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
    
    destroy = async (req, res) => {        
        try {
            const { id_usuario } = req.params;
            
            const usuariop = await Usuario.findByPk(id_usuario);
            if (!usuariop) { return error(res, 'El Usuario no existe!.', 404); }
            usuariop.destroy();
            return success(res, 'Eliminado con éxito!.', 200,usuariop);
        } catch (e) {
            return error(res, e.message, 500);
        }
    }
}

module.exports = new UsuarioController()