import React,{Component} from "react";
import Navigation from "../navigation/Navigation";
import {Button} from 'react-bootstrap';
import './Login.css'
import Visibility from "@material-ui/icons/Visibility";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios'


class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            passcode:"",    
            roomId:"",
            userName:"",
            showPassword: false,
            messageStatus:""
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleClickShowPassword=this.handleClickShowPassword.bind(this)
    };
    handleChange=(event)=> {
        this.setState({ [event.target.name]: event.target.value });
      }

     handleLogin=(event)=>{
        event.preventDefault();
        var player=localStorage.getItem("PlayMyPlayList-userEmail");
        var roomData = {
         roomPasscode: this.state.passcode,
         roomId: this.state.roomId, 
         players:player,
     }

     axios({
        url:"/login-room",
        method:"post",
        data:roomData
    }).then((res) => {
        console.log(res.data.msg)
        if(res.data.msg==="Room not found"){
            this.setState({messageStatus:"room Id"})
        }
        if (res.data.msg==='Incorrect Password') {
            this.setState({messageStatus:"Password Match"})           
        }
        if(res.data.msg==="Room Found"){
            console.log(res.data)
            this.props.history.push({
                pathname: '/join-room',
                state: { roomId: res.data.roomId }
              })
        }
    })
     
     
    }
     handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword });
      };

    render(){
        return(
            <React.Fragment>
            <Navigation id="login-page"/>
            <form onSubmit={this.handleLogin} className="login-form-fields">
          

          <div className="form-row-grid">
              <div className="heading-create">Join   Room</div>   
          </div>
          <div className="" >
          <div className="form-label-input-grid">
              {/* <label>User Name:</label>
                <div className="login-row-grid-input" >
                <input className="login-textbox"
                           required
                           type="text"
                           name="userName"
                           value={this.state.userName}
                           onChange={this.handleChange}/>
                </div>    */}

              </div>
              <div className="form-label-input-grid">
              <label>Room Id:</label>
                <div className="login-row-grid-input" >
                <input className="login-textbox"
                           required
                           type="text"
                           name="roomId"
                           value={this.state.roomId}
                           onChange={this.handleChange}/>
                   
                </div>   

              </div>
              <div className="form-label-input-grid">
                   <label>Passcode:</label>
                   <div className="login-row-grid-input" >
                    <input className="login-textbox"
                           required
                           type={this.state.showPassword ? "text" : "password"}
                           name="passcode"  
                           value={this.state.passcode}
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

          </div>
          {this.state.messageStatus==="room Id"&& <div className="signup-warning"> Room not found</div>}
          {this.state.messageStatus==="Password Match"&& <div className="signup-warning"> incorrect Password</div>}
          <Button  className="login-button"
               type="submit"
               > Join Room</Button>
              
   </form>
            </React.Fragment>
        )
    }
}export default Login;