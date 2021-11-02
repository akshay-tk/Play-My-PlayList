const songModel=require('../models/song')



exports.addSong=(req,res,next)=>{
        console.log(req.body)
        let newSong= new songModel({
            songLink:req.body.songLink,
            userEmail:req.body.userEmail,
            roomId:req.body.roomId
        })
        newSong.save().then(()=>{
            return res.status(200).send({msg:'Song Added'});

        })
}
exports.fetchSong=(req,res,next)=>{
    songModel.find({userEmail:req.body.userEmail}).select('songLink').then((song)=>{
        return res.status(200).send({songs:song})
    })
}