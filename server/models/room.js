const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RoomSchema = new Schema({
    roomName: {
        type: String,required: true
    },
    roomPasscode: {
        type: String
    },
    rules:{
        type: String
    },
    roomId:{
        type: String
    },
    numberOfParticipents:{
        type: Number
    },
    players:[String],
}, {timestamps: true},{versionKey:false}
)

module.exports =  mongoose.model('room', RoomSchema )