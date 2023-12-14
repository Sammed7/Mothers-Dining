const express = require('express')
const router = express.Router()
const { signUp, getUsers, logIn } = require('../controllers/userController')

router.post('/signUp', signUp)
router.post('/logIn', logIn)
router.get('/getusers', getUsers)


module.exports = router