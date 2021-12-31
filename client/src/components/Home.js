import React from 'react'
import './home.css'
import video_chat from './video_chat.jpg'
function Home() {
  return (
    <div>

<nav class="navbar">
        <div class="logo">
            <img src={video_chat} alt="video call"/>
        </div>
        <div class="links">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">How It Works</a></li>
                <li><a href="#">Testimonials</a></li>
            </ul>
        </div>
    </nav>

    <div class="container12">
        <div class="text">
            <h1>Home Delivery <span>From Stores Near You</span></h1>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
            <button type="button">Download App</button>
        </div>
        <div class="photo">
            <img src="images/image-1.svg" alt=""/>
        </div>
    </div>
    
     
    </div>
  );
}

export default Home
