const userModel=require('../models/user')

exports.signup=(req,res,next)=>{
    console.log(req.body)
    userModel.findOne({userEmail:req.body.userEmail}).then(user=>{
        console.log(user)
        if(!user){
            
            let newUser=new userModel({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userEmail: req.body.userEmail,
                password: req.body.password,
            })
            newUser.save().then(()=>{
               return res.status(200).send({msg:'User Added'});
            })
        } 
        else {
        return res.status(200).send({msg:"User Already Exists"});
        }
    }).catch(err => {
        return res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    })
}

    exports.signin=(req,res,next)=>{
        
        userModel.findOne({userEmail:req.body.userEmail}).then(user=>{
            if(user){
                if(user.userEmail===req.body.userEmail){
                    var respon={  firstName: user.firstName,
                        lastName: user.lastName,
                        userEmail: user.userEmail,

                    }
                    return res.status(200).send({msg:'User LoggedIn',respon});
                }
                else{
                    return res.status(200).send({msg:'Invalid Password'});

                } 
            }
            else{
                return res.status(200).send({msg:'invalid Email address'});

            }
        }).catch(err => {
            return res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        })
    }


    exports.updateUserPassword=(req,res,next)=>{
        var myQuery={userEmail:req.body.userEmail}
        var newValue={password:req.body.password}
        userModel.updateOne(myQuery,newValue, function(err, response) {
            if (err){
                return res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            } 
           else{
            return res.status(200).send({msg:'Password changed successfully'});
           }
            
          })
    }
    exports.fetchUserName=(req,res,next)=>{


        userModel.find({userEmail:{$in:req.body.players}}).then((users)=>{
            console.log(users)
        })
    }

