const express = require('express')
const router =  express.Router();
const usersSkullsController = require('../controllers/users-skulls.controller')

router.post('/createUserSkull', usersSkullsController.createUserSkull)
router.get('/getVotes/:idSkull', usersSkullsController.countVotes)

module.exports = router;