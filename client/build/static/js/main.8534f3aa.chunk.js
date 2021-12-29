(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{119:function(e,t,n){},155:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(78),r=n.n(c),s=(n(92),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,156)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))}),o=n(42),i=n(2),l=n(0);var u=function(){return Object(l.jsx)("div",{children:"this  a home route"})},d=n(3),p=n.n(d),m=n(23),j=n(15),f=(n(95),n(79)),b=n(36),h=n.n(b);var O=function(){var e=Object(i.f)(),t=Object(a.useState)(""),n=Object(j.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(""),o=Object(j.a)(s,2),u=o[0],d=o[1],b=Object(a.useState)(""),O=Object(j.a)(b,2),v=O[0],x=O[1],g=Object(a.useState)(""),_=Object(j.a)(g,2),N=_[0],k=_[1];Object(a.useEffect)((function(){var t=localStorage.getItem("authToken"),n=h.a.post("/auth/validateToken",{token:t},{header:{"Content-type":"application/json"}}).then((function(t){e("/video-chat")})).catch((function(t){console.log(t),e("/login")}));n.data}),[e]);var w=function(){var t=Object(m.a)(p.a.mark((function t(n){var a,r,s;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),a={header:{"Content-type":"application/json"}},t.prev=2,t.next=5,h.a.post("/auth/login",{email:c,password:u,username:v},a);case 5:r=t.sent,s=r.data,console.log("data",s),localStorage.setItem("authToken",s.token),e("/video-chat",{state:v}),t.next=17;break;case 12:t.prev=12,t.t0=t.catch(2),console.log(t.t0.response.data.error),k(t.t0.response.data.error),setTimeout((function(){k("")}),5e3);case 17:case"end":return t.stop()}}),t,null,[[2,12]])})));return function(e){return t.apply(this,arguments)}}(),y=function(){var t=Object(m.a)(p.a.mark((function t(n){var a,r,s;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),a={header:{"Content-type":"application/json"}},t.prev=2,t.next=5,h.a.post("/auth/register",{username:v,password:u,email:c},a);case 5:r=t.sent,s=r.data,console.log("data",s),localStorage.setItem("authToken",s.token),e("/video-chat",{state:v}),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(2),k(t.t0.response.data.error),setTimeout((function(){k("")}),5e3);case 16:case"end":return t.stop()}}),t,null,[[2,12]])})));return function(e){return t.apply(this,arguments)}}();return Object(l.jsxs)("div",{children:[Object(l.jsxs)(f.a,{children:[Object(l.jsx)("meta",{charset:"UTF-8"}),Object(l.jsx)("meta",{"http-equiv":"X-UA-Compatible",content:"IE=edge"}),Object(l.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),Object(l.jsx)("title",{children:"Sign In & Sign Up Form"}),Object(l.jsx)("link",{rel:"preconnect",href:"https://fonts.gstatic.com"}),Object(l.jsx)("link",{href:"https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap",rel:"stylesheet"}),Object(l.jsx)("script",{src:"https://kit.fontawesome.com/1788c719dd.js",crossorigin:"anonymous"})]}),Object(l.jsxs)("div",{className:"container",children:[Object(l.jsx)("div",{className:"container__forms",children:Object(l.jsxs)("div",{className:"form",children:[Object(l.jsxs)("form",{action:"",className:"form__sign-in",onSubmit:w,children:[Object(l.jsx)("h2",{className:"form__title",children:"Sign In"}),N&&Object(l.jsx)("span",{children:N}),Object(l.jsxs)("div",{className:"form__input-field",children:[Object(l.jsx)("i",{className:"fas fa-user"}),Object(l.jsx)("input",{type:"text",placeholder:"Username",required:!0,name:"username",value:v,onChange:function(e){x(e.target.value)}})]}),Object(l.jsxs)("div",{className:"form__input-field",children:[Object(l.jsx)("i",{className:"fas fa-lock"}),Object(l.jsx)("input",{type:"password",placeholder:"Password",required:!0,name:"password",value:u,onChange:function(e){d(e.target.value)}})]}),Object(l.jsx)("input",{className:"form__submit",type:"submit",value:"Login"}),Object(l.jsx)("p",{className:"form__social-text",children:"Or Sign in with social platforms"}),Object(l.jsxs)("div",{className:"form__social-media",children:[Object(l.jsx)("a",{href:"/",className:"form__social-icons",children:Object(l.jsx)("i",{className:"fab fa-facebook-f"})}),Object(l.jsx)("a",{href:"/",className:"form__social-icons",children:Object(l.jsx)("i",{className:"fab fa-twitter"})}),Object(l.jsx)("a",{href:"/",className:"form__social-icons",children:Object(l.jsx)("i",{className:"fab fa-google"})}),Object(l.jsx)("a",{href:"/",className:"form__social-icons",children:Object(l.jsx)("i",{className:"fab fa-linkedin-in"})})]})]}),Object(l.jsxs)("form",{onSubmit:y,className:"form__sign-up",children:[Object(l.jsx)("h2",{className:"form__title",children:"Sign Up"}),N&&Object(l.jsx)("span",{children:N}),Object(l.jsxs)("div",{className:"form__input-field",children:[Object(l.jsx)("i",{className:"fas fa-user"}),Object(l.jsx)("input",{type:"text",placeholder:"Username",required:!0,name:"username",value:v,onChange:function(e){x(e.target.value)}})]}),Object(l.jsxs)("div",{className:"form__input-field",children:[Object(l.jsx)("i",{className:"fas fa-envelope"}),Object(l.jsx)("input",{type:"text",placeholder:"Email",required:!0,name:"email",value:c,onChange:function(e){r(e.target.value)}})]}),Object(l.jsxs)("div",{className:"form__input-field",children:[Object(l.jsx)("i",{className:"fas fa-lock"}),Object(l.jsx)("input",{type:"password",placeholder:"Password",required:!0,name:"password",value:u,onChange:function(e){d(e.target.value)}})]}),Object(l.jsx)("input",{className:"form__submit",type:"submit",value:"Sign Up"}),Object(l.jsx)("p",{className:"form__social-text",children:"Or Sign up with social platforms"}),Object(l.jsxs)("div",{className:"form__social-media",children:[Object(l.jsx)("a",{href:"/",className:"form__social-icons",children:Object(l.jsx)("i",{className:"fab fa-facebook-f"})}),Object(l.jsx)("a",{href:"/",className:"form__social-icons",children:Object(l.jsx)("i",{className:"fab fa-twitter"})}),Object(l.jsx)("a",{href:"/",className:"form__social-icons",children:Object(l.jsx)("i",{className:"fab fa-google"})}),Object(l.jsx)("a",{href:"/",className:"form__social-icons",children:Object(l.jsx)("i",{className:"fab fa-linkedin-in"})})]})]})]})}),Object(l.jsxs)("div",{className:"container__panels",children:[Object(l.jsxs)("div",{className:"panel panel__left",children:[Object(l.jsxs)("div",{className:"panel__content",children:[Object(l.jsx)("h3",{className:"panel__title",children:"New here ?"}),Object(l.jsx)("p",{className:"panel__paragraph",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque adipisci tempore aliquid?"}),Object(l.jsx)("button",{className:"btn btn-transparent",id:"sign-up-btn",onClick:function(){document.querySelector(".container").classList.add("sign-up-mode")},children:"Sign Up"})]}),Object(l.jsx)("img",{className:"panel__image",src:"https://stories.freepiklabs.com/storage/11588/market-launch-amico-2628.png",alt:""})]}),Object(l.jsxs)("div",{className:"panel panel__right",children:[Object(l.jsxs)("div",{className:"panel__content",children:[Object(l.jsx)("h3",{className:"panel__title",children:"One of us ?"}),Object(l.jsx)("p",{className:"panel__paragraph",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque adipisci tempore aliquid?"}),Object(l.jsx)("button",{className:"btn btn-transparent",id:"sign-in-btn",onClick:function(){document.querySelector(".container").classList.remove("sign-up-mode")},children:"Sign In"})]}),Object(l.jsx)("img",{className:"panel__image",src:"https://www.pngkey.com/png/full/444-4444270_ia-press-play-website.png",alt:""})]})]})]})]})};var v=function(){return Object(l.jsx)("div",{children:"this is resetpassword route"})},x=n(86),g=Object(x.a)("/",{secure:!0,reconnect:!0,rejectUnauthorized:!1});var _=function(){var e=Object(a.useState)(""),t=Object(j.a)(e,2),n=t[0],c=t[1],r=Object(i.f)(),s=Object(a.useRef)();return s.current=Object(i.e)().state,Object(a.useEffect)((function(){localStorage.getItem("authToken")||r("/login",{username:"plese login to continue"});var e=localStorage.getItem("authToken");h.a.post("/auth/validateToken",{token:e},{header:{"Content-type":"application/json"}}).then((function(t){var n=e.split(".")[1].replace("-","+").replace("_","/"),a=JSON.parse(window.atob(n));s.current=a.user,g.on("connect",(function(){console.log("you are connected with id ",g.id),console.log(s.current)}))})).catch((function(e){r("/login",{state:"please login to continue"})}))})),g.on("connect_error",(function(e){})),Object(l.jsxs)("div",{children:[Object(l.jsx)("button",{type:"button",onClick:function(){alert("button clicked"),g.emit("create-room",(function(e){r("/room/".concat(e),{state:{joined:"true",username:s.current}})}))},children:"Create room"}),Object(l.jsxs)("form",{onSubmit:function(e){e.preventDefault();g.emit("join-room",n,s.current,(function(e){console.log("joined room ",e,s.current),r("/room/".concat(e),{state:{joined:"true",username:s.current}})}))},children:[Object(l.jsx)("input",{type:"text",placeholder:"Rooom ID",value:n,onChange:function(e){c(e.target.value)}}),Object(l.jsx)("button",{type:"submit",children:"Join Room"})]}),Object(l.jsx)("button",{type:"button",name:"login",onClick:function(){localStorage.setItem("authToken",""),r("/login")},children:"Logout"})]})},N=n(87),k=n(45),w=(n(119),n(85));var y=function(){var e=Object(a.useRef)(null),t=(Object(a.useRef)(null),Object(i.f)()),n=(document.getElementsByClassName("videoContainer"),Object(a.useState)("")),c=Object(j.a)(n,2),r=c[0],s=c[1],o=Object(a.useState)([]),u=Object(j.a)(o,2),d=u[0],f=u[1],b=Object(i.g)().roomID,O=Object(a.useRef)(),v=Object(a.useRef)(),x=Object(i.e)().state,_=Object(a.useState)([]),y=Object(j.a)(_,2),C=y[0],S=y[1];Object(a.useEffect)((function(){O&&O.current.addEventListener("DOMNodeInserted",(function(e){var t=e.currentTarget;t.scroll({top:t.scrollHeight,behavior:"smooth"})}))}),[]),Object(a.useEffect)((function(){var e=localStorage.getItem("authToken");h.a.post("/auth/validateToken",{token:e},{header:{"Content-type":"application/json"}}).then((function(n){var a=e.split(".")[1].replace("-","+").replace("_","/"),c=JSON.parse(window.atob(a));v.current=c.user,x?D("Welcome ".concat(x.username," to the room "),""):t("/video-chat")})).catch((function(e){t("/login",{username:"plese login to continue"})}))}),[t,x]);var T,I,P,D=function(e,t){f([].concat(Object(k.a)(d),[{message:e,person_id:t+":",time:Date.now(),classType:"other"}]))};g.on("recieve-message",(function(e,t){D(e,t)})),g.on("joined",(function(e){var t=e.newUser;console.log("user joined ",t),D("".concat(t," joined the chat"),"")})),g.on("connection-success",(function(e){var t=e.socketId;console.log(t),console.log("local stream is called"),U()}));var R,q=[],E={encodings:[{rid:"r0",maxBitrate:1e5,scalabilityMode:"S1T3"},{rid:"r1",maxBitrate:3e5,scalabilityMode:"S1T3"},{rid:"r2",maxBitrate:9e5,scalabilityMode:"S1T3"}],codecOptions:{videoGoogleStartBitrate:1e3}},U=function(){console.log("getLocalStream is called "),navigator.mediaDevices.getUserMedia({audio:!0,video:{width:{min:640,max:1920},height:{min:400,max:1080}}}).then(L).catch((function(e){console.log(e.message)}))},L=function(t){console.log("Stream success is called ");try{e.current.srcObject=t,e.current.play()}catch(a){console.log("error",a.mesaage)}var n=t.getVideoTracks()[0];E=Object(N.a)({track:n},E),B()},B=function(){g.emit("join-Room",{roomName:b},(function(e){console.log("Router RTP Capabilities... ".concat(e.rtpCapabilities)),I=e.rtpCapabilities,M()}))},M=function(){var e=Object(m.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("create device is called "),e.prev=1,T=new w.Device,e.next=5,T.load({routerRtpCapabilities:I});case 5:console.log("Device RTP Capabilities",T.rtpCapabilities),F(),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0),"UnsupportedError"===e.t0.name&&console.warn("browser not supported");case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(){return e.apply(this,arguments)}}(),F=function(){console.log("create send transport is called "),g.emit("createWebRtcTransport",{consumer:!1},(function(e){var t=e.params;t.error?console.log(t.error):(console.log(t),console.log("webrtc transport got created is called "),(P=T.createSendTransport(t)).on("connect",function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.dtlsParameters,e.prev=1,e.next=4,g.emit("transport-connect",{dtlsParameters:c});case 4:n(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),a(e.t0);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,n,a){return e.apply(this,arguments)}}()),P.on("produce",function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(t),e.prev=1,e.next=4,g.emit("transport-produce",{kind:t.kind,rtpParameters:t.rtpParameters,appData:t.appData},(function(e){var t=e.id,a=e.producersExist;n({id:t}),a&&W()}));case 4:e.next=9;break;case 6:e.prev=6,e.t0=e.catch(1),a(e.t0);case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t,n,a){return e.apply(this,arguments)}}()),J())}))},J=function(){var e=Object(m.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("connectsend transport  is called "),e.next=3,P.produce(E);case 3:(R=e.sent).on("trackended",(function(){console.log("track ended")})),R.on("transportclose",(function(){console.log("transport ended")}));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),A=function(){var e=Object(m.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.emit("createWebRtcTransport",{consumer:!0},(function(e){var n=e.params;if(n.error)console.log(n.error);else{var a;console.log("PARAMS... ".concat(n));try{a=T.createRecvTransport(n)}catch(c){return void console.log(c)}a.on("connect",function(){var e=Object(m.a)(p.a.mark((function e(t,a,c){var r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.dtlsParameters,e.prev=1,e.next=4,g.emit("transport-recv-connect",{dtlsParameters:r,serverConsumerTransportId:n.id});case 4:a(),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),c(e.t0);case 10:case"end":return e.stop()}}),e,null,[[1,7]])})));return function(t,n,a){return e.apply(this,arguments)}}()),V(a,t,n.id)}}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();g.on("new-producer",(function(e){var t=e.producerId;return A(t)}));var W=function(){g.emit("getProducers",(function(e){console.log(e),e.forEach(A)}))},V=function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.emit("consume",{rtpCapabilities:T.rtpCapabilities,remoteProducerId:n,serverConsumerTransportId:a},function(){var e=Object(m.a)(p.a.mark((function e(a){var c,r,s,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(c=a.params).error){e.next=4;break}return console.log("Cannot Consume"),e.abrupt("return");case 4:return console.log("Consumer Params ".concat(c)),e.next=7,t.consume({id:c.id,producerId:c.producerId,kind:c.kind,rtpParameters:c.rtpParameters});case 7:r=e.sent,q=[].concat(Object(k.a)(q),[{consumerTransport:t,serverConsumerTransportId:c.id,producerId:n,consumer:r}]),s=r.track,o=new MediaStream([s]),S([].concat(Object(k.a)(C),[{id:n,stream:o,consumer:r.id}])),g.emit("consumer-resume",{serverConsumerId:c.serverConsumerId});case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}();return g.on("producer-closed",(function(e){var t=e.remoteProducerId,n=q.find((function(e){return e.producerId===t}));n.consumerTransport.close(),n.consumer.close(),q=q.filter((function(e){return e.producerId!==t}))})),Object(l.jsxs)("div",{className:"container-room",children:[Object(l.jsxs)("div",{className:"video-card",children:[Object(l.jsx)("table",{class:"mainTable",children:Object(l.jsx)("tbody",{children:Object(l.jsxs)("tr",{children:[Object(l.jsx)("td",{class:"localColumn",children:Object(l.jsx)("video",{id:"localVideo",className:"video",ref:e})}),Object(l.jsx)("td",{class:"remoteColumn",children:Object(l.jsx)("div",{id:"videoContainer",children:C.map((function(e){return Object(l.jsx)("video",{id:e.id,src:e.stream,autoPlay:!0},e.stream.id)}))})})]})})}),Object(l.jsx)("div",{className:"controls"})]}),Object(l.jsxs)("div",{className:"chat",children:[Object(l.jsx)("div",{className:"content",ref:O,children:d.map((function(e){return Object(l.jsxs)("p",{className:e.classType,children:[e.person_id,e.message]},e.time)}))}),Object(l.jsxs)("div",{className:"message",children:[Object(l.jsx)("input",{type:"text",name:"message",id:"input-field",value:r,onChange:function(e){s(e.target.value)}}),Object(l.jsx)("button",{id:"send",onClick:function(){f([].concat(Object(k.a)(d),[{message:r,person_id:v.current,time:Date.now(),classType:"me"}])),g.emit("send-message",r,b,v.current),s("")},children:"send"})]})]})]})};r.a.render(Object(l.jsx)(o.a,{children:Object(l.jsxs)(i.c,{children:[Object(l.jsx)(i.a,{path:"/",element:Object(l.jsx)(u,{})}),Object(l.jsx)(i.a,{path:"/login",element:Object(l.jsx)(O,{})}),Object(l.jsx)(i.a,{path:"/reset-password",element:Object(l.jsx)(v,{})}),Object(l.jsx)(i.a,{path:"/video-chat",element:Object(l.jsx)(_,{})}),Object(l.jsx)(i.a,{path:"/room/:roomID",element:Object(l.jsx)(y,{})})]})}),document.getElementById("root")),s()},92:function(e,t,n){},95:function(e,t,n){}},[[155,1,2]]]);
//# sourceMappingURL=main.8534f3aa.chunk.js.map