const { Model, DataTypes } = require('sequelize');
const Compra = require('../model/compra');
const Carro = require('../model/carro');

class DetalleCompra extends Model {
    static initialize(sequelize) {
        this.init(
            {
                id_detalle: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                id_compra: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Compra,
                        key: 'id_compra'
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
                        min: 1 // La cantidad debe ser mayor a 0
                    }
                },
                precio_unitario: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                    validate: {
                        min: 0.01 // El precio unitario debe ser mayor a 0
                    }
                },
                subtotal: {
                    type: DataTypes.VIRTUAL,
                    get() {
                        return this.cantidad * this.precio_unitario;
                    }
                }
            },
            {
                sequelize,
                modelName: 'DetalleCompra',
                tableName: 'detalle_compras',
                timestamps: false
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Compra, { foreignKey: 'id_compra', as: 'compra' });
        this.belongsTo(models.Carro, { foreignKey: 'id_carro', as: 'carro' });
    }
}

module.exports = DetalleCompra;
