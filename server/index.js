const express = require('express')
const app = express()
const cors= require('cors')
const http = require("http")
app.use(cors())

const {Server} = require("socket.io")

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
        
    }
})

io.on("connection",(socket)=>{
    console.log(`User connected ${socket.id}`);
     
    socket.on("join_room",(data)=>{
        console.log("DADOS",data);
        socket.join(data);
        console.log(`User with id:${socket.id} joined room ${data}`);
    })
    socket.on("send_message",(data)=>{
         console.log("Message data: ",data);
         socket.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect",()=>{
        console.log("User desconnected",socket.id);
    })
})



server.listen(3001,()=>console.log("Server running on port 3001"));