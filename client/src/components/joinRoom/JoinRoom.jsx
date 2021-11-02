
import React,{Component} from "react";
import Navigation from "../navigation/Navigation";
import manIcon from '../../assets/man-icon.png';
import {Button} from 'react-bootstrap'
import './JoinRoom.css'
import Lobby from "./lobby/Loby";
import SongPreview from "./SongPreview/SongPreview";
import {  FaUpload } from 'react-icons/fa';
import axios from 'axios'







class JoinRoom extends Component{
    constructor(props){
        super(props);
        this.state={
        players:[],
        playerDetails:[],
        songLink:'',
        songs:[],
        }
        this.addSong = this.addSong.bind(this);
    }
    componentDidMount=()=>{
        var roomId=this.props.location.state
        axios({
            url:"/joinroom/fetch-user",
            method:"post",
            data:roomId
        }).then((res)=>{
            
            console.log(res)
            this.setState({players:res.data.players})
            this.setState({playerDetails:res.data.playerDetails})
        })
        var songDetails={
            userEmail:localStorage.getItem('PlayMyPlayList-userEmail'),
        }
        axios({
            url:"/joinroom/fetch-my-song",
            method:"post",
            data:songDetails
        }).then((res)=>{
            console.log(res)
            this.setState({songs:res.data.songs })
        })
       
    }
    handleChange=(event)=> {
        this.setState({ [event.target.name]: event.target.value });
    }
    addSong=()=>{
        var songDetails={
            songLink:this.state.songLink,
            userEmail:localStorage.getItem('PlayMyPlayList-userEmail'),
            roomId:this.props.location.state.roomId
        }
        axios({
            url:"/joinroom/add-song",
            method:"post",
            data:songDetails
        }).then((res)=>{
            console.log(res)
        }
        )

    }
    
    render(){
        return(
   <React.Fragment>
       <Navigation id="join-room"/>
       <div className="join-room-body">
       <div className="player-how-to-play-wrapper">
           <div className="player-details-container">
               <img src={manIcon} alt="icon" className="player-photo"/>
               <div className="player-details">
                   <div className="player-role">Player</div>
                   <div className="player-name">{localStorage.getItem("PlayMyPlayList-userName")}</div>
               </div>
           </div>
           <div className="how-to-play-button-container" >
                 <Button className="how-to-play-button" variant="primary">HOW TO PLAY</Button>
           </div>
           
           
       </div>
       <Lobby players={this.state.playerDetails}/>
       <div className="song-container">
           <h3>Add your song here...</h3>
            <div className="add-song">
                {/* an input field to paste link of songs with a button*/}
                <div className="add-song-input-container">
                    <input type="text" className="add-song-input" placeholder="Paste Your Link Here" 
                            name="songLink"
                            value={this.state.songLink}
                            onChange={this.handleChange}
                    />
                    <div className="join-page-icon">< FaUpload/></div>
                    <Button className="add-song-button" variant="primary" onClick={this.addSong}>ADD</Button>
                </div>
            </div>
            {this.state.songs.map((song,index)=>{
                           return(
                            <div className="added-songs">
                            <SongPreview title={song.songLink}/>
                    </div>
                           )
            })}

        </div>
        <div className="startbutton"> 
            <Button className="start-button" variant="primary">START GAME</Button>
        </div>

       </div>
   </React.Fragment>
        )
    }
}export default JoinRoom;