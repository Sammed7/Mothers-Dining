const { model } = require('mongoose')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// create user
const createUser = asyncHandler(async(req,res) => {
    const {name, email, password} = req.body
   
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(200).json({
            _id : user.id,
            name: user.name,
            email: user.email,
            password: user.password
        })
    }
})

const getUsers =  asyncHandler(async(req,res) => {
    const users = await User.find()
    res.status(200).json({
        users
    })
})

module.exports = {
    createUser,
    getUsers
}