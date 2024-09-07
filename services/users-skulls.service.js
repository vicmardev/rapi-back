const {models} = require('../database/sequelize');;
const {Op} = require("sequelize");;

module.exports ={
    createUserSkull,
    countVotes,
}

async function countVotes(params){
    if(params){
        const totalVotes = await models.UserSkull.count({
            where: {
                idSkull: params
            }
        })
        console.log('Total de votos', totalVotes)
        return totalVotes
    }
    else {
        return 'No existe '
    }
}

async function createUserSkull(params){
    const validateVoteUnique = await validateVote(params)
    console.log('El valor de validate vote', validateVoteUnique)
    let userSkull;
    if(validateVoteUnique === 'Create'){
        userSkull = await models.UserSkull.create(
            {
                idUser: params.idUser,
                idSkull: params.idSkull,
            }
        )
        return userSkull
    }
    else {
        return userSkull = 'Duplicate vote'
    }
}

async function validateVote(params){
    console.log('Entro a validar el voto', params)
    console.log('IdUser', params.idUser, 'IdSkull', params.idSkull)
    const findVote = await models.UserSkull.findOne(
        {
            where: {
                [Op.and]:[
                    { idUser: params.idUser },
                    { idSkull: params.idSkull }
                ]
            }
        }
    )
    if(!findVote){
        return 'Create';
    }
    else {
        return findVote;
    }
}