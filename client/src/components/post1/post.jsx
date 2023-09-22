// import "./post.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
// import React, { useState ,useEffect,useContext} from 'react';
// import {Link} from "react-router-dom"
// // import { Users } from "../../dummyData";
// import axios from "axios"
// // import * as timeago from 'timeago.js'
// // import TimeAgo from 'timeago-react'
// // import pt_BR from 'timeago.js/lib/lang/pt_BR'

// // timeago.register('pt_BR', pt_BR)
// import {format} from "timeago.js"
// import { AuthContext } from "../../Context/AuthContext";

// export default function Post({post})
// { console.log(post);
//   const {user:currentUser}=useContext(AuthContext)
//   const [like,setLike]=useState(post.like)
//   const [isLike,setIsLike]=useState(post.likes.includes(currentUser._id))
//   const [user,setUser]=useState({})
//   const PF=process.env.REACT_APP_PUBLIC_FOLDER
  
//   useEffect(() => {
//     setIsLike(post.likes.includes(currentUser._id));
//   }, [currentUser._id, post.likes]);

//   useEffect(()=>{
//     const fetchUser=async ()=>{
//         try{
//             const res= await axios.get(`/users?userId=${post.userId}`)
//             setUser(res.data)
//         }
//        catch(err){
//         console.log(err.response.data)
         
//        }
//     }
//     fetchUser()
//     },[post.userId,currentUser._id])
//     const likeHandler = async () => {
//           try {
//             await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
//             setLike(isLike ? like - 1 : like + 1);
//             setIsLike(!isLike);
//           } catch (err) {
//             console.log(err.response.data);
//           }
//         };
      
//     // const likeHandler = async () => {
//     //   try {
//     //     await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
//     //     setLike(isLike ? like - 1 : like + 1);
//     //     setIsLike(!isLike);
//     //   } catch (err) {
//     //     console.log(err.response.data);
//     //   }
//     // };
    
//     return ( 
//          <div className="post">
//            <div className="postWrapper">
//              <div className="postTop">
//                <div className="postTopLeft">
//                <Link to={`profile/${user.userName}`}>
//                  <img className="profileImg" src={`${PF}${user.profilePicture || "person/noAvatar.png"}`}/>
//                </Link>
                  
//                   <span className="postUserName">{user.userName}</span>
//                   <span className="postDate">
//                     {format(post.createdAt)}
//                   </span>
//                </div>
//                <div className="postTopRight">
//                  <FontAwesomeIcon  className="postItem" icon={faEllipsis} />
//                </div>
//              </div>
//              <div className="postCenter">
//                <span className="postText">{post?.desc}</span>
//                <img className="postImg" src={PF+post.img}  />
//              </div>
//              <div className="postBottom">
//                   <div className="postBottomLeft">
//                      <img className="likeIcon" src={PF+"like.png"} onClick={likeHandler}/>
//                      <img className="likeIcon" src={PF+"heart.png"}  onClick={likeHandler}/>
//                      <span className="postLikeCounter">{post.likes.length} people like it</span>
//                   </div>
//                   <div className="postBottomRight">
//                      <span className="postCommentText">{post.comment} comments</span>
//                   </div>
//              </div>
//            </div>
//         </div>
//     )
       
    
// }





import "./post.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import React, { useState ,useEffect,useContext} from 'react';
import {Link} from "react-router-dom"
// import { Users } from "../../dummyData";
import axios from "axios"
// import * as timeago from 'timeago.js'
// import TimeAgo from 'timeago-react'
// import pt_BR from 'timeago.js/lib/lang/pt_BR'

// timeago.register('pt_BR', pt_BR)
import {format} from "timeago.js"
import { AuthContext } from "../../Context/AuthContext";

export default function Post({post})
{ console.log(post);
  const {user:currentUser}=useContext(AuthContext)
  const [like,setLike]=useState(post.likes.length)
  const [isLike,setIsLike]=useState(false)
  const [user,setUser]=useState({})
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  
  // useEffect(() => {
  //   setIsLike(post.likes.includes(currentUser._id));
  // }, [currentUser._id, post.likes]);
  useEffect(() => {
    setIsLike(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };
    // const likeHandler = async () => {
    //   try {
    //     await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    //     setLike(isLike ? like - 1 : like + 1);
    //     setIsLike(!isLike);
    //   } catch (err) {
    //     console.log(err.response.data);
    //   }
    // };
    
    return ( 
         <div className="post">
           <div className="postWrapper">
             <div className="postTop">
               <div className="postTopLeft">
               <Link to={`profile/${user.userName}`}>
                 <img className="profileImg" src={`${PF}${user.profilePicture || "person/noAvatar.png"}`}/>
               </Link>
                  
                  <span className="postUserName">{user.userName}</span>
                  
               </div>
               <div className="postTopRight">
                 <FontAwesomeIcon  className="postItem" icon={faEllipsis} />
               </div>
             </div>
             <div className="postCenter">
               <span className="postText">{post?.desc}</span>
               <img className="postImg" src={PF+post.img}  />
             </div>
             <div className="postBottom">
                  <div className="postBottomLeft">
                     <img className="likeIcon" src={PF+"like.png"} onClick={likeHandler}/>
                     <img className="likeIcon" src={PF+"heart.png"}  onClick={likeHandler}/>
                     <span className="postLikeCounter">{like} people like it</span>
                  </div>
                  <div className="postBottomRight">
                     <span className="postCommentText">{post.comment} comments</span>
                  </div>
             </div>
           </div>
        </div>
    )
       
    
}


