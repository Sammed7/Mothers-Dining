const express = require('express')
const router = express.Router()
const { signUp, getUsers } = require('../controllers/userController')

router.post('/signUp', signUp)
router.get('/getusers', getUsers)

module.exports = router