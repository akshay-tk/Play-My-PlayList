import react,{Component} from "react";
import { Button ,Card } from "react-bootstrap"
import './Home.css'
import equ from '../../assets/equ.jpg';
import logo from '../../assets/PMPL-LOGO.png';
import Navigation from "../navigation/Navigation";


class Body extends Component{
    constructor(props){
        super(props);
        this.handleCreateroom = this.handleCreateroom.bind(this);
        this.handleJoinroom = this.handleJoinroom.bind(this);

    }
    handleCreateroom=()=>
    {
        if(localStorage.getItem('PlayMyPlayList-LoggedIn')==='LOGGED IN'){
            this.props.history.push('/create-room')
        }
        else{
            alert('Login First');
        }

    }
    handleJoinroom=()=>
    {
        if(localStorage.getItem('PlayMyPlayList-LoggedIn')==='LOGGED IN'){
            this.props.history.push('/login-page')
        }
        else{
            alert('Login First');
        }

    }
    
   
    render(){
        return(
            <react.Fragment>
                       <Navigation id={"home-page"}/>
                <div className="body-wrapper">                    
                        <img className="home-logo" src={logo} alt="LOGO"/>                    
                    <hr/>
                    <div className="body-description">A multiplayer Social Game to play along with your friends in a private room</div>
                    <div  className="button-container">
                        
                        <Card className="card1 cards" onClick={this.handleCreateroom} >
                            <Card.Body>
                                <Card.Title className="card-title">Create Room</Card.Title>
                                <Card.Text className="card-text">Play along with <br/>your friends<br/> &#10230;</Card.Text>
                            </Card.Body>    
                        </Card>
                    

                        <Card className="card2 cards" onClick={this.handleJoinroom}>
                            <Card.Body>
                                <Card.Title className="card-title">Join Room</Card.Title>
                                <Card.Text className="card-text">Play along with <br/>your friends<br/> &#10230;</Card.Text>    
                            </Card.Body>  
                        </Card>
  
                    </div>
                    <Button className="how-to-play" variant="dark">HOW TO PLAY</Button>


                    <img className="image" src={equ} alt="Logo" />
                    
                </div>
            </react.Fragment>
        )
    }
} export default Body;


