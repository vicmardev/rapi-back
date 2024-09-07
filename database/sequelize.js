const {Sequelize} = require('sequelize')
const config = require('../config.json')


const sequelize = new Sequelize(config.connectionStringMariaDB, {
    logging: false
});

const syncDB = async sequelize=>{
    const models = sequelize.models
} 

const modelDefiners = [
    require('../models/users.model'),
    require('../models/skulls.model'),
    require('../models/users-skulls.model')
    /* require('../models/roles.model'),
    require('../models/skulls.model'),
    require('../models/users-skulls.model'), */
];

/* for (const modelDefiner of modelDefiners){
    modelDefiner(sequelize);
} */

for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

const associateModels = sequelize =>{
    const models = sequelize.models;

    models.UserSkull.belongsTo(models.Skull, {
        foreignKey: 'idSkull',
        as: 'SkullCount', // Alias opcional para la relación
    });

    models.Skull.hasMany(models.UserSkull, {
        foreignKey: 'idSkull',
        as: 'SkullCount', // Alias opcional para la relación
    });
    
}

associateModels(sequelize);
syncDB(sequelize);
module.exports = sequelize;