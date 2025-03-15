const { Model, DataTypes } = require('sequelize');
const Marca = require('../model/marca');
const Modelo = require('./modelo');

class Carro extends Model {
    static initialize(sequelize) {
        this.init(
            {
                id_carro: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                id_marca: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Marca,
                        key: 'id_marca'
                    },
                    onDelete: 'CASCADE'
                },
                id_modelo: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: Modelo,
                        key: 'id_modelo'
                    },
                    onDelete: 'CASCADE'
                },
                nombre: {
                    type: DataTypes.STRING(50),
                    allowNull: false
                },
                descripcion: {
                    type: DataTypes.STRING(150),
                    allowNull: false
                },
                

                año: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                precio: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                    validate: {
                        min: 0.01 // No puede ser negativo ni cero
                    }
                },
                motor: {
                    type: DataTypes.STRING(50),
                    allowNull: true
                },
                transmision: {
                    type: DataTypes.ENUM('Manual', 'Automática'),
                    allowNull: false
                },
                color: {
                    type: DataTypes.STRING(50),
                    allowNull: true
                },
                imagen: {
                    type: DataTypes.STRING(255),
                    allowNull: true // URL de la imagen
                },
                stock: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    defaultValue: 1,
                    validate: {
                        min: 0 // No puede ser negativo
                    }
                }
            },
            {
                sequelize,
                modelName: 'Carro',
                tableName: 'carros',
                timestamps: false
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Marca, { foreignKey: 'id_marca', as: 'marca' });
        this.belongsTo(models.Modelo, { foreignKey: 'id_modelo', as: 'modelo' });
    }
}

module.exports = Carro;
