import React from 'react'
import {useEffect,useState,useRef} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

import '../'
export const socket = io('http://localhost:5000',{
   
 reconnect: true, rejectUnauthorized : false,});







function VideoChat() {
    const [roomId,setRoomId] =useState("");
    const navigate= useNavigate();
    
    // console.log(username);
    const username =useRef();
    username.current = useLocation().state;
    useEffect(()=>{
        if(!localStorage.getItem('authToken')){
            navigate("/login",{username:"plese login to continue"});
        }
        const token = localStorage.getItem('authToken');
       
       
            const config ={
                header:{
                    'Content-type':"application/json"
                }
            }
            axios.post('/auth/validateToken',{token},config).then((res)=>{
                const base64Url= token.split('.')[1];
                const base64 = base64Url.replace('-','+').replace('_','/');
                const payload = JSON.parse(window.atob(base64));
                username.current = payload.user;
                socket.on('connect',()=>{
  
                    console.log('you are connected with id ',socket.id)
                    console.log(username.current);
                    // socket.emit('register',username.current);
                    });
            
            }).catch((error)=>{
                navigate("/login",{state:"please login to continue"});
        
            })
    
    });


    const creatRoomHandler = ()=>{
        alert('button clicked');
        socket.emit('create-room',roomID=>{

            navigate(`/room/${roomID}`,{state:{joined:"true",username:username.current}});
        });


    }
    const joinRoomHandler = (e)=>{
        e.preventDefault();
        let video = true;
        socket.emit('join-room',roomId,username.current,(roomId)=>{
            console.log('joined room ',roomId,username.current)
            navigate(`/room/${roomId}`,{state:{joined:"true",username:username.current}});
        });
        

    }
    socket.on('connect_error',(err)=>{
        
    })
    return (
        <div>

            
            <button type="button" onClick={creatRoomHandler}>Create room</button>

            <form onSubmit={joinRoomHandler}>
                <input type="text" placeholder="Rooom ID" value={roomId} onChange={(e)=>{
                    setRoomId(e.target.value)
                }}/>
                <button type="submit">Join Room</button>
            </form>



            <button type="button" name="login" onClick={()=>{
                localStorage.setItem('authToken',"");
                navigate('/login');
            }} >Logout</button>            
        </div>)
   
}

export default VideoChat
