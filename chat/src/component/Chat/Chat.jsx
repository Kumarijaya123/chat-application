/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import {user} from "../Join/Join"
import socketIo from 'socket.io-client'
import { useEffect } from 'react'
import './Chat.css'
import sendLogo from "../../assets/send.png"
import { useState } from 'react'
import Message from '../message/Message'
import ReactScrollToBottom from 'react-scroll-to-bottom'
import closeIcon from '../../assets/close.png'


let socket;

const ENDPOINT = "http://localhost:4501/"
function Chat() {
    const [id, setid] = useState("")
    const [messages, setMessages] = useState([])
    const send =()=>{
        const message = document.getElementById('chatInput').value
        socket.emit('message', {message, id})
        document.getElementById('chatInput').value = "";

    }

console.log(messages)
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket']})
        socket.on('connect', ()=>{
            alert('Connected')
            setid(socket.id)
        }) 
        
        console.log(socket)
        // emit means we are sending data (user),    yha se backend me bhj re hai
        socket.emit('joined', {user})
        // now have to recieve the data and the name should me same like welcome
        socket.on('welcome', (data)=>{
            setMessages([...messages,data])
            console.log(data.user, data.message)
        })
        socket.on('userJoined', (data)=>{
            setMessages([...messages,data])
            console.log(data.user, data.message)
        })

        socket.on('leave', (data)=>{
            setMessages([...messages,data])
            console.log(data.user, data.message)
        })

        return () => {
          
        }
    }, [])

    useEffect(() => {
        socket.on('sendMessage',(data)=>{
            setMessages([...messages,data])
            console.log(data.user, data.message, data.id)

        })
        return () => {
            socket.off()
        }
        // now message will add continuesly down to down
    },[messages])
  return (
    <div className='chatPage'>
        <div className='chatContainer'>
            <div className='header'>
                <h2>SOHBET !</h2>
                <a href='/'><img src={closeIcon} alt='Close'/></a>
            </div>
                <ReactScrollToBottom className='chatBox'>
                    {messages.map((item, i) => <Message user={item.id===id?'':item.user}message={item.message} classs={item.id===id?'right':'left'}/>)}  
                </ReactScrollToBottom>
                <div className='inputBox'>
                <input onKeyPress={(event)=>event.key === 'Enter' ? send() : null} type="text" id='chatInput'/>
                <button onClick={send} className='sendBtn'><img src={sendLogo} alt='Send'/></button>
                </div>
                
        </div>
       
    </div>
  )
}

export default Chat