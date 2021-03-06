const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    firstName: {
        type: String,required: true
    },
    lastName: {
        type: String,required: true
    },
    userEmail:{
        type: String
    },
    password: {
        type: String
    },
    roomID:[String],

}, {timestamps: true},{versionKey:false}
)

module.exports =  mongoose.model('users', UserSchema )