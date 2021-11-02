const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SongSchema = new Schema({
    roomId: {
        type: String,required: true
    },
    songLink:{
        type:String,required:true
    },
    userEmail:{
        type:String,required:true
    },
   
}, {timestamps: true},{versionKey:false}
)

module.exports =  mongoose.model('song', SongSchema )