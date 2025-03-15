const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class Usuario extends Model {
    static initialize(sequelize) {
        this.init(
            {
                id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
                nombre: { type: DataTypes.STRING(20), allowNull: true },
                apellido: { type: DataTypes.STRING(20), allowNull: true },
                telefono: { type: DataTypes.STRING(20), allowNull: true },
                correo: { type: DataTypes.STRING(100), allowNull: false, unique: true },
                password: { type: DataTypes.STRING(255), allowNull: false }
            }, 
            {
                sequelize,
                modelName: 'Usuario',
                tableName: 'Usuarios', // Se corrige el nombre para coincidir con la BD
                defaultScope: {
                    attributes: { exclude: ['password'] } // Oculta la contraseña por defecto
                },
                scopes: {
                    withPassword: {
                        attributes: { include: ['password'] } // Solo mostrar contraseña si se usa este scope
                    }
                },
                hooks: {            
                    beforeSave: async (usuario) => {
                        if (usuario.changed('password')) {
                            console.log('Cifrando contraseña');
                            usuario.password = await bcrypt.hash(usuario.password, 10);
                        }
                    }
                }
            }
        );
    }    
    
    async comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

module.exports = Usuario;
