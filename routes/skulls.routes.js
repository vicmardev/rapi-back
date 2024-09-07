const express = require('express')
const router = express.Router();
const skullController = require('../controllers/skulls.controller')

router.get('/getAllSkulls', skullController.getAllSkulls)
router.get('/getSkullById/:idSkull', skullController.getSkullById)
router.post('/createSkulls', skullController.createSkulls)
module.exports = router