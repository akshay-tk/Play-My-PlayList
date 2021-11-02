import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navigation.css'
import logo from '../../assets/PMPL-LOGO.png'

function Navigation(props)
{
  return(
 <div className="nav-container">
  <NavLink className="nav-content-left" to='/'>
    <img  className="nav-logo" src={logo} alt="LOGO"/>
  </NavLink>
  {props.id === "home-page" &&
  <NavLink className="nav-content-right" to='/sign-page'>
   SignIn/SignUp
  </NavLink>}
  
  {props.id === "create-room" &&
  <NavLink className="nav-content-right" to='/login-page'>
   Join Room
  </NavLink>}
  {props.id === "join-room" &&
  <NavLink className="nav-content-right" to='/'>
   Exit Room
  </NavLink>}
  {props.id === "login-page" &&
  <NavLink className="nav-content-right" to='/create-room'>
   Create Room
  </NavLink>}



 </div>

  )
}
export default Navigation;