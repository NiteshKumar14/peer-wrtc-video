import React from "react";
import "./Room.css";
import { socket } from "../components/VideoChat";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Peer from "simple-peer";
import styled from "styled-components";
function Room() {
  // console.log('stte:',state);
  
  const navigate = useNavigate();
 
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { roomID } = useParams();
  const messageRef = useRef();
  const username = useRef();
  const { state } = useLocation();
  

  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  
  const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

  const Video = (props) => {
    const ref = useRef();
    console.log("propps",props);

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}






  useEffect(() => {
    if (messageRef) {
      messageRef.current.addEventListener("DOMNodeInserted", event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
    
  }, []);


  const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2
};


  useEffect(() => {
    socketRef.current = socket;
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
      userVideo.current.srcObject=stream;
      console.log('joined room is called by ',username.current)
      socketRef.current.emit("join room",roomID);
      socketRef.current.on("all users",users=>{
        console.log('all users is called ')
        const peers =[];
        users.forEach(userID => {
          const peer = createPeer(userID,socketRef.current.id,stream);
          peersRef.current.push({
            peerID:userID,
            peer,
          })
          peers.push({
            peerID:userID,
            peer,
          });
          
        });
        console.log('peersss',peers);
        setPeers(peers);
      })
      socketRef.current.on('user joined',payload=>{
        console.log('user joined is called with ',payload)
        const peer = addPeer(payload.signal,payload.callerID,stream);
        peersRef.current.push({
          peerID:payload.callerID,
          peer,
        })
        const peerObj = {
          peer,
          peerID:payload.callerID
        }
        setPeers(users=>[...users,peerObj]);
      })
      socketRef.current.on("receiving returned signal", payload => {
        console.log('receiving returned signal is called');
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
    });
    socketRef.current.on('user disconnected',(id,user)=>{
      const peerObj = peersRef.current.find(p=>p.peerID===id);
    
      if(peerObj){
        peerObj.peer.destroy();
        console.log('peer destroy is called ');

      }
      const peers = peersRef.current.filter(p=>p.peerID!==id)
      peersRef.current = peers;
      setPeers(peers);
      recieveMessage('left',user);
    })
    })
}, []);

// socket.on('user disconnected',(id)=>{
//   recieveMessage("left",id);
// })
function createPeer(userToSignal, callerID, stream) {
  const peer = new Peer({
    initiator:true,
    trickle:false,
    stream,
  });
  peer.on("signal" ,signal=>{
    socketRef.current.emit('sending signal',{userToSignal,callerID,signal});
  });
  
  return peer;
  
       
}
function addPeer(incomingSignal, callerID, stream) {
      const peer =new Peer({
        initiator:false,
        trickle:false,
        stream
      });
      peer.on("signal",signal=>{
        socketRef.current.emit('returning signal',{signal,callerID});

      })
      peer.signal(incomingSignal);
      
      return peer; 
}
















  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const config = {
      header: {
        "Content-type": "application/json"
      }
    };
    axios
      .post("https://peer-wrtc-video.herokuapp.com/auth/validateToken", { token }, config)
      .then(res => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const payload = JSON.parse(window.atob(base64));
        username.current = payload.user;
        // console.log(state)
        console.log(!state)
        if (!state) {
          console.log(state)
          
          navigate("/video-chat");
        } else {
          recieveMessage(`Welcome ${state.username} to the room `, "");
        }
      })
      .catch(error => {
        console.log(error)
        navigate("/login");
      });
  }, []);
  const sendMessageHandler = () => {
    
    setChats([
      ...chats,
      {
        message: message,
        person_id: username.current+":" ,
        time: Date.now(),
        classType: "me"
      }
    ]);

    socket.emit("send-message", message, roomID, username.current);

    setMessage("");
  };
  const recieveMessage = (message, username) => {
    let  usr=username;
    if(username==="")
    usr="";
    else
    usr=username+":";
    setChats([
      ...chats,
      {
        message: message,
        person_id: usr,
        time: Date.now(),
        classType: "other"
      }
    ]);
  };
  socket.on("recieve-message", (message, username) => {
    //    alert("recieved");
    recieveMessage(message, username);
  });
  socket.on("joined", ({ newUser }) => {
    console.log("user joined ", newUser);
   
    recieveMessage(`${newUser} joined the chat`, "");
  });
  
  

 
  return (
    <div className="container-room">
      <div className="video-card">
      <StyledVideo  ref={userVideo} autoPlay playsInline />

      {peers.map((peer) => {
                return (
                    <Video key={peer.peerID} peer={peer.peer} playsInline autoPlay/>
                );
            })}
        
        <div className="controls">
        
        </div>
      </div>
      <div className="chat">
        <div className="content" ref={messageRef}>
          {chats.map(chat => {
            return (
              <p key={chat.time} className={chat.classType}>
                {chat.person_id}
                {chat.message}
              </p>
            );
          })}
        </div>
        <div className="message">
          <input
            type="text"
            name="message"
            id="input-field"
            value={message}
            onChange={e => {
              setMessage(e.target.value);
            }}
          />
          <button id="send" onClick={sendMessageHandler}>
            send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;
