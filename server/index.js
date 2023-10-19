const http=require("http")
const express = require("express")
const cors = require("cors")
const socketIO = require("socket.io")

const app = express()
const port=process.env.PORT || 4501

const users=[{}]
app.use(cors())   //  cors is used for inter communication between url
app.get("/",(req, res)=>{
    res.send('hell is working')
})

const server = http.createServer(app)
// io means connection

const io=socketIO(server)
io.on("connection", (socket)=>{
    console.log("New connection")

    socket.on('joined',({user})=>{   // on -> mean to receive the data
        users[socket.id]=user; // jo hamari array hai usme socket.id point pe user save ho jayega
        console.log(`${user} has joined`)
        socket.broadcast.emit('userJoined', {user:"Admin", message:`${users[socket.id]} has joined`})  // broadcast means jisne join kiya usko chor k baki sbpe msg jayega
        socket.emit('welcome', {user: "Admin", message:`Welcome to the chat, ${users[socket.id]}`})

    })
    socket.on('message', ({message, id})=>{
        io.emit('sendMessage', {user:users[id], message, id})

    })
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('leave', {user:"Admin", message: `${users[socket.id]} has left`})
        console.log(`User left`)
    })

})
server.listen(port, ()=>{
    console.log(`server is working on http://localhost:${port}`)
})