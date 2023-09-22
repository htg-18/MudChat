import "./share.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceGrinHearts, faFaceSmile, faFaceSmileBeam, faFaceSmileWink, faLocationDot, faPhotoFilm, faTag, faTags, faXmark} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from "../../Context/AuthContext"
import React, { useState,useEffect,useContext,useRef } from 'react';
import axios from 'axios'
export default function Share()
{
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  const {user}=useContext(AuthContext)
  const desc=useRef()
  const [file,setFile]=useState(null)
 
  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  
    return ( 
         <div className="share">
           <div className="shareWrapper">
               <div className="shareTop">
                 <img className="shareProfileImg" 
                 src={user.profilePicture? PF+user.profilePicture:PF+"person/noAvatar.png"}/>
                 <input  
                 placeholder="what's on your mind" 
                 className="shareInput"
                 ref={desc}
                 />
               </div>
               <hr className="shareHr"/>
               {
                file && (
                  <div className="shareImgContainer">
                     <img className="shareImg" src={URL.createObjectURL(file)}/>
                     <button className="cancel" onClick={()=>setFile(null)}>
                     <FontAwesomeIcon  className="cancelSign" icon={faXmark} />
                     </button>
                  </div>
                )
               }
               <form className="shareBottom" onSubmit={submitHandler}>
                 <div className="shareOptions">
                     <label htmlFor="file" className="shareOption">
                      <FontAwesomeIcon  className="shareItem1 shareItem" icon={faPhotoFilm} />
                       <span className="shareOptionText">Photos or Videos</span>
                       <input 
                       style={{display:"none"}}
                       type="file" 
                       id="file" 
                       accept=".png,.jpeg,.jpg"
                       onChange={(e) => setFile(e.target.files[0])}
                       />
                     </label>
                     <div className="shareOption">
                      <FontAwesomeIcon className="shareItem2 shareItem" icon={faTags} />
                       <span className="shareOptionText">Tags</span>
                     </div>
                     <div className="shareOption">
                      <FontAwesomeIcon className="shareItem3 shareItem" icon={faLocationDot} />
                       <span className="shareOptionText">Locations</span>
                     </div>
                     <div className="shareOption">
                      <FontAwesomeIcon className="shareItem4 shareItem" icon={faFaceSmile} />
                       <span className="shareOptionText">Feelings</span>
                     </div>
                 </div>
                 <button className="shareButton" type="submit">Share</button>
               </form>
           </div>
        </div>
    )
       
    
}