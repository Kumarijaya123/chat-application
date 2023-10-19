/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */

import React, {useState} from 'react'
import './Join.css'
import logo from '../../assets/chat.png'
import {Link} from 'react-router-dom'


let user;
function sendUser(){
  user = document.getElementById('joinInput').value
  document.getElementById('joinInput').value = ""
  
}
function Join() {
  const [name, setname] = useState("")
  console.log(name)
  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={logo} alt='logo'/>
        <h1>CHAT</h1>
        <input onChange={(e) => setname(e.target.value)} placeholder="Enter your name"type="text" id='joinInput'/>
        <Link onClick={(event)=> !name ? event.preventDefault():null} to="/chat"><button onClick={sendUser} className='joinbtn'>Login In</button></Link>
      </div>
    </div>
  )
}

export default Join
export {user}