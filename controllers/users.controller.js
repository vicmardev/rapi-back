const express = require('express');
const userService = require('../services/users.service');

module.exports = {
    createUser,
    loginUser
}

function createUser(req, res, next){
    //console.log('En el controlador createUser', req.body);
    userService.createUser(req.body)
    .then(user => res.json(user))
    .catch(next);
}

function loginUser(req, res, next){
    userService.loginUser(req.body)
    .then(user => res.json(user))
    .catch(next)
}