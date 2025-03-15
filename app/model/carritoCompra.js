const { Model, DataTypes } = require('sequelize');
const Usuario = require('../model/usuario');
const Carro = require('../model/carro');

class CarritoCompra extends Model {
    static initialize(sequelize) {
        this.init(
            {
                id_carrito: {
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
                id_carro: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Carro,
                        key: 'id_carro'
                    },
                    onDelete: 'CASCADE'
                },
                cantidad: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    validate: {
                        min: 1 // La cantidad debe ser al menos 1
                    }
                },
                fecha_agregado: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW
                }
            },
            {
                sequelize,
                modelName: 'CarritoCompra',
                tableName: 'carrito_compras',
                timestamps: false
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'id_usuario', as: 'usuario' });
        this.belongsTo(models.Carro, { foreignKey: 'id_carro', as: 'carro' });
    }
}

module.exports = CarritoCompra;
