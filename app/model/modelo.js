const { Model, DataTypes } = require('sequelize');
const Marca = require('./marca'); // Importamos el modelo de Marca

class Modelo extends Model {
    static initialize(sequelize) {
        this.init(
            {
                id_modelo: {
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
                detalle: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    unique: true
                }
            },
            {
                sequelize,
                modelName: 'Modelo',
                tableName: 'modelos',
                timestamps: false
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Marca, {
            foreignKey: 'id_marca',
            as: 'marca'
        });
    }
}

module.exports = Modelo;
