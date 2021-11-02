import React, { Component } from "react";
import axios from "axios";
import {Button} from 'react-bootstrap';
import "./Signup.css";
import {withRouter} from 'react-router-dom'


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordMatch: true,
      passwordLength: true,
      firstName: "",
      lastName: "",
      userEmail: "",
      userRole: "",
      password: "",
      confirmPassword: "",
      status: "xyz",
    };
  }
  componentDidMount(){
      console.log(this.props)
  }
  handleChange=(event)=> {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit=(event)=> {
    event.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      var length = this.state.password.length;
      if (length > 7) {
        this.setState({ passwordLength: true, passwordMatch: true });
        var userData = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          userEmail: this.state.userEmail,
          password: this.state.password,
        };
        console.log(userData);
        axios({
            url:"/signup",
            method:"post",
            data:userData
        })
          .then((response) => {
            console.log(response);
            console.log("line 42",response.data.msg); 
            // this.setState({ status: response.data.msg });
            if(response.data.msg === "User Added") {
             console.log("inside if line 45")
             this.props.history.push("/");
              this.setState({
                firstName: "",
                lastName: "",
                userEmail: "",
                password: "",
                confirmPassword: "",
              });
              
              
            }
            if(response.data.msg==='User Already Exists'){
                this.setState({status:'User Already Exists'})
            }
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        this.setState({ passwordLength: false, passwordMatch: true });
      }
    } else {
      this.setState({ passwordMatch: false });
    }
  }
  

  render() {
    return (
        <form onSubmit={this.handleSubmit} className="signup-form-fields">
          

            <div className="signup-heading">Sign Up</div>
        
        
        <div className="form-row-grid" >
            <div className="form-label-input-grid">
            <label>First Name</label>
              
              <input className="signup-textbox"
                         required
                         type="text"
                         name="firstName"
                         value={this.state.firstName}
                         onChange={this.handleChange}/>
                 
                 
               

            </div>
            <div className="form-label-input-grid">
                 <label>Second Name</label>
                 <input className="number-of-participents-textbox"
                         required
                         type="text"
                         name="lastName"
                         value={this.state.lastName}
                         onChange={this.handleChange}/>
            </div>
        </div>

        <div className="form-label-input-grid">
                 <label>Email:</label>
 
                     <input className="signUp-textbox"
                         required
                         type="email"
                         name="userEmail"
                         value={this.state.userEmail}
                         onChange={this.handleChange}/>
                   
            </div>



            <div className="form-label-input-grid">
                 <label>Password:</label>
 
                     <input className="signUp-textbox"
                         required
                         type="Password"
                         name="password"
                         value={this.state.password}
                         onChange={this.handleChange}/>
                   
            </div>
            <div className="form-label-input-grid">
                 <label>Confirm Password:</label>
 
                     <input className="signUp-textbox"
                         required
                         type="Password"
                         name="confirmPassword"
                         value={this.state.confirmPassword}
                         onChange={this.handleChange}/>
                   
            </div>
            <div className="signup-warning">
                  {!this.state.passwordMatch && (
                    <div>Password does not match</div>
                  )}
                  {this.state.status === "User Already Exists" && (
                    <div>Email already exists</div>
                  )}
                  {!this.state.passwordLength && (
                    <div>Password should contain 8 characters</div>
                  )}
                </div>
        
        <Button  className="signup-button"
             type="submit"
             > Create Room</Button>
            
 </form>
    );
  }
}
export default withRouter(Signup);
