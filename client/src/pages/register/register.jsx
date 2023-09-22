import React from "react";
// import Topbar from "../../components/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
import {useRef} from "react"
import axios from "axios"
import "./register.css"
import {useNavigate} from "react-router-dom"
export default function Register(){
   const userName=useRef();
   const email=useRef();
   const password=useRef();
   const passwordAgain=useRef();
   const navigate=useNavigate()
   const handleClick=async (e)=>{
      e.preventDefault()
      if(passwordAgain.current.value!==password.current.value)
      {
         password.current.setCustomValidity("password do not match!")
      }
      else{
         const user={
            userName:userName.current.value,
            email:email.current.value,
            password:password.current.value
         }
         try{
            await axios.post("/auth/register",user)
            navigate("/login")
         }
        catch(err){
         console.log(err);
        }
      }
     
   }
   return(
    
        <>
       <div className="login">
         <div className="loginWrapper">
           <div className="loginLeft">
             {/* <h3 className="loginLogo">
                Mud Chat
             </h3> */}
             <img className="loginLogo" src="assets/logo.png"/>
             <span className="loginDesc">
                Connect with friends and world around on Mud Chat.
             </span>
           </div>
           <div className="loginRight">
               <form className="loginBox" onSubmit={handleClick}>
                  <input 
                  className="loginInput" 
                  required 
                  ref={userName} 
                  placeholder="Username"/>
                  <input 
                  className="loginInput" 
                  required ref={email} 
                  type="email"
                  placeholder="Email"/>
                  <input 
                  className="loginInput"
                   required ref={password}
                   type="password"
                   minLength="6"
                    placeholder="Password"/>
                  <input 
                  className="loginInput" 
                  required ref={passwordAgain} 
                  type="password"
                  placeholder="Password Again"/>
                  <button className="loginButton" type="submit">Sign Up</button>
                  {/* <span className="forgotText">Forgot Password?</span> */}
                  <button className="loginRegisterButton">Log into Account</button>
               </form>
           </div>
         </div>
       </div>
        
        </>
   
   )
    
     
}