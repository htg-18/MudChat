import React,{useContext,useState,useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment,faBell,faNetworkWired,faMagnifyingGlass,faUser, faBars} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import "./topbar.css"
import { AuthContext } from "../Context/AuthContext";


export default function Topbar({ isProfilePage }){
   const {user}=useContext(AuthContext)
   const PF=process.env.REACT_APP_PUBLIC_FOLDER
   const [menu_class,setMenuClass]=useState("menu hidden")
   const [isMenuClicked,setIsMenuClicked]=useState(false)
   const [isSearchHidden, setIsSearchHidden] = useState(false);
   const updateMenu=()=>{
      if(!isMenuClicked)
      {
         setMenuClass("menu visible")
         setIsSearchHidden(true);
      }
      else{
         setMenuClass("menu hidden")
         setIsSearchHidden(false);
      }
      setIsMenuClicked(!isMenuClicked)
   }
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1000) {
          setIsMenuClicked(false);
          setMenuClass("menu hidden")
          setIsSearchHidden(false);
        }
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
   return (
    <div className="topbarComponent">
       <div className="topbarLeft">
            <div className="hamburger" onClick={updateMenu}>
              <FontAwesomeIcon className="ham" icon={faBars} size="lg"/>
            </div>
            <div className="logodiv">
                  <Link to="/">
               <img className="logoImage" src={PF+"download__1_-removebg-preview.png"}/>
               </Link>
              
            </div>
          
         </div>  
         <div className={menu_class}>
              <div className=" menu-item ">
              {
                  isProfilePage?
                   <Link to="/">
               <img className="menu-logo" src={PF+"download__1_-removebg-preview.png"}/>
               </Link> :
               <Link to={`/profile/${user.userName}`}>
                  <img src={PF+user.profilePicture || PF+"person/noAvatar.png"} className="topbarImage menu-img"/>
               </Link>
               }
            </div>
               {/* <div className="menu-item">
               <Link to={`/profile/${user.userName}`}>
                  <img src={PF+user.profilePicture || PF+"person/noAvatar.png"} className="topbarImage"/>
               </Link>
              </div> */}
             <div className="menu-item">
               <span>HomePage</span>
             </div>
             <div className="menu-item">
               <span>Timeline</span>
             </div>
         </div>  
         {/* <div className={menu_class}>
        
        <div className="menu-item menu-logo">
          {isProfilePage ? (
            <Link to="/">
              <img className="logoImage" src={PF + "download__1_-removebg-preview.png"} alt="Logo" />
            </Link>
          ) : (
            <Link to={`/profile/${user.userName}`}>
              <img src={PF + user.profilePicture || PF + "person/noAvatar.png"} className="topbarImage" alt="Profile" />
            </Link>
          )}
        </div>
       
        <div className="menu-item">
          <span>HomePage</span>
        </div>
        <div className="menu-item">
          <span>Timeline</span>
        </div>
      </div> */}
       <div className="topbarCenter">
       <FontAwesomeIcon  className="search" icon={faMagnifyingGlass} />
              <input
            placeholder="Search for posts, friends, or videos"
            className={`searchInputs ${isSearchHidden ? "hidden" : ""}`}
          />
       </div>
       <div className="topbarRight">
        <div className="topbarLinks">
             <span className="topbarLink">Homepage</span>
        </div>
        <div className="topbarLinks">
             <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
         <div className="topbarIconItem">
            <FontAwesomeIcon className="trIcons" icon={faUser} />
            <span className="topbarIconBadge">1</span>
         </div>
         <div className="topbarIconItem">
            <FontAwesomeIcon className="trIcons" icon={faComment} />
            <span className="topbarIconBadge">1</span>
         </div>
         <div className="topbarIconItem">
            <FontAwesomeIcon className="trIcons" icon={faBell} />
            <span className="topbarIconBadge">1</span>
         </div>
        </div>
           <Link to={`/profile/${user.userName}`}>
              <img src={PF+user.profilePicture || PF+"person/noAvatar.png"} className="topbarImage"/>
          </Link>
        </div>
    </div>
   ) 

}


