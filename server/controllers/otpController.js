const otpModel=require('../models/otp')
const userModel=require('../models/user')
"use strict";
const nodemailer = require("nodemailer");

exports.createOtp=(req,res,next)=>{
    userModel.findOne({userEmail:req.body.userEmail}).then(user=>{
if(!user){
    return res.status(200).send({msg:'Email Not Found'})
}
else{
    var len = 6;
    var Otp="";
    var char_list =
    "0123456789";
    for (var i = 0; i < len; i++) {
        
    Otp += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    var emailDetails={email:req.body.userEmail,
        otp:Otp}
    sendOtp(emailDetails);
    let newOtp= new otpModel({
        userEmail:req.body.userEmail,
        otp:Otp
    })
    newOtp.save()
    return res.status(200).send({msg:`OTP created`,otp:Otp})
}

    }).catch(err => {
        return res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    })
}



exports.verifyOtp=(req,res,next)=>{

    otpModel.findOne({userEmail:req.body.userEmail}).then(user=>{
        if(user){

            if(user.otp==req.body.otp)
            { 
                var deleteQuery ={userEmail:req.body.userEmail,otp:req.body.otp};

                otpModel.deleteOne(deleteQuery).then(ootp=>{
                    console.log("success")
                })
                return res.status(200).send({msg:"Valid OTP"})
            }
            else{
                return res.status(200).send({msg:"Invalid OTP"})
   
            }
        }
    
    else{
        return res.status(200).send({msg:'Email Not Found'})
    }

    }).catch(err => {
        return res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    })

}



async function sendOtp(details) {
    
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'akshay123appu@gmail.com',
      pass: 'djuwrlhdippcbytm'
    }
  });
  
  var mailOptions = {
    from: 'akshay123appu@gmail.com',
    to: details.email,
    subject: `Play My PlayList : password change`,
    text: `otp to change password ${details.otp}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("error"+error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  }

sendOtp().catch(console.error);
































function createTestAccount(){
    return({user:'akshay123appu@gmail.com',pass:'tk916akshay@'})
}