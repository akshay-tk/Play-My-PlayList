import React, { Component } from "react";
import Navigation from "../navigation/Navigation"
import "./resetPassword.css";
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import {Button} from 'react-bootstrap';


class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      userEmail: "",
      password: "",
      confirmPassword: "",
      otpState: "Initial Stage",
      messageStatus:"",
    };
    this.otpCreation = this.otpCreation.bind(this);
    this.handleOTP = this.handleOTP.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewPassword= this.handleNewPassword.bind(this);
    this.gotoLoginPage= this.gotoLoginPage.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  otpCreation(event) {
    event.preventDefault();
    var userData = {
      userEmail: this.state.userEmail,
    };

    axios({
        url : "/forgot-password/create-otp",
        method : "post",
        data : userData
    }).then((response) => {
            if(response.data.msg==="OTP created") {
              this.setState({ otpState: "OTP created" ,messageStatus:"OTP Created"})
            }
            else if(response.request.responseText==="User not found") {
              this.setState({ messageStatus:"Invalid Email"})
            }
          })
            .catch(function (err) {
            });
  }
  handleOTP(event) {
    event.preventDefault();
    var userData = {
      userEmail: this.state.userEmail,
      otp: this.state.otp,
    };

    axios({
        url:"/forgot-password/verify-otp",
        method:"post",
        data:userData
    }).then((response) => {
            if(response.data.msg==="Valid OTP") {
              this.setState({ otpState: "Valid OTP" ,messageStatus:"Valid OTP"})
            }
            else if (response.data.msg==="Invalid OTP"){
              this.setState({messageStatus:"Invalid OTP"})
            }
          })
          .catch(function (err) {
            console.log(err);
          });
   }
   handleNewPassword(event){
     event.preventDefault();
    
   
     if(this.state.confirmPassword===this.state.password)
     {var length = this.state.password.length;
      if (length > 7) {
      var userData = {
        userEmail: this.state.userEmail,
        password:this.state.password,
      }

    axios({
        url:"/forgot-password/update-password",
        method:"post",
        data:userData
    }).then((response) => {
          
            if(response.data.msg==="Password changed successfully") {
              this.setState({ otpState: "" ,messageStatus:"Password changed"})
            }
          })
          .catch(function (err) {
            console.log(err);
          });
        } else if(length<8)
        {this.setState({messageStatus:"Password Length"})}

     }
     else if(this.state.confirmpassword!==this.state.password){
       this.setState({messageStatus:"Password Match"})

     }
   }
   handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword });
  };
   gotoLoginPage(event) {
     event.preventDefault();
     localStorage.setItem('userEmail', "");

     this.props.history.push("/sign-page")
   }

  render() {
    return (
        <React.Fragment>
        <Navigation/>
        <div className='reset-password-wrapper'>
        <form onSubmit={this.handleSignIn} className="reset-password-form-fields">
      

     
          <div className="signup-heading">Reset Password</div>   
      
      
      <div className="form-label-input-grid">
          <label>Email:</label>
            <div className="login-row-grid-input" >
            <input className="signIn-textbox"
                       required
                       type="email"
                       name="userEmail"
                       value={this.state.userEmail}
                       onChange={this.handleChange}/>
            </div>   

          </div>
          {this.state.messageStatus==="Password changed" &&<div><div className="signup-warning">Password Changed successfully!!!!You Can Login Now</div>
          <Button  className="signin-button"
                      type="submit"
                      onClick={this.gotoLoginPage }
                      > Login</Button></div> }


            {this.state.messageStatus==="Invalid Email"&&<div className="signup-warning">User not found </div>}
            {this.state.otpState === "Initial Stage" && (
                      <Button  className="signin-button"
                      type="submit"
                      onClick={this.otpCreation }
                      > Next</Button>
                    )}
            {this.state.otpState === "OTP created" && (   
                <div>
                 <div className="form-label-input-grid">
                 <label>OTP:</label>
                   <div className="login-row-grid-input" >
                   <input className="signIn-textbox"
                              required
                              type="text"
                              name="otp"
                              value={this.state.otp}
                              onChange={this.handleChange}/>
                   </div> 
                   </div>  
                  
                   {this.state.messageStatus==="OTP created"&&<div className="signup-warning">OTP send to your email Address</div>}
                   {this.state.messageStatus==="Invalid OTP" && <div className="signup-warning">Invalid OTP </div>}

                   <Button  className="signin-button"
                     type="submit"
                     onClick={this.handleOTP}
           > Verify OTP</Button>
                 </div>
                 
            )  }   
             {this.state.otpState === "Valid OTP" && (
                 <div>
                               <div className="form-label-input-grid">
               <label>new Password:</label>
               <div className="login-row-grid-input" >
                <input className="signIn-textbox"
                       required
                       type={this.state.showPassword ? "text" : "password"}
                       name="password"  
                       value={this.state.password}
                       onChange={this.handleChange}/>
               
               <Button className="login-page-button">
                    <IconButton className="eye-icon"
                        onClick={this.handleClickShowPassword}
                         >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </Button>

            </div> 
            </div>

            <div className="form-label-input-grid">
               <label>Confirm Password:</label>
               <div className="login-row-grid-input" >
                <input className="signIn-textbox"
                       required
                       type={this.state.showPassword ? "text" : "password"}
                       name="confirmPassword"  
                       value={this.state.ConfirmPassword}
                       onChange={this.handleChange}/>
               
               <Button className="login-page-button">
                    <IconButton className="eye-icon"
                        onClick={this.handleClickShowPassword}
                         >
                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </Button>

            </div> 
            </div>
            {this.state.messageStatus==="Password Length"&& <div className="signup-warning"> Password should contain atleast 8 characters</div>}
            {this.state.messageStatus==="Password Match"&& <div className="signup-warning"> Password does not Match</div>}

            <Button  className="signin-button"
                      type="submit"
                      onClick={this.handleNewPassword}
                      > Confirm</Button>
                </div>

             )}
          


          
</form>
</div>
        </React.Fragment>
     
    );
  }
}
export default ResetPassword;
