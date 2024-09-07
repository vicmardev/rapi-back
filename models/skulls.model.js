const {DataTypes, Model} = require('sequelize');

module.exports = sequelize => {
    class Skull extends Model {
        static associate (models){}
    }

    Skull.init (
        {
            idSkull: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            idUser: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            skullTitle: {
                type: DataTypes.STRING,
                allowNull: true
            },
            skullText:{
                type: DataTypes.STRING,
                allowNull: true
            },
            skullImageRoute: {
                type: DataTypes.STRING,
                allowNull: true
            },
            skullStatus: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            createdAt: {
                type: DataTypes.DATE,
                unique: false,
                allowNull: true
            },
            updatedAt: {
                type: DataTypes.DATE,
                unique: false,
                allowNull: true
            }   
        },
        {
            sequelize,
            modelName: 'Skull',
            tableName: 'Skulls',
            timestamps: true,
        }
    )

}

