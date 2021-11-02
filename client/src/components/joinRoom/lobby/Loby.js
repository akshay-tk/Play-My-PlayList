import React,{Component} from 'react';
import './Lobby.css'
import activeicon from '../../../assets/active.png';
import offlineicon from '../../../assets/offline.png';

class Lobby extends Component{
    constructor(props){
        super(props);
    }


    
    render(){
        return ( 
        
            <div className="lobby-container">
                <h3 className="header">Waiting Lobby</h3>
                <div className="lobby-users">
                    {
                      
                        this.props.players.map((player, index) => {
                        return (
                            <div>
                                 <div className="lobby-user" key={index}>
                                    <img className="user-image" alt="userimage" src={'https://picsum.photos/100'} />
                                    {/* <div className="user-status">  {user.status==="Online"? <img className="status-icon" src={activeicon} alt="user active"/>  :  <img className="status-icon" src={offlineicon} alt="user offline"/>  }</div> */}
                            </div>
                            <p className="username">{player.firstName}</p>
                            {/* <p className="username">5 songs added</p> */}
                            </div>
                        )
                    })}
                </div>
                        
            </div>
         );
    }

}
 
export default Lobby;