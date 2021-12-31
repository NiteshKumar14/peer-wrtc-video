import React from 'react'
import './home.css'
import { Helmet } from 'react-helmet'
import Logo from './video_call.jpg';
import vi from './vi.jpeg'
import {Link} from 'react-router-dom'
function Home() {
  return (
    <div>
        <Helmet>
        <head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="style.css"/>
    <title>Delivery VI CALL  APP</title>
</head>
        </Helmet>

<nav class="navbar">
        <div class="logo">
            <img src={vi} alt="video call"/>
        </div>
        <div class="links">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login / SIgnUp</Link></li>
               
            </ul>
        </div>
    </nav>

    <div class="container123">
        <div class="text">
            <h1>Home Delivery <span>Video Call </span></h1>
            
        </div>
        <div class="photo">
            <img src={Logo} alt="" id="landing"/>
        </div>
    </div>
    
     
    </div>
  );
}

export default Home
