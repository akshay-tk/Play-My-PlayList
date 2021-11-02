import React from 'react'
import './SongPreview.css'
import songIcon from '../../../assets/songicon.png';
import {Button} from 'react-bootstrap'
import { FaTrash,FaPlay } from 'react-icons/fa';


function SongPreview(props) {
    return (
        
        <div className="song-preview">
            <div className="song-details">
            <img className="song-icon"src={songIcon} alt="icon-song" />
                <p>{props.title} </p>
                
            </div>
            <div className="join-page-icon"><FaPlay/></div>
            <Button className="remove-song-button"><FaTrash/> </Button>
        </div>
        
    )
}

export default SongPreview
