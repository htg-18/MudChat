import "./rightbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faCircle, faCircleDot, faEllipsis, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Users } from "../../dummyData"
import {useEffect,useState,useContext} from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import { AuthContext } from "../../Context/AuthContext";

export default function Sidebar({user})
{
  const [friends,setFriends]=useState([])
  const {user:currentUser,dispatch} = useContext(AuthContext)
  const [followed,setFollowed]=useState(currentUser.following.includes(user?._id))

  useEffect(() =>{
    const getFriends=async()=>{
      try{
         const friendList=await axios.get("/users/friends/"+user._id)
         setFriends(friendList.data)
      }
      catch(e){
        console.log(e)
      }
    }
    getFriends();
  },[user])
  const handleClick=async ()=>{
    try{
      if(followed){
        await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id})
        dispatch({type:"UNFOLLOW",payload:user._id})
      }else{
        await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
        dispatch({type:"FOLLOW",payload:user._id})
      }
    }catch(err)
    {
      console.log(err)
    }
    setFollowed(!followed)
  }
  const HomeRightbar=()=>{
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    return (
      <>
     
             <div className="birthdayContainer">
      <img className="birthdayImage" src="/assets/gift.png"/>
      <span className="birthdayText">
      <b>Pola Foster </b>and <b>3 others</b> have a birthday today..
      </span>
  </div>
   <img className="adImg" src="/assets/ad1.png"/>
   <h4 className="rightbarTitle">Online Friends</h4>
   <ul className="rightbarFriendList">
 
   {Users.map((u)=>(
    <li className="rightbarFriend">
        <div className="rightbarImageContainer">
          <img className="rightImg" src={PF+u.profilePicture}/>
          {/* <span className="righbarOnline"></span> */}
          <FontAwesomeIcon  className="rightItem" icon={faCircleDot} />
        </div>
        <span className="rightbarUsername">{u.username}</span>
      </li>
        )) }
   
      
   </ul>
      </>
 
    )
  }
  const ProfileRightbar=()=>{
    const PF=process.env.REACT_APP_PUBLIC_FOLDER
    return(
      <>
     
        {user.userName!==currentUser.userName &&(
          <button className="righbarFollowButton" onClick={handleClick}>
            {followed?"UnFollow":"Follow"}
            {followed?<FontAwesomeIcon  className="add" icon={faMinus} />:<FontAwesomeIcon  className="add" icon={faAdd} />}
            {/* <FontAwesomeIcon  className="add" icon={faAdd} /> */}
          </button>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
           <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">City:</span>
             <span className="rightbarInfoValue">{user.city}</span>
           </div>
           <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">From:</span>
             <span className="rightbarInfoValue">{user.from}</span>
           </div>
           <div className="rightbarInfoItem">
             <span className="rightbarInfoKey">Relationship:</span>
             <span className="rightbarInfoValue">
             {user.relationship==1 ?"Single":user.relationship==2?"Married":"Complicated"}
             </span>
           </div>
        </div>
        <h4>User Friends</h4>
        <div className="userFollowings">
          {/* {friends.map(friend=>(
            <Link to={"/profile/"+friend.userName} style={{textDecoration:"none"}}>
              <div className="userFollowing">
              <img src={friend.profilePicture?PF+friend.profilePicture:PF+"person/noAvatar.png"} className="userFollowingImg"/>
              <span className="userFollowingName">{friend.userName}</span>
              </div>
            </Link>
           
          )

          )} */}
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.userName}
              style={{ textDecoration: "none" }}
            >
              <div className="userFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="userFollowingImg"
                />
                <span className="userFollowingName">{friend.userName}</span>
              </div>
            </Link>
          ))}
         
        </div>
      </>
    )
  }
    return ( 
         <div className="rightbar">
           <div className="rightbarWrapper">
              {user? <ProfileRightbar/>:<HomeRightbar/>}
           </div>
        </div>
    )
       
    
}





 
  // useEffect(() =>{
  //     setFollowed(currentUser.following.includes(user?._id))
  // },[currentUser,user._id])
  // useEffect(() => {
  //   setFollowed(currentUser.following.includes(user?._id));
  // }, [currentUser, user?._id,followed]);