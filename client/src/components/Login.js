import React from 'react'
import './Login.css'
import { Helmet } from 'react-helmet'
import { useState, useEffect } from 'react'
import { useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
// import validateToken from '../utils/validateToken';
function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");
    const [username,setUsername] = useState("");
    const [error,setError] = useState("");



    useEffect(()=>{
        
            
                    
                    const token = localStorage.getItem("authToken");
                    
                    
                    const config ={
                            header:{
                                'Content-type':"application/json"
                            }
                        }
                    const {data} =axios.post('https://peer-wrtc-video.herokuapp.com/auth/validateToken',{token},config).then((res)=>{
                    
                            navigate('/video-chat');
                        
                    }).catch((error)=>{
                            console.log(error);
                            navigate("/login");
                    
                    })
                
                    


    },[navigate]);

    function signInHandler() {
        const container = document.querySelector(".container");
       
        container.classList.remove("sign-up-mode");

    }
    function signUpHandler() {


        const container = document.querySelector(".container");
        container.classList.add("sign-up-mode");

    }
    const loginHandler = async (e) => {
        // alert("this is called");
        e.preventDefault();
        const config ={
            header:{
                'Content-type':"application/json"
            }
        }
        try {
            const {data} = await axios.post('https://peer-wrtc-video.herokuapp.com/auth/login',{email,password,username},config);
            console.log("data",data);
            
            localStorage.setItem("authToken",data.token);
            navigate('/video-chat',{state:username});
            
            

            

        } catch (error) {
             console.log(error.response.data.error);
            setError(error.response.data.error);
            setTimeout(()=>{setError("")
            },5000);
           
            
        }


    }
     const registerHandler=async(e)=>{
        e.preventDefault();
        const config ={
            header:{
                'Content-type':"application/json"
            }
        }
        try{
            const {data} = await axios.post('https://peer-wrtc-video.herokuapp.com/auth/register',{username,password,email},config);
                console.log("data",data);
            
                localStorage.setItem('authToken',data.token);
                navigate('/video-chat',{state:username});
            
           
            
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(()=>{setError("")
            },5000);
            
        }

    }
    return (

        <div>

            <Helmet>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>LOGIN / SIGNUP</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
                <script src="https://kit.fontawesome.com/1788c719dd.js" crossorigin="anonymous"></script>
            </Helmet>
            <div className="container">
            
                <div className="container__forms">
                    <div className="form" >
                        <form action="" className="form__sign-in" onSubmit={loginHandler}>
                            <h2 className="form__title">Sign In</h2>
                            {error && <span>{error}</span>}
                            <div className="form__input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" required name="username" value={username} onChange={(e)=>{
                                    setUsername(e.target.value);
                                }}/>
                            </div>
                            <div className="form__input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" required name="password" value ={password} onChange={(e)=>{
                                    setPassword(e.target.value);
                                }}/>
                            </div>
                            <input className="form__submit" type="submit" value="Login" />
                            <p className="form__social-text">Or Sign in with social platforms</p>
                            <div className="form__social-media">
                                <a href="/" className="form__social-icons">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="/" className="form__social-icons">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="/" className="form__social-icons">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="/" className="form__social-icons">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>

                        <form onSubmit={registerHandler} className="form__sign-up">
                            <h2 className="form__title">Sign Up</h2>
                            {error && <span>{error}</span>}
                            <div className="form__input-field">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Username" required name="username" value={username} onChange={(e)=>{
                                    setUsername(e.target.value);
                                }}/>
                            </div>
                            <div className="form__input-field">
                                <i className="fas fa-envelope"></i>
                                <input type="text" placeholder="Email" required name="email" value={email} onChange={(e)=>{
                                    setEmail(e.target.value);
                                }}/>
                            </div>
                            <div className="form__input-field">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Password" required name="password" value={password} onChange={(e)=>{
                                    setPassword(e.target.value);
                                }}/>
                            </div>

                            <input className="form__submit" type="submit" value="Sign Up" />

                            <p className="form__social-text">Or Sign up with social platforms</p>
                            <div className="form__social-media">
                                <a href="/" className="form__social-icons">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="/" className="form__social-icons">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="/" className="form__social-icons">
                                    <i className="fab fa-google"></i>
                                </a>
                                <a href="/" className="form__social-icons">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container__panels">
                    <div className="panel panel__left">
                        <div className="panel__content">
                            <h3 className="panel__title">New here ?</h3>
                            <p className="panel__paragraph">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Doloremque adipisci tempore aliquid?
              </p>
                            <button className="btn btn-transparent" id="sign-up-btn" onClick={signUpHandler}>
                                Sign Up
              </button>
                        </div>
                        <img className="panel__image" src="https://stories.freepiklabs.com/storage/11588/market-launch-amico-2628.png" alt="" />
                    </div>
                    <div className="panel panel__right">
                        <div className="panel__content">
                            <h3 className="panel__title">One of us ?</h3>
                            <p className="panel__paragraph">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Doloremque adipisci tempore aliquid?
              </p>
                            <button className="btn btn-transparent" id="sign-in-btn" onClick={signInHandler}>
                                Sign In
              </button>
                        </div>
                        <img className="panel__image" src="https://www.pngkey.com/png/full/444-4444270_ia-press-play-website.png" alt="" />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Login;