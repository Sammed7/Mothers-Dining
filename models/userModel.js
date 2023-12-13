const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please enter name'],
        trim: true,
        maxlength: [50, 'name should be less than 50 characters']
    },
    email:{
        type: String,
        validate: [validator.isEmail, 'Please enter correct email']
    },
    password:{
        type: String,
        required: [true,'Please enter password'],
    },
    // confirm_password : {
    //     type: String,
    //     required: [true,'Please enter confirm password'],
    // }
})

module.exports = mongoose.model('user',userSchema)