//const {Datatypes, Model} = require('sequelize')
const {DataTypes, Model} = require('sequelize');
module.exports = sequelize => {
    class User extends Model {
        static associate(models){}
    }

    User.init(
        {
            idUser: {
                type: DataTypes.INTEGER,
                primaryKey: true, 
                autoIncrement: true,
                allowNull: false
            },
            idRol: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            nameUser:{
                type: DataTypes.STRING,
                allowNull: false
            },
            lastNameUser:{
                type: DataTypes.STRING,
                allowNull: false
            },
            emailUser:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull:false
            },
            tokenUser:{
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                unique: false,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                unique: false,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'Users',
            timestamps: true
        }
    )
}