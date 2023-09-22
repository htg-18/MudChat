const router=require("express").Router()
const Post=require("../models/Post")
const Users=require("../models/Users")
//create a post
router.post("/",async(req,res)=>{
    //creating a new post
    const newPost=new Post(req.body)
    try{
        //Saving the new post the the Post collection
      const savedPost=await newPost.save()
      //if no error show the new post
      res.status(200).json(savedPost)
    }
    catch(err){
            res.status(500).json(err)
        }
})

//Update a post
router.put("/:id",async(req,res)=>{
    try{
        //find the particular post form the Post collection
        const post=await Post.findById(req.params.id)
        //checking if the post is posted by the same user
        if(post.userId===req.body.userId){
            //Updating the post
         await post.updateOne({$set:req.body})
         res.status(200).json("the post was successfully updated")
        }
        else{
            //User not allowed to update the post
           res.status(403).json("message:You can't update this post")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

//delete a post
router.delete("/:id",async(req,res)=>{
    try{
        //find the particular post form the Post collection
        const post=await Post.findById(req.params.id)
        //Check if the post is posted by the same user
        if(post.userId===req.body.userId){
            //Deleting the post
   
         await post.deleteOne()
         res.status(200).json("the post was successfully deleted")
        }
        else{
            //User not allowed to delete the post
           res.status(403).json("message:You can'delete this post")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})

//like a post or dislike a post
router.put("/:id/like",async(req,res)=>{
 try{
   const post=await Post.findById(req.params.id)
   //if the likes of the post doesnot include the current user the user will be added
   if(!post.likes.includes(req.body.userId)){
    //updating the liked array
    await post.updateOne({$push:{likes:req.body.userId}})
    res.status(200).json("the post was successfully liked")
   }
   else{
    //the post will be disliked if it is already liked
    await post.updateOne({$pull:{likes:req.body.userId}})
    res.status(200).json("the post was successfully unliked")
   }
 }
 catch(err){
      res.status(500).json(err)
  }
})

//get a post
router.get("/:id",async(req,res)=>{
    try{
        //fetching the post from the id in the params
     const post=await Post.findById(req.params.id)
     res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get all timeline posts
router.get("/timeline/:userId",async(req,res)=>{
    
    try{
        //find the current user from the Users collection
        const currentUser=await Users.findById(req.params.userId)
        //finding all the posts of the current user
        const userPosts=await Post.find({userId: currentUser._id})
        userPosts.reverse()
        //get all the post of the user's friends
        const friendPosts=await Promise.all(
            //iterating through all the followings of the current user
            currentUser.following.map(async (friendId) => {
                // Exclude null values and user's own ID
                if (friendId.toString() !== currentUser._id.toString()) { 
                  return Post.find({ userId: friendId });
                }
              })
        )
        const concat = (...arrays) => [].concat(...arrays.filter(Array.isArray))
        // concat user's posts with their friend's posts
        res.status(200).json(concat(userPosts,...friendPosts));
    }
    catch(err){
        res.status(500).json(err)
    }
})


// router.get("/timeline/:userId", async (req, res) => {
//     try {
//       const currentUser = await Users.findById(req.params.userId);
//       const userPosts = await Post.find({ userId: currentUser._id });
  
//       // Reverse the order of userPosts
//       const reversedUserPosts = userPosts.reverse();
  
//       const friendPosts = await Promise.all(
//         currentUser.following.map(async (friendId) => {
//           if (friendId.toString() !== currentUser._id.toString()) {
//             return Post.find({ userId: friendId });
//           }
//         })
//       );
  
//       // Concatenate the reversed userPosts with friendPosts
//       const posts = [].concat(reversedUserPosts, ...friendPosts);
  
//       // Format the posts to include the createdAt property
//       const formattedPosts = posts.map((post) => ({
//         ...post.toJSON(),
//         createdAt: post.createdAt, // Add the createdAt property
//       }));
  
//       res.status(200).json(formattedPosts);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  

//find users posts for profile page
router.get("/profile/:username",async(req,res)=>{
    
    try{
      const user=await Users.findOne({ userName: req.params.username });
      const posts=await Post.find({userId: user._id})
      posts.reverse();
      res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

// router.get("/profile/:username", async (req, res) => {
//     try {
//       const user = await Users.findOne({ userName: req.params.username });
//       const posts = await Post.find({ userId: user._id });
  
//       // Format the posts to include the createdAt property
//       const formattedPosts = posts.map((post) => ({
//         ...post.toJSON(),
//         createdAt: post.createdAt, // Add the createdAt property
//       }));
  
//       res.status(200).json(formattedPosts);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports=router