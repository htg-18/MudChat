import "./feed.css"
import Share from "../share1/Share"
import Post from "../post1/post"
// import { Posts } from "../../dummyData"
import React, { useState,useEffect,useContext } from 'react';
import axios from "axios"
import { AuthContext } from "../../Context/AuthContext";
export default function Feed({username})
{
    const [posts,setPosts]=useState([])
    const {user}=useContext(AuthContext)
    useEffect(()=>{
        const fetchPosts=async ()=>{
            try{
                const res= username
                ?await axios.get("/posts/profile/"+username)
                :await axios.get("posts/timeline/"+user._id);
                console.log(res.data);
                setPosts(res.data.sort((p1,p2)=>{
                    return new Date(p2.createdAt) - new Date(p1.createdAt)
                })
                )
            }
           catch(err){
            console.log(err.response.data)
             
           }
        }
        fetchPosts()
        },[username,user._id])
    return ( 
         <div className="feed">
            <div className="feedWrapper">
            {(!username || username === user.username) && <Share />}
                {posts.map((p)=>(
                        <Post key={p._id} post={p}/>
                    )) }
                
            
            </div>
        </div>
    )
       
    
}