import "./profile.css"
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import React, { useState ,useEffect} from 'react';
import axios from "axios"
import { useParams } from "react-router"
export default function Profile()
{
  const [user,setUser]=useState({})
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  //in app.js the route is profile/:username
  const params=useParams().username;
  console.log(params)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?userName=${params}`);
        setUser(res.data);
        console.log(res.data)
      } catch (err) {
        console.log(err.response.data);
      }
    };
  
    fetchUser(); // Call the fetchUser function to fetch the user data
  }, [params]);
     // Conditional rendering check
  if (Object.keys(user).length === 0) {
    // User data is not fetched yet
    return null; // Or render a loading spinner or placeholder content
  }
   return(
    
        <>
          {/* <Topbar/> */}
          <Topbar isProfilePage={true}/>
         <div className="profile">
            <Sidebar/>
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileDiv">
                  <img className="profileCover" src={`${PF}${user.coverPicture || "person/noCover.png"}`}/>
                 <img className="profileUserImage" src={`${PF}${user.profilePicture || "person/noAvatar.png"}`}/>
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.userName}</h4>
                    <span className="profileDesc">{user.desc}</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <Feed username={params} />
               <Rightbar user={user}/>
              </div>
              
            </div>
            
         </div>
        
        </>
   
   )
    
     
}