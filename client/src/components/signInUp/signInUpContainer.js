import React,{Component} from "react";
import Signin from './signIn'
import Signup from './signUp' 
import './signInUpContainer.css'
import Navigation from "../navigation/Navigation";
class SignInOutContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            page:"signIn"
        }


        this.changePageToSignUp = this.changePageToSignUp.bind(this);
        this.changePageToSignIn = this.changePageToSignIn.bind(this);

    }
    changePageToSignIn=()=>{
        this.setState({page:"signIn"})
    }
    changePageToSignUp=()=>{
      
        this.setState({page:"signUp"})

    }
    render(){
        return(
            <React.Fragment>
                <Navigation/>
                <div className='sign-in-up-container'>
                <div className='tab-container'>
                 <h1 className='tabs' onClick={this.changePageToSignIn}>Sign In</h1>
                 <h1 className='tabs' onClick={this.changePageToSignUp}>Sign UP</h1>
                </div>
                {this.state.page==="signIn"?<Signin/>:<Signup/>}
                </div>

            </React.Fragment>

        )}
};

export default SignInOutContainer;