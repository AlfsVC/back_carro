const { Model, DataTypes } = require('sequelize');
const Usuario = require('../model/usuario');

class Compra extends Model {
    static initialize(sequelize) {
        this.init(
            {
                id_compra: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                id_usuario: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Usuario,
                        key: 'id_usuario'
                    },
                    onDelete: 'CASCADE'
                },
                total: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                    validate: {
                        min: 0.01 // El total debe ser mayor a 0
                    }
                },
                fecha_compra: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW
                }
            },
            {
                sequelize,
                modelName: 'Compra',
                tableName: 'compras',
                timestamps: false
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
    }
}

module.exports = Compra;
