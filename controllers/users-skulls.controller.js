const express = require('express');
const usersSkullsService = require('../services/users-skulls.service');

module.exports = {
    createUserSkull,
    countVotes
}

function createUserSkull (req, res, next){
    usersSkullsService.createUserSkull(req.body)
    .then(userSkulls => res.json(userSkulls))
    .catch(next)
}

function countVotes(req, res, next){
    const idSkull = req.params.idSkull
    console.log('Llego al controlador', idSkull)
    usersSkullsService.countVotes(idSkull)
    .then(skull => res.json(skull))
    .catch(next)
}

