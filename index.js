require('dotenv').config({path:"./config.env"});
const login = require('./controllers/login');
const path = require('path');
console.log(__dirname);
const express =  require('express');


const app = express();
const port = process.env.PORT||5000;
const https = require('httpolyglot');
const register =  require('./controllers/register');
const dbConnect = require('./middleware/dbConnect');
const forgotPassword =require('./controllers/forgotPassword');
const resetPassword = require('./controllers/resetPassword');
const validateToken = require('./controllers/validateToken')
const errorHandler = require('./middleware/error');
const {Server} = require('socket.io');
const cors = require('cors');
const corsMiddleware = require('./middleware/corsMiddleware');
// const https = require('https');
app.use(cors({
    origin:"*",
    methods:['GET','POST'],
}));
app.use(corsMiddleware);
// app.get('/',(req,res)=>{
//     res.send({"heuu":"jjd"});
// })

app.use(express.json());

dbConnect();
app.post('/auth/login',login);
app.post('/auth/register',register);
app.post('/auth/forgot-password',forgotPassword);
app.get('/auth/reset-password/:id/:token',resetPassword);
app.post('/auth/reset-password/:id/:token',resetPassword);
app.post('/auth/validateToken',validateToken);
app.use(errorHandler);
const {v4:uuidv4} = require('uuid');

// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV=='production'){
  
//     app.use(express.static(path.join(__dirname1,'client/build')));  
//     app.get('*',(req,res)=>{
//       res.sendfile(path.resolve(__dirname1,'client','build','index.html'));
//     })  
//   }
//   else{
//     app.get('/',(req,res)=>{
//       res.send("API OS RUNNING SUCESSFULLY");
//     })
//   }



const server= app.listen(port,()=>{
  
    console.log(`server is up and running on port ${port}`);
});

if(process.env.NODE_ENV='production'){
  app.use(express.static('client/build') )
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

const io = new Server(server,{

    cors: {    origin: "*",   }
   
});
const userS={}
const users = {};
const socketToRoom = {};
io.on('connection',async(socket)=>{
    
    console.log('client connected ',socket.id);
    socket.on('create-room',async(cb)=>{
        console.log('create room button listened ');
        const room = uuidv4();
        console.log("room created with id",room);
        cb(room);
       
    
    })

    socket.on("join room", roomID => {
        console.log('join room called by ',socket.id)
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);


    });
    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });
    socket.on('join-room',(roomId,username,cb)=>{
        console.log('join room called onserver by on ',username,"  ",roomId);
        socket.join(roomId);
           
          userS[socket.id]=username;
          cb(roomId);
          
        console.log('emitting the joined event')
        socket.to(roomId).emit('joined',{newUser:userS[socket.id]});
        })
    socket.on('send-message',(message,roomID,socks)=>{
        socket.to(roomID).emit('recieve-message',message,socks);
    });
    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    
  });