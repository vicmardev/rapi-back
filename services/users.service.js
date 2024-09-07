const {models} = require ('../database/sequelize');
const {Op} = require ("sequelize");
module.exports = {
    createUser,
    loginUser
}

async function createUser(params){
    const result = {status: false, msg: '', data: {}};
    const validateUser = await validateCrateUser(params);
    console.log('validateUser', validateUser);
    const provider = params.provider;
    let user;
    if(validateUser ==='Create'){
        console.log('Un nuevo usuario se creara')
        if(provider){
            if(provider === 'FACEBOOK'){
                console.log('Entro a Face')
                user = await models.User.create({
                    idRol: 3,
                    nameUser:params.name,
                    lastNameUser:params.lastName,
                    emailUser: params.email,
                    password: '',
                    tokenUser: params.authToken
                    /*createdAt: 'July 21, 1983 01:15:00',
                    updatedAt: 'July 21, 1983 01:15:00' */
                });
            }
            else if(provider === 'GOOGLE'){
                user = await models.User.create({
                    idRol: 3,
                    nameUser:params.name,
                    lastNameUser:params.lastName,
                    emailUser: params.email,
                    password: '',
                    tokenUser: params.idToken
                    /* createdAt: 'July 21, 1983 01:15:00',
                    updatedAt: 'July 21, 1983 01:15:00' */
                });
            }
        }
        else{
            user = await models.User.create({
                idRol: 3,
                nameUser:params.nameUser,
                lastNameUser:params.lastNameUser,
                emailUser: params.emailUser,
                password: params.passwordUser,
                tokenUser: ''
                /* createdAt: 'July 21, 1983 01:15:00',
                updatedAt: 'July 21, 1983 01:15:00' */
            });
        }
        result.data = user;
        result.msg ='Nuevo usuario'
        result.status = true
        return result;
    }
    else {
        result.data = validateUser;
        result.msg ='Usuario existente'
        result.status = true
        return result
    }
}

async function validateCrateUser(params){
    let email;
    if(params.email){
        email = params.email
    }

    if(params.emailUser){
        email = params.emailUser
    }
    
    const findUser = await models.User.findOne(
        {
            where: {
                emailUser: email
            }
        }
    )
    if(!findUser){
        return 'Create'
    }
    else {
        return findUser
    }

}

async function loginUser(params){
    console.log('Valor de params', params)
    const userLogged = await models.User.findOne(
        {
            where: {
                [Op.and]:[
                    { emailUser: params.emailUserLogin },
                    { password: params.passwordUserLogin}
                ]
            }
        }
    )
    if(!userLogged){
        console.log('userLogged', userLogged)
        return 'User not existing'
    }
    else {
        return userLogged
    }
}