import React from "react";
import "./Room.css";
import { socket } from "../components/VideoChat";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Device } from "mediasoup-client";
// import validateToken from '../utils/validateToken';
// import { receiveMessageOnPort } from 'worker_threads';
function Room() {
  // console.log('stte:',state);
  
  const navigate = useNavigate();
 
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const { roomID } = useParams();
  const messageRef = useRef();
  const username = useRef();
  const { state } = useLocation();
  const [remoteVideos,setRemoteVideos] = useState([]);
  useEffect(() => {
    if (messageRef) {
      messageRef.current.addEventListener("DOMNodeInserted", event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const config = {
      header: {
        "Content-type": "application/json"
      }
    };
    axios
      .post("/auth/validateToken", { token }, config)
      .then(res => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const payload = JSON.parse(window.atob(base64));
        username.current = payload.user;

        if (!state) {
          navigate("/video-chat");
        } else {
          recieveMessage(`Welcome ${state.username} to the room `, "");
        }
      })
      .catch(error => {
        navigate("/login", { username: "plese login to continue" });
      });
  }, [navigate, state]);
  const sendMessageHandler = () => {
    setChats([
      ...chats,
      {
        message: message,
        person_id: username.current,
        time: Date.now(),
        classType: "me"
      }
    ]);

    socket.emit("send-message", message, roomID, username.current);

    setMessage("");
  };
  const recieveMessage = (message, username) => {
    setChats([
      ...chats,
      {
        message: message,
        person_id: username + ":",
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
