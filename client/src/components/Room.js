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
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const navigate = useNavigate();
  const videoContainer = document.getElementsByClassName('videoContainer');
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
  socket.on('connection-success',({socketId})=>{
      console.log(socketId);
     console.log('local stream is called')
      getLocalStream();
  })
  let device;
  let rtpCapabilities;
  let producerTransport;
  let consumerTransports = [];
  let producer;
  let consumer;
  let isProducer = false;
  let params = {
    // mediasoup params
    encodings: [
      {
        rid: "r0",
        maxBitrate: 100000,
        scalabilityMode: "S1T3"
      },
      {
        rid: "r1",
        maxBitrate: 300000,
        scalabilityMode: "S1T3"
      },
      {
        rid: "r2",
        maxBitrate: 900000,
        scalabilityMode: "S1T3"
      }
    ],
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
    codecOptions: {
      videoGoogleStartBitrate: 1000
    }
  };
  const getLocalStream = () => {
      console.log('getLocalStream is called ');
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: {
            min: 640,
            max: 1920
          },
          height: {
            min: 400,
            max: 1080
          }
        }
      })
      .then(streamSuccess)
      .catch(error => {
        console.log(error.message);
      });
  };
  const streamSuccess = (stream) => {
    console.log('Stream success is called ');
    try{
      localStreamRef.current.srcObject = stream;
    localStreamRef.current.play();
    }
    catch(error)
    {
      console.log('error',error.mesaage);
    }
    const track = stream.getVideoTracks()[0]
    params = {
      track,
      ...params
    }
  
    joinRoom();

  }
 
  const joinRoom = () => {
    socket.emit('join-Room', { roomName:roomID},(data) => {
      console.log(`Router RTP Capabilities... ${data.rtpCapabilities}`)
      // we assign to local variable and will be used when
      // loading the client Device (see createDevice above)
      rtpCapabilities = data.rtpCapabilities
  
      // once we have rtpCapabilities from the Router, create Device
      createDevice()
    })
  }
  
  const createDevice = async () => {
    console.log('create device is called ');
    try {
      device = new Device();

      // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
      // Loads the device with RTP capabilities of the Router (server side)
      await device.load({
        // see getRtpCapabilities() below
        routerRtpCapabilities: rtpCapabilities
      });

      console.log("Device RTP Capabilities", device.rtpCapabilities);

      // once the device loads, create transport
      createSendTransport();
    } catch (error) {
      console.log(error);
      if (error.name === "UnsupportedError")
        console.warn("browser not supported");
    }
  };
  const createSendTransport = () => {
    console.log('create send transport is called ');
    // see server's socket.on('createWebRtcTransport', sender?, ...)
    // this is a call from Producer, so sender = true
    socket.emit('createWebRtcTransport', { consumer: false }, ({ params }) => {
      // The server sends back params needed
      // to create Send Transport on the client side
      if (params.error) {
        console.log(params.error);
        return;
      }

      console.log(params);
      console.log('webrtc transport got created is called ');
      // creates a new WebRTC Transport to send media
      // based on the server's producer transport params
      // https://mediasoup.org/documentation/v3/mediasoup-client/api/#TransportOptions
      producerTransport = device.createSendTransport(params);

      // https://mediasoup.org/documentation/v3/communication-between-client-and-server/#producing-media
      // this event is raised when a first call to transport.produce() is made
      // see connectSendTransport() below
      producerTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          try {
            // Signal local DTLS parameters to the server side transport
            // see server's socket.on('transport-connect', ...)
            await socket.emit('transport-connect', {
              dtlsParameters
            });

            // Tell the transport that parameters were transmitted.
            callback();
          } catch (error) {
            errback(error);
          }
        }
      );

      producerTransport.on("produce", async (parameters, callback, errback) => {
        console.log(parameters);

        try {
          // tell the server to create a Producer
          // with the following parameters and produce
          // and expect back a server side producer id
          // see server's socket.on('transport-produce', ...)
          await socket.emit(
            "transport-produce",
            {
              kind: parameters.kind,
              rtpParameters: parameters.rtpParameters,
              appData: parameters.appData
            },
            ({ id, producersExist }) => {
              // Tell the transport that parameters were transmitted and provide it with the
              // server side producer's id.
              callback({ id });

              // if producers exist, then join room
              if (producersExist) getProducers();
            }
          );
        } catch (error) {
          errback(error);
        }
      });

      connectSendTransport();
    });
  };
  const connectSendTransport = async () => {
    console.log('connectsend transport  is called ');
    // we now call produce() to instruct the producer transport
    // to send media to the Router
    // https://mediasoup.org/documentation/v3/mediasoup-client/api/#transport-produce
    // this action will trigger the 'connect' and 'produce' events above
    producer = await producerTransport.produce(params)
  
    producer.on('trackended', () => {
      console.log('track ended')
  
      // close video track
    })
  
    producer.on('transportclose', () => {
      console.log('transport ended')
  
      // close video track
    })
  }
  const signalNewConsumerTransport = async remoteProducerId => {
    await socket.emit(
      'createWebRtcTransport',
      { consumer: true },
      ({ params }) => {
        // The server sends back params needed
        // to create Send Transport on the client side
        if (params.error) {
          console.log(params.error);
          return;
        }
        console.log(`PARAMS... ${params}`);

        let consumerTransport;
        try {
          consumerTransport = device.createRecvTransport(params);
        } catch (error) {
          // exceptions:
          // {InvalidStateError} if not loaded
          // {TypeError} if wrong arguments.
          console.log(error);
          return;
        }

        consumerTransport.on(
          'connect',
          async ({ dtlsParameters }, callback, errback) => {
            try {
              // Signal local DTLS parameters to the server side transport
              // see server's socket.on('transport-recv-connect', ...)
              await socket.emit("transport-recv-connect", {
                dtlsParameters,
                serverConsumerTransportId: params.id
              });

              // Tell the transport that parameters were transmitted.
              callback();
            } catch (error) {
              // Tell the transport that something was wrong
              errback(error);
            }
          }
        );

        connectRecvTransport(consumerTransport, remoteProducerId, params.id);
      }
    );
  };
  socket.on("new-producer", ({ producerId }) =>
    signalNewConsumerTransport(producerId)
  );
  const getProducers = () => {
    socket.emit("getProducers", producerIds => {
      console.log(producerIds);
      // for each of the producer create a consumer
      // producerIds.forEach(id => signalNewConsumerTransport(id))
      producerIds.forEach(signalNewConsumerTransport);
    });
  };
  const connectRecvTransport = async (
    consumerTransport,
    remoteProducerId,
    serverConsumerTransportId
  ) => {
    // for consumer, we need to tell the server first
    // to create a consumer based on the rtpCapabilities and consume
    // if the router can consume, it will send back a set of params as below
    await socket.emit(
      "consume",
      {
        rtpCapabilities: device.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId
      },
      async ({ params }) => {
        if (params.error) {
          console.log("Cannot Consume");
          return;
        }

        console.log(`Consumer Params ${params}`);
        // then consume with the local consumer transport
        // which creates a consumer
        const consumer = await consumerTransport.consume({
          id: params.id,
          producerId: params.producerId,
          kind: params.kind,
          rtpParameters: params.rtpParameters
        });

        consumerTransports = [
          ...consumerTransports,
          {
            consumerTransport,
            serverConsumerTransportId: params.id,
            producerId: remoteProducerId,
            consumer
          }
        ];

        // create a new div element for the new consumer media
        // and append to the video container
        
       
        // newElem.innerHTML =
        //   '<video id="' +
        //   remoteProducerId +
        //   '" autoplay class="video" ></video>';
        

        // destructure and retrieve the video track from the producer
        const { track } = consumer;

        let streamP = new MediaStream([
          track
        
        ]);
        setRemoteVideos([
          ...remoteVideos,
          {
            id:remoteProducerId,
            stream:streamP,
            consumer:consumer.id,
          }
        ])

        // the server consumer started with media paused
        // so we need to inform the server to resume
        socket.emit("consumer-resume", {
          serverConsumerId: params.serverConsumerId
        });
      }
    );
  };
  socket.on("producer-closed", ({ remoteProducerId }) => {
    // server notification is received when a producer is closed
    // we need to close the client-side consumer and associated transport
    const producerToClose = consumerTransports.find(
      transportData => transportData.producerId === remoteProducerId
    );
    producerToClose.consumerTransport.close();
    producerToClose.consumer.close();

    // remove the consumer transport from the list
    consumerTransports = consumerTransports.filter(
      transportData => transportData.producerId !== remoteProducerId
    );

    // remove the video div element
    // videoContainer.removeChild(
    //   document.getElementById(`td-${remoteProducerId}`)
    // );
  });

  return (
    <div className="container-room">
      <div className="video-card">
      <table class="mainTable">
                <tbody>
                    <tr>
                        <td class="localColumn">
                        <video
          id="localVideo"
          className="video"
          ref={localStreamRef}
          
        />
        

                        </td>
                        <td class="remoteColumn">
                            <div id="videoContainer">
                              {remoteVideos.map(rm=>{
                                return (
                                  <video id={rm.id} src={rm.stream} key={rm.stream.id} autoPlay/>
                                );
                              })}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        
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
