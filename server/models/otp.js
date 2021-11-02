const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OTPchema = new Schema({
    userEmail: {
        type: String,required: true
    },
    otp: {
        type: String,required:true
    },
}, {timestamps: true},{versionKey:false}
)

module.exports =  mongoose.model('otp', OTPchema )