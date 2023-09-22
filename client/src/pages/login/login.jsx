import React,{useRef} from "react";
// import Topbar from "../../components/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
import "./login.css"
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Login(){
   const PF=process.env.REACT_APP_PUBLIC_FOLDER
   const email=useRef();
   const password=useRef();
   const {user,isFecthing,error,dispatch} = useContext(AuthContext);
   const handleClick=(e)=>{
      e.preventDefault()
      loginCall({email:email.current.value,password:password.current.value},dispatch)
   }
   console.log(user)
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
                  <input className="loginInput" type="email" required placeholder="Email" ref={email}/>
                  <input className="loginInput" minLength="6" type="password" required placeholder="Password" ref={password}/>
                  <button className="loginButton" disabled={isFecthing}>{isFecthing?"Loading...":"Log In"}</button>
                  <span className="forgotText">Forgot Password?</span>
                  <button className="loginRegisterButton">{isFecthing?"Loading...":"Create a New Account"}</button>
               </form>
           </div>
         </div>
       </div>
        
        </>
   
   )
    
     
}