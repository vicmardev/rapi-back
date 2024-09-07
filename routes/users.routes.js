const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller')

router.post('/createUser', userController.createUser);
router.post('/loginUser', userController.loginUser)

module.exports = router