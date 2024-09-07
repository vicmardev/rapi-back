const {DataTypes, Model} = require ('sequelize')

module.exports = sequelize => {
    class UserSkull extends Model{
        static associate(models){

        }
    }

    UserSkull.init(
        {
            idUsersSkulls: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            idUser:{
                type: DataTypes.INTEGER,
                allowNull: true
            },
            idSkull: {
                type: DataTypes.INTEGER,
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
            modelName: 'UserSkull',
            tableName: 'UsersSkulls',
            timestamps: true,
        }
    )
}

