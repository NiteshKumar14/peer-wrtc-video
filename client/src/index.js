import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
// import Register from './components/Register';
import ResetPassword from './components/ResetPassword';
import VideoChat from './components/VideoChat'
import Room from './components/Room'






ReactDOM.render(
  <Router>
    
  
    <Routes>
    
      <Route path ="/" element={<Home/>}>
      </Route>
      <Route path ="/login" element={<Login/>}/>
      {/* <Route path ="/register" element={<Register/>}/> */}
      <Route path ="/reset-password" element={<ResetPassword/>}/>
      <Route path ="/video-chat" element={<VideoChat/>}/>
      <Route path="/room/:roomID" element = {<Room/>}/>
    </Routes>
  </Router> ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
