const roomModel=require('../models/room')
const userModel=require('../models/user')



exports.generateRoomId=(req,res,next)=>{
    var len = 6;
    var id="";
    var char_list =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i < len; i++) {
        
    id += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    
    roomModel.findOne({roomId:id}).then(idd=>{
        if(!idd){
            return res.status(200).send({roomId: id})
        }
        else{
            this.generateRoomId();
        }
    })
}


exports.createRoom=(req,res,next)=>{    
    let newRoom= new roomModel({
        roomName:req.body.roomName,
        numberOfParticipents:req.body.numberOfParticipents,
        roomPasscode:req.body.roomPasscode,
        rules:req.body.rules,
        roomId:req.body.roomId,
        players:req.body.players
    })
    newRoom.save().then(()=>{
        var roomData={
            roomName:req.body.roomName,
            numberOfParticipents:req.body.numberOfParticipents,
            rules:req.body.rules,
            roomId:req.body.roomId,
        }  
        return res.status(200).send({msg:'Room Created',roomData});
    })
}

exports.loginRoom=(req,res,next)=>{
    
    
    roomModel.findOne({roomId:req.body.roomId}).then((room)=>{
        if(!room){

            return res.status(200).send({msg:'Room not found'})
        }
        else{
            if(room.roomPasscode===req.body.roomPasscode)
            {
                roomModel.findOne({players:req.body.players}).then((player)=>{
                    if(!player){
                        roomModel.updateOne({$push:{players:req.body.players}}).then(()=>{
                            return res.status(200).send({msg:'Room Found',roomId:room.roomId})
            
                           }
                           )
                    }
                    else{
                        return res.status(200).send({msg:'Room Found',roomId:room.roomId})
                    }
                })
                
             }
             else {
                return res.status(200).send({msg:'Incorrect Password'})
             }
            
        }
    })
}

exports.fetchUser=(req,res,next)=>{
    roomModel.findOne({roomId:req.body.roomId}).then((room)=>{
        userModel.find({userEmail:{$in:room.players}}).select('firstName').then((playerDetail)=>{
            return res.status(200).send({players:room.players,playerDetails:playerDetail})
        })
        
    
    })
}