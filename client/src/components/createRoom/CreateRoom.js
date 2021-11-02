
import React,{Component} from "react";
import Navigation from "../navigation/Navigation";
import {Button} from 'react-bootstrap';
import "./CreateRoom.css"
import axios from "axios";


class CreateRoom extends Component{
    constructor(props){
        super(props);
        this.state={
            roomName:"",
            numberOfParticipents:"",
            roomPasscode:"",
            rules:"",
            roomId:"",
        }
        this.generateRoomPasscode = this.generateRoomPasscode.bind(this);
        this.copyToClipBoard = this.copyToClipBoard.bind(this);
        this.copyToClipBoardPass = this.copyToClipBoardPass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    componentDidMount(){
       console.log(this.props)
        axios({
            url:"/createroom/generateId",
            method:"get"
        }).then(res=> {
            this.setState({roomId:res.data.roomId})
          }).catch(err=>{
              console.error(err);
          }
          )
        
    }
    copyToClipBoard(){
        let text ="";
        let cb = navigator.clipboard;
        
            text= this.state.roomId;
        cb.writeText(text);
    }

     generateRoomPasscode(){
        var len = 8;
        var pass="";
        var char_list =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrst#@$&";
        for (var i = 0; i < len; i++) {
        pass += char_list.charAt(Math.floor(Math.random() * char_list.length));
        }
        this.setState({roomPasscode:pass})
    }
    copyToClipBoardPass(){ 
        let text ="";
        let cb = navigator.clipboard;
    
        text= this.state.roomPasscode;
        cb.writeText(text);
    }

    handleChange=(event)=> {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit=(event)=>{
        event.preventDefault();
       var player=localStorage.getItem("PlayMyPlayList-userEmail");
       console.log(player)
        const roomData={roomName:this.state.roomName,
                        roomId:this.state.roomId,
                        roomPasscode:this.state.roomPasscode,
                        rules:this.state.rules,
                        numberOfParticipents:this.state.numberOfParticipents,
                        players:player
        }
        axios({
            url:"/createroom",
            method:"post",
            data:roomData
        }).then(res=> {
            console.log(res.data)
            if(res.data.msg==="Room Created"){
                this.props.history.push({
                    pathname: '/join-room',
                    state: { roomID: res.data.roomId }
                  })
            }
            
          }).catch(err=>{
              console.error(err);
          }
          )


    }
    render(){
        return(
   <React.Fragment>
       <Navigation id="create-room"/>
       <form onSubmit={this.handleSubmit} className="form-fields">
          

           <div className="form-row-grid">
               <div className="heading-create">Create Room</div>
               <div className="roomId-container" >
                   <Button className="roomId-copy-button"  onClick={this.copyToClipBoard}>Room ID:{this.state.roomId} <i className="fa fa-copy"></i></Button>
                </div>   
           </div>
           
           <div className="form-row-grid" >
               <div className="form-label-input-grid">
               <label>Room Name:</label>
                 
                 <input className="signup-textbox"
                            required
                            type="text"
                            name="roomName"
                            value={this.state.roomName}
                            onChange={this.handleChange}/>
                    
                    
                  

               </div>
               <div className="form-label-input-grid">
                    <label>Number Of Participants:</label>
                    <input className="number-of-participents-textbox"
                            required
                            type="text"
                            name="numberOfParticipents"
                            list="mylist"
                            value={this.state.numberOfParticipents}
                            onChange={this.handleChange}/>
               </div>
                <datalist id="mylist">
                    <option value="2"/>
                    <option value="3"/>
                    <option value="4"/>
                    <option value="5"/>
                    <option value="6"/>
                    <option value="7"/>
                    <option value="8"/>
                    <option value="9"/>
                    <option value="10"/>
                    
                </datalist>
           </div>
           <div className="form-row-grid" >
               <div className="form-label-input-grid">
                    <label>Password:</label>
                    <div className="form-row-grid-input" >
                        <input className="passcord-textbox"
                            required
                            type="password"
                            name="roomPasscode"
                            value={this.state.roomPasscode}
                            onChange={this.handleChange}/>
                        <Button className="copy-roomPasscode" onClick={this.copyToClipBoardPass}><i className="fa fa-copy" style={{fontSize:"28px"}}></i></Button>    
                    </div>  
                    <Button className="generate-roomPasscode" onClick={this.generateRoomPasscode}>Generate roomPasscode</Button>
               </div>
               <div className="form-label-input-grid">
                    <label>Rules:</label>
                    <input className="rule-textbox"
                            required
                            type="text"
                            name="rules"
                            value={this.state.rules}
                            onChange={this.handleChange}/>        
               </div>
           </div>
           <Button  className="create-button"
                type="submit"
                > Create Room</Button>
               
    </form>

   </React.Fragment>
        )
    }
}export default CreateRoom;





