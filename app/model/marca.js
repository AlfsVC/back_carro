const { Model, DataTypes } = require('sequelize');

class Marca extends Model {
    static initialize(sequelize) {
        this.init(
            {
                id_marca: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                detalle: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                    unique: true
                }
            },
            {
                sequelize,
                modelName: 'Marca',
                tableName: 'marcas',
                timestamps: false
            }
        );
    }
}

module.exports = Marca;
