const express = require('express');
const skullService = require('../services/skulls.service');

module.exports = {
    getAllSkulls,
    getSkullById,
    createSkulls
}

function getAllSkulls(req, res, next){
    skullService
    .getAllSkulls()
    .then(skullList => res.json(skullList))
    .catch(next)
}

function getSkullById (req, res, next){
    const idSkull = req.params.idSkull
    console.log('Llego al contralador, ', idSkull)
    skullService
    .getSkullById(idSkull)
    .then(skull => res.json(skull))
    .catch(next)
}

function createSkulls(req, res, next){
    skullService.createSkulls(req.body)
    .then(createSkull => res.json(createSkull))
    .catch(next)
}