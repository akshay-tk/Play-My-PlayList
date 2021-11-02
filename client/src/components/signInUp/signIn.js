import React,{Component} from "react";
import {Button} from 'react-bootstrap';
import './Signin.css'
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import { Link } from 'react-router-dom'




class SignIn extends Component{
    constructor(props){
        super(props);
        this.state={
            userEmail:"",
            password:"",
            showPassword: false,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleClickShowPassword=this.handleClickShowPassword.bind(this)
    };
    handleChange=(event)=> {
        this.setState({ [event.target.name]: event.target.value });
      }

     handleSignIn=(event)=>{
        event.preventDefault();
        
        var userData = {
         password: this.state.password,
         userEmail: this.state.userEmail
     }


    axios({
        url:"/signIn",
        method:"post",
        data:userData
    }).then((response) => {
        console.log(response)
         if(response.data.msg==="User LoggedIn"){
            localStorage.setItem('PlayMyPlayList-userEmail', response.data.respon.userEmail);
            localStorage.setItem('PlayMyPlayList-userName', response.data.respon.firstName);
            localStorage.setItem('PlayMyPlayList-LoggedIn', "LOGGED IN");


            // this.props.history.push('/');
          }
        
        })
     
    }
     handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword });
      };

    render(){
        return(
            <React.Fragment>
            <form onSubmit={this.handleSignIn} className="signin-form-fields">
          

         
              <div className="signup-heading">Sign In</div>   
          
          
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

              <div className="form-label-input-grid">
                   <label>Passcode:</label>
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
                <div className="signin-alternative-options"> <Link to="/reset-password" >Forgot Password?</Link></div>

              </div>

         
          <Button  className="signin-button"
               type="submit"
               > Join Room</Button>
              
   </form>
            </React.Fragment>
        )
    }
}export default SignIn;